const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');



// Register routes

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true only in production with HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// View Engine and Static Files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.use('/', authRoutes);
app.use('/', pageRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);


              // /login, /signup, /logout     // /apply/:id


// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Redirect shortcut
app.get('/admin-dashboard', (req, res) => {
  res.redirect('/admin/dashboard');
});

// 404 Fallback
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// ✅ Sequelize DB Sync

sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ Database synchronized!");
    // Start server inside .then to ensure DB is ready
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ Error syncing the database:", error);
  });
