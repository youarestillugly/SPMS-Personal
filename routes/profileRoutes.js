const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { Profile } = require('../models');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes

router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    res.render('profile', { profile, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/add-profile', isAuthenticated, async (req, res) => {
  try {
    const existingProfile = await Profile.findOne({ where: { userId: req.user.id } });
    if (existingProfile) {
      return res.redirect('/profile');
    }
    res.render('add-profile', { user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading add profile form');
  }
});

// Single POST route with multer middleware for file upload
router.post('/add-profile', isAuthenticated, upload.single('profile_picture'), profileController.createProfile);

router.get('/edit-profile', isAuthenticated, profileController.editProfileForm);
// Fix this route to include multer middleware
router.post('/edit-profile', isAuthenticated, upload.single('profile_picture'), profileController.updateProfile);


router.post('/delete-profile', isAuthenticated, profileController.deleteProfile);

router.get('/all-profiles', isAuthenticated, profileController.getAllProfiles);

module.exports = router;
