exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; // <-- set req.user here
    next();
  } else {
    res.redirect('/login');
  }
};


exports.isAdmin = (req, res, next) => {
  if (!req.session || !req.session.user || !req.session.isAdmin) {
    return res.redirect('/login');
  }
  next();
};

