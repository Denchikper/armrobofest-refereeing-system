const bcrypt = require('bcryptjs');
const Organizer = require('../../models/organizers');
const Judge = require('../../models/judges');
const { generateLoginCode } = require('../../services/generators/generateLoginCode');
const logger = require('../../services/loggerNew/logger');

exports.register = async (req, res) => {
  const { 
    organization_id, 
    category_id, 
    first_name,
    second_name,
    last_name,
    role,
  } = req.body;
  console.log(category_id)

  try {
    const login_code = await generateLoginCode(3);
    let newUser = null;

    if(role === 'judge') { 
      newUser = await Judge.create({
        login_code,
        organization_id,
        category_id,
        first_name,
        second_name,
        last_name
      });
    } else if (role === 'organizer') {
      newUser = await Organizer.create({
        login_code,
        organization_id,
        first_name,
        second_name,
        last_name,
        category_id
      });
    }

    if (!newUser) {
        logger.auth.register(false, login_code, null, role);
        return res.status(400).json({ message: 'Ошибка регистрации' });
      }

    logger.auth.register(true, login_code, newUser.id, role);
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован'});
  } catch (error) {
    logger.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};