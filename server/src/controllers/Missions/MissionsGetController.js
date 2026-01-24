const Mission = require("../../models/missions");

exports.getAllMissions = async (req, res) => {
  const role = req.user.role;

  let whereCause = {}

  if (role === "Judge") {
    whereCause = {
      category_id: req.user.categoryId,
    }
  }

  try {
    const missions = await Mission.findAll({
      where: whereCause,
      order: [
        ['category_id', 'ASC'],
        ['mission_number', 'ASC']
    ]
    });

    return res.status(200).json({ missions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Ошибка сервера.' });
  }
};