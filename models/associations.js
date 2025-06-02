const setupAssociations = (db) => {
  db.Profile.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  db.User.hasOne(db.Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
};

module.exports = setupAssociations;
