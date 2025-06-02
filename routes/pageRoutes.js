const express = require('express');
const router = express.Router();
const multer = require('multer');
const { User, Profile } = require('../models');
const path = require('path');

const { isAuthenticated } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// Setup multer for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Dashboard route - fetch all approved profiles from all users
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      where: {
        status: 'approved'
      }
    });

    // Render dashboard and pass all approved profiles
    res.render('dashboard', { profiles });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Academic page route (keep as is)
router.get('/academic', isAuthenticated, (req, res) => {
  res.render('academic', { user: req.session.user });
});

// Logout route (keep as is)
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/login');
  });
});

// ============ Profile Routes ============

// View my profile
router.get('/profile', isAuthenticated, profileController.getMyProfile);

module.exports = router;
