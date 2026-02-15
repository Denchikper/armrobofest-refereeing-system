const jwtSpreadsheet = require("./authSpreadsheet")
const { GoogleSpreadsheet } = require('google-spreadsheet');

const addResultToSpreadsheet = async (partId, name_team, number_in_team, table_id, result) => {
    
    let totalScoreAllTasks = 0;
    let totalTimeAllTasks = 0;
    let tasksProcessed = 0;
    
    const resultArray = [
        partId,
        name_team,
        number_in_team
    ];
    
    try {
        const doc = new GoogleSpreadsheet(table_id, jwtSpreadsheet);
        await doc.loadInfo();

        const rowData = {
            "ID Участника": partId,
            "Команда": name_team,
            "№ участника": number_in_team
        };  

        for (const task of result) {
            let taskTotal = 0;
            let taskTimeMs = 0;
            let taskTimeString = "00:00.000";
            
            try {
                const sheet = doc.sheetsByTitle[`Задача ${task.task}`];
                if (!sheet) {
                    console.error('Лист не найден');
                    return;
                }

                await sheet.loadHeaderRow(task.n_header);
                
                for (const item of task.result) {
                    if (!item) continue;

                    if (item.type === 'time') {
                        const minutes = item.minutes || 0;
                        const seconds = item.seconds || 0;
                        const milliseconds = item.milliseconds || 0;
                        
                        taskTimeString = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
                        rowData["Время"] = taskTimeString;
                        
                        taskTimeMs = (minutes * 60 * 1000) + (seconds * 1000) + milliseconds;
                        
                    } 
                    // Специальная обработка для "Финиш"
                    else if (item.name === "Финиш" && item.selected !== undefined && item.selected !== null) {
                        rowData[item.selected] = item.points;
                        // ✅ Добавляем к сумме задачи
                        taskTotal += item.points || 0;
                    }
                    // Для задачи "Бегемот в вальере" с selected
                    else if (item.name === "Бегемот в вальере" && item.selected !== undefined && item.selected !== null) {
                        rowData[item.name] = item.selected;
                        // ✅ Добавляем к сумме задачи
                        taskTotal += item.points || 0;
                    }
                    // Специальная обработка для задачи со съездом
                    else if (item.name === "Съехал всеми колесами и не продолжил движение" && item.checked !== undefined) {
                        const value = item.checked ? "'+" : "'-";
                        rowData[item.name] = value;
                    }
                    // Для обычных задач с checked
                    else if (item.checked !== undefined) {
                        const value = item.checked ? (item.points || 0) : 0;
                        rowData[item.name] = value;
                        // ✅ Добавляем к сумме задачи
                        taskTotal += value;
                    }
                    // Для задач с selected (общий случай, но не Финиш)
                    else if (item.selected !== undefined && item.selected !== null && item.name !== "Финиш") {
                        rowData[item.name] = item.selected;
                        // ✅ Добавляем к сумме задачи
                        taskTotal += item.points || 0;
                    }
                    // Для задач только с points
                    else if (item.points !== undefined) {
                        rowData[item.name] = item.points || 0;
                        // ✅ Добавляем к сумме задачи
                        taskTotal += item.points || 0;
                    }
                }

                // ✅ Добавляем к общим суммам
                totalScoreAllTasks += taskTotal;
                totalTimeAllTasks += taskTimeMs;
                tasksProcessed++;

                // ✅ Добавляем время и сумму задачи в массив
                resultArray.push(taskTimeString);  // time_1, time_2, time_3
                resultArray.push(taskTotal);       // point_1, point_2, point_3

                // Добавляем строку после обработки всех элементов задачи
                await sheet.addRow(rowData);
                
            } catch (err) {
                resultArray.push("00:00.000");  // time
                resultArray.push(0);             // point
            }
        }
        
        const totalMinutes = Math.floor(totalTimeAllTasks / (60 * 1000));
        const totalSeconds = Math.floor((totalTimeAllTasks % (60 * 1000)) / 1000);
        const totalMilliseconds = totalTimeAllTasks % 1000;
        const totalTimeFormatted = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}.${totalMilliseconds.toString().padStart(3, '0')}`;
        
        
        resultArray.push(totalTimeFormatted);
        resultArray.push(totalScoreAllTasks);
        

        const totalSheet = doc.sheetsByTitle[`Общий рейтинг`];
        await totalSheet.addRow(resultArray)


        
    } catch (err) {
        console.log("Ошибка при добавлении результата:", err)
        console.log("Стек ошибки:", err.stack)
        
        resultArray.push("00:00.000");  // total_time
        resultArray.push(0);             // total_points
    }
    
    return
}

module.exports = { addResultToSpreadsheet }