const { Profile, User } = require('../models');
const fs = require('fs');
const path = require('path');

// Get all profiles (approved, pending, rejected)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [{ model: User, attributes: ['email'] }],
      order: [['createdAt', 'DESC']],
    });

    res.render('admin-profiles', { profiles });
  } catch (error) {
    console.error('🔴 Error loading profiles:', error);
    res.status(500).send('Error loading profiles');
  }
};

// Approve a profile
exports.approveProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.update({ status: 'approved' }, { where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Approve error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve profile' });
  }
};

exports.rejectProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.update({ status: 'rejected' }, { where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Reject error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject profile' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    await Profile.destroy({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete profile' });
  }
};
