const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { password } = req.body;
  if (password === process.env.AUTHOR_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/author');
  } else {
    res.status(401).send('Unauthorized');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/auth'); // Update this path
  });
});

module.exports = router;
