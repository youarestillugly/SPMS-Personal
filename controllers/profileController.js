const { Profile, User } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    res.render('profile', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching profile');
  }
};

exports.editProfileForm = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    res.render('edit-profile', { profile });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading edit form');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, course, year, village, Dzongkhag } = req.body;
    const profile = await Profile.findOne({ where: { userId: req.user.id } });

    // If user uploaded new picture, replace old one
    if (req.file) {
      if (profile.profile_picture && profile.profile_picture !== '/images/default-avatar.png') {
        // Delete old image file
        fs.unlink(path.join('public', profile.profile_picture), (err) => {
          if (err) console.log('Failed to delete old image:', err);
        });
      }
    }

    await Profile.update({
      name,
      email,
      phone,
      course,
      year,
      village,
      Dzongkhag,
      profile_picture: req.file ? `/uploads/${req.file.filename}` : profile.profile_picture,
      status: 'pending'
    }, {
      where: { userId: req.user.id }
    });

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating profile');
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (profile.profile_picture && profile.profile_picture !== '/images/default-avatar.png') {
      fs.unlink(path.join('public', profile.profile_picture), (err) => {
        if (err) console.log('Failed to delete image:', err);
      });
    }
    await Profile.destroy({ where: { userId: req.user.id } });
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting profile');
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      where: { status: 'approved' },
      include: [{ model: User, attributes: ['email'] }]
    });
    res.render('all-profiles', { profiles });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading profiles');
  }
};
exports.addProfileForm = async (req, res) => {
  try {
    // Prefill name and email from user model
    const user = req.user;
    res.render('add-profile', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading form');
  }
};
exports.createProfile = async (req, res) => {
  try {
    const { name, email, phone, course, year, village, Dzongkhag } = req.body;

    // Check if user already has a profile
    const existingProfile = await Profile.findOne({ where: { userId: req.user.id } });
    if (existingProfile) {
      return res.redirect('/profile');
    }

    await Profile.create({
      name,
      email,
      phone,
      course,
      year,
      village,
      Dzongkhag,
      userId: req.user.id,
      status: 'pending',
      profile_picture: req.file ? `/uploads/${req.file.filename}` : '/images/default-avatar.png',
    });

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating profile');
  }
};
