const bcrypt = require('bcryptjs');
const Participant = require('../../models/participants');
const generateToken = require('../../services/generators/generateToken');
const logger = require('../../utils/logger');
const Team = require('../../models/teams');
const Organization = require('../../models/organizations');

exports.loginParticipant = async (req, res) => {
  const { login_code } = req.body;

  try {
    var participant_without_cat = await Participant.findOne({ where: { login_code } });
    if (!participant_without_cat) {
        return res.status(401).json({ message: 'Неверный код для входа.' });
    }
    var participant = await Participant.findOne({ where: { login_code, category_id: req.user.categoryId } });

    if (!participant) {
        return res.status(402).json({ message: 'Этот участник не из вашей категории.' });
    }

    let team = await Team.findOne({ where: { id: participant.team_id } });
    let organization = await Organization.findOne({ where: { id: participant.organization_id } });

    if (participant) {
      const token = generateToken({  
        participantId: participant.id,
        firstName: participant.first_name,
        lastName: participant.last_name,
        secondName: participant.second_name,
        class: participant.class,
        teamName: team.team_name,
        organizationName: organization.name
      }, '2h');

      return res.json({
        token,
      });
    }

    // Если не нашли нигде
    return res.status(401).json({ 
      message: 'Неверный код для входа.' 
    });

  } catch (err) {
    logger.error('Ошибка авторизации:', err);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};