const Organization = require('./organizations');
const Team = require('./teams');
const Participant = require('./participants');
const Judge = require('./judges');
const Organizer = require('./organizers');
const Category = require('./categories');
const Mission = require('./missions');
const Result = require('./results')

Mission.belongsTo(Category, { foreignKey: 'category_id' });

Category.hasMany(Mission, { foreignKey: 'category_id' });
Category.hasMany(Judge, { foreignKey: 'category_id' });
Category.hasMany(Participant, { foreignKey: 'category_id' });
Category.hasMany(Organizer, { foreignKey: 'category_id' });
// Связи для Participant
Participant.belongsTo(Organization, { foreignKey: 'organization_id' });
Participant.belongsTo(Team, { foreignKey: 'team_id' });
Participant.belongsTo(Category, { foreignKey: 'category_id' });

Result.belongsTo(Participant, { foreignKey: 'participant_id' });
Result.belongsTo(Judge, { foreignKey: 'judge_id' });
Result.belongsTo(Mission, { foreignKey: 'mission_id' });

// Связи для Result
Participant.hasMany(Result, { foreignKey: 'participant_id' })
Judge.hasMany(Result, { foreignKey: 'judge_id' })
Mission.hasMany(Result, { foreignKey: 'mission_id' })


// Связи для Judge
Judge.belongsTo(Organization, { foreignKey: 'organization_id' });
Judge.belongsTo(Category, { foreignKey: 'category_id' });
// Связи для Organizer
Organizer.belongsTo(Organization, { foreignKey: 'organization_id' });
Organizer.belongsTo(Category, { foreignKey: 'category_id' });
// Обратные связи
Organization.hasMany(Participant, { foreignKey: 'organization_id' });
Organization.hasMany(Judge, { foreignKey: 'organization_id' });
Organization.hasMany(Organizer, { foreignKey: 'organization_id' });

Team.hasMany(Participant, { foreignKey: 'team_id' });