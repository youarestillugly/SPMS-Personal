// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');
const ProfileModel = require('../models/Profile'); // example mongoose model

router.get('/dashboard', async (req, res) => {
  try {
    const profiles = await ProfileModel.findAll();
// fetch from DB
    res.render('admin-dashboard', { profiles });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Show all profiles for admin to manage
router.get('/profiles', isAdmin, adminController.getAllProfiles);

// Approve profile - PATCH method
router.patch('/profiles/:id/approve', isAdmin, adminController.approveProfile);

// Reject profile - PATCH method
router.patch('/profiles/:id/reject', isAdmin, adminController.rejectProfile);
// Delete profile
router.delete('/profiles/:id', isAdmin, adminController.deleteProfile);


module.exports = router;
