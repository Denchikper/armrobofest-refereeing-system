const Organizer = require('../models/organizers');
const Judge = require('../models/judges');

exports.getProfile = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let user = null;

    if (role === 'Судья') {
      user = await Judge.findOne({ where: { id: userId } });
    } else if (role === 'Организатор') {
      user = await Organizer.findOne({ where: { id: userId } });
  }

  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }

  res.status(200).json({
    message: 'Доступ к профилю разрешён',
    userId: user.id,
    role: user.role,
    firstName: user.first_name,
    lastName: user.last_name,
    secondName: user.second_name,
    organizationId: user.organization_id,
    categoryId: user.category_id
  });
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};