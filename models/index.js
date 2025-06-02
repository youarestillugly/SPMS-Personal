const sequelize = require('../config/database');
const User = require('./User');
const Profile = require('./Profile');

const setupAssociations = require('./associations');

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.User = User;
db.Profile = Profile;

setupAssociations(db);

module.exports = db;
