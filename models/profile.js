const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profile = sequelize.define('Profile', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_picture: {
    type: DataTypes.STRING,
    defaultValue: '/images/default-avatar.png'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true
  },
  year: {
    type: DataTypes.STRING,
    allowNull: true
  },
  village: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Dzongkhag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Associations should be setup in your main models/index.js file, for example:
// Profile.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Profile;
