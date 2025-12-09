module.exports = function onlyMyCategory(req, res, next) {
  // ✅ Организатору можно всё
  if (req.user.role === 'organizer') {
    return next();
  }

  const judgeCategory = req.user.categoryId;
  const requestedCategory = Number(req.params.category_id);

  if (!judgeCategory || judgeCategory !== requestedCategory) {
    return res.status(403).json({
      message: 'Доступ к этой категории запрещён'
    });
  }

  next(); // ✅ доступ разрешён
};