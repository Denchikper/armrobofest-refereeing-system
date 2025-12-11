const Organizer = require('../../models/organizers');
const Judge = require('../../models/judges');
const generateToken = require('../../services/generators/generateToken');
const logger = require('../../utils/logger');
const Organization = require('../../models/organizations');

exports.login = async (req, res) => {
  const { login_code } = req.body;

  try {
    const judge = await Judge.findOne({ where: { login_code } });

    if (judge) {
      let organization = await Organization.findOne({ where: { id: judge.organization_id } });
      const token = generateToken({ 
        userId: judge.id,
        role: 'Судья', // ✅ лучше латиницей
        firstName: judge.first_name,
        lastName: judge.last_name,
        secondName: judge.second_name,
        organizationName: organization.name,
        categoryId: judge.category_id // ✅ ВАЖНЕЙШЕЕ ПОЛЕ
      }, '2h');

      return res.json({ token });
    }

    const organizer = await Organizer.findOne({ where: { login_code } });

    if (organizer) {
      const token = generateToken({ 
        userId: organizer.id,
        role: 'Организатор',
        firstName: organizer.first_name,
        lastName: organizer.last_name,
        secondName: organizer.second_name,
        organizationId: organizer.organization_id,
        categoryId: organizer.category_id
      }, '2h');

      return res.json({ token });
    }

    // ❌ Если не найден ни там, ни там
    return res.status(401).json({ 
      message: 'Неверный код для входа' 
    });

  } catch (err) {
    logger.error('Ошибка авторизации:', err);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
