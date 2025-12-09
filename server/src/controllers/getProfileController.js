exports.getProfile = (req, res) => {
  const {
    userId,
    role,
    firstName,
    lastName,
    secondName,
    organizationId,
    categoryId
  } = req.user;

  res.status(200).json({
    message: 'Доступ к профилю разрешён',
    userId,
    role,
    firstName,
    lastName,
    secondName,
    organizationId,
    categoryId
  });
};