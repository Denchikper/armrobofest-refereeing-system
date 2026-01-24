const Organizer = require('../../models/organizers');
const Judge = require('../../models/judges');

const logger = require('../../services/loggerNew/logger');
const { generateToken } = require('../../services/jwtUtils');
const Organization = require('../../models/organizations');

exports.login = async (req, res) => {
  const { login_code } = req.body;

  try {
    const judge = await Judge.findOne({ 
      where: { login_code },
      include: [Organization]
    });

    if (judge) {
      const token = generateToken(judge.id, 'Judge');
      logger.auth.login(login_code, judge.id, false);
      const response = {
        accessToken: token,
        user: {
          userId: judge.id,
          role: 'Judge',
          firstName: judge.first_name,
          lastName: judge.last_name,
          secondName: judge.second_name,
          organizationName: judge.Organization.name,
          isRoboticsTheory: judge.isRoboticsTheory,
          categoryId: judge.category_id
        }
      }
      console.log(response);
      return res.status(200).json(response);
    }

    const organizer = await Organizer.findOne({ where: { login_code } });

    if (!organizer) {
      return res.status(401).json({ 
        message: 'Неверный код для входа' 
      });
    }
    const token = generateToken(organizer.id, 'Organizer');

    const response = {
      accessToken: token,
      user: {
        userId: organizer.id,
        role: 'Organizer',
        firstName: organizer.first_name,  
        lastName: organizer.last_name,  
        secondName: organizer.second_name,
        organizationName: organizer.Organization.name,
      }
    };

    logger.auth.login(login_code, organizer.id, true);
    return res.json(response);

  } catch (err) {
    logger.error('Ошибка авторизации:', err);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};
