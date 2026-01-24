const Mission = require("../../models/missions");

exports.patchMissions = async (req, res) => {
  const { missionId, newIsOpen } = req.body;

  try {
    const mission = await Mission.findOne({ where: { id: missionId } });
    
    if (!mission) {
      return res.status(404).json({ message: 'Миссия не найдена!' });
    }

    mission.enabled = newIsOpen;
    await mission.save();

    return res.status(200).json({ message: 'Миссия успешно обновлена!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Ошибка сервера.' });
  }
};