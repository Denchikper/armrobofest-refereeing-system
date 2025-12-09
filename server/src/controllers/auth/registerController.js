const bcrypt = require('bcryptjs');
const Organizer = require('../../models/organizers');
const Judge = require('../../models/judges');
const generateToken = require('../../services/generators/generateToken');
const logger = require('../../utils/logger');
const { generateLoginCode } = require('../../services/generators/generateLoginCode');

exports.register = async (req, res) => {
  const { 
    organization_id, 
    category_id, 
    first_name,
    second_name,
    last_name,
    role,
  } = req.body;

  try {
    const login_code = await generateLoginCode();

    if(role === 'judge') { 
      const newUser = await Judge.create({
        login_code,
        organization_id,
        category_id,
        first_name,
        second_name,
        last_name
      });
    } else if (role === 'organizer') {
      const newUser = await Organizer.create({
        login_code,
        organization_id,
        first_name,
        second_name,
        last_name
      });
    }

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован'});

  } catch (error) {
    logger.error('Ошибка регистрации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};