const Participant = require("../../models/participants");
const { generateLoginCode } = require("../../services/generators/generateLoginCode");

exports.registerParticipant = async (req, res) => {
  const { first_name, last_name, second_name, class_n, organization_id, team_id, pod_team_id, category_id } = req.body;

  try {
    const login_code = await generateLoginCode(4);

    const participant = await Participant.create({
      first_name,
      last_name,
      second_name,
      login_code,
      class: class_n,
      organization_id,
      team_id,
      pod_team_id,
      category_id
    });

    return res.status(200).json({ message: 'Участник успешно зарегистрирован!' });
  } catch (err) {
    console.error('Ошибка регистрации участника:', err);
    return res.status(500).json({ message: 'Ошибка сервера.' });
  }
};