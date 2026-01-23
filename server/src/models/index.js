const Organization = require('./organizations');
const Team = require('./teams');
const Participant = require('./participants');
const Judge = require('./judges');
const Organizer = require('./organizers');

// Связи для Participant
Participant.belongsTo(Organization, { foreignKey: 'organization_id' });
Participant.belongsTo(Team, { foreignKey: 'team_id' });

// Связи для Judge
Judge.belongsTo(Organization, { foreignKey: 'organization_id' });

// Связи для Organizer
Organizer.belongsTo(Organization, { foreignKey: 'organization_id' });

// Обратные связи
Organization.hasMany(Participant, { foreignKey: 'organization_id' });
Organization.hasMany(Judge, { foreignKey: 'organization_id' });
Organization.hasMany(Organizer, { foreignKey: 'organization_id' });

Team.hasMany(Participant, { foreignKey: 'team_id' });