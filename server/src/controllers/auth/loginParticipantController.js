const Participant = require('../../models/participants');

const logger = require('../../services/loggerNew/logger');
const Team = require('../../models/teams');
const Organization = require('../../models/organizations');
const { Judge } = require('../../models');
const { generateTokenPart } = require('../../services/jwtUtils');

exports.loginParticipant = async (req, res) => {
  const { login_code } = req.body;

  const judgeId = req.user.sub;
  const judge = await Judge.findOne({ where: { id: judgeId } });

  try {
    const participant = await Participant.findOne({ 
      where: { login_code },
      include: [Organization, Team]
     });

    if (!participant) {
      logger.auth.errorAuth(login_code, null, 'Участник не найден!', judgeId);
      return res.status(404).json({ message: 'Участник не найден!' });
    }
    
    if (participant.category_id !== judge.category_id) {
        logger.auth.errorAuth(login_code, participant.id, 'Попытка авторизации участника другой категории', judgeId);
        return res.status(402).json({ message: 'Этот участник не из вашей категории.' });
    }

    const token = generateTokenPart(participant.id);

    const response = {
      accessToken: token,
      user: {
        userId: participant.id,
        firstName: participant.first_name,
        lastName: participant.last_name,
        secondName: participant.second_name,
        class: participant.class,
        teamName: participant.Team.team_name,
        organizationName: participant.Organization.name
      }
    };

    logger.auth.loginPart(login_code, participant.id, judgeId);
    return res.status(200).json(response);
  } catch (err) {
    logger.error('Ошибка авторизации:', err);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
};