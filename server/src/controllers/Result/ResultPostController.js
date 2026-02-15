const Mission = require("../../models/missions");
const Participant = require("../../models/participants");
const Result = require("../../models/results");
const Team = require("../../models/teams");
const { addResultToSpreadsheet } = require("../../services/spreadsheet/addResultToSpreadsheet");

exports.postResultController = async (req, res) => {
    try {
        const { partId, missionId, results } = req.body; // или result
        const judgeId = req.user?.sub;

        if (!partId || !missionId || !results) {
            return res.status(400).json({ 
                error: 'Отсутствуют поля!' 
            });
        }

        const mission = await Mission.findByPk(missionId)
        if (!mission) {
            return res.status(400).json({ 
                error: 'Миссия не найдена!' 
            });
        }
        
        const participant = await Participant.findOne({
            where: {id: partId},
            include: [Team]
        })

        if (!participant) {
            return res.status(400).json({ 
                error: 'Участник не найден!' 
            });
        }

        addResultToSpreadsheet(partId, participant.Team.team_name, participant.pod_team_id, mission.table_id, results)

        const newResult = Result.create({participant_id: partId, judge_id: judgeId, mission_id: missionId, result: results})

        if (!newResult) {
            return res.status(500).json({ 
            message: 'Ошибка сохранения в базу данных!'
        });
        }
        
        return res.status(200).json({ 
            message: 'Результат успешно отправлен!',
            data: { partId, missionId, judgeId }
        });
    } catch (error) {
        console.error('Error saving result:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};