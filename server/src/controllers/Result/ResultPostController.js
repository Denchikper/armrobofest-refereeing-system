exports.postResultController = async (req, res) => {
    const { partId, missionId, result } = req.body;
    const userId = req.user.id;



    console.log(result);
    return res.status(200).json({ message: 'Результат успешно отправлен!' });
};