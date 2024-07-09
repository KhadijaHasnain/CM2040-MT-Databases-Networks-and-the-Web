const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const blogSettings = await db.getSettings();
  const publishedArticles = await db.getPublishedArticles();
  const draftArticles = await db.getDraftArticles();
  res.render('authorHome', {
    blog_title: blogSettings.blog_title,
    author_name: blogSettings.author_name,
    publishedArticles: publishedArticles,
    draftArticles: draftArticles
  });
});

// Settings Page
router.get('/settings', async (req, res) => {
  const blogSettings = await db.getSettings();
  res.render('settings', { settings: blogSettings });
});

router.post('/settings', async (req, res) => {
  const { blog_title, author_name } = req.body;
  await db.updateSettings(blog_title, author_name);
  res.redirect('/author');
});

// Edit Article Page
router.get('/edit/:id', async (req, res) => {
  try {
    const article = await db.getArticleById(req.params.id);
    res.render('editArticle', { article: article });
  } catch (error) {
    res.status(404).send('Article not found');
  }
});

router.post('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  await db.updateArticle(req.params.id, title, content);
  res.redirect('/author');
});

// Publish Article
router.post('/publish/:id', async (req, res) => {
  await db.publishArticle(req.params.id);
  res.redirect('/author');
});

// Delete Article
router.post('/delete/:id', async (req, res) => {
  await db.deleteArticle(req.params.id);
  res.redirect('/author');
});

// Create a new draft article
router.post('/create', async (req, res) => {
  const newArticleId = await db.createDraftArticle();
  res.redirect(`/author/edit/${newArticleId}`);
});

module.exports = router;
