const express = require('express');
const router = express.Router();
const db = require('../db');

// Reader Home Page
router.get('/', async (req, res) => {
  const blogSettings = await db.getSettings();
  const articles = await db.getPublishedArticles();
  res.render('readerHome', {
    blog_title: blogSettings.blog_title,
    author_name: blogSettings.author_name,
    articles: articles
  });
});

// Read Article Page
router.get('/article/:id', async (req, res) => {
  const article = await db.getArticleById(req.params.id);
  const comments = await db.getCommentsByArticleId(req.params.id);
  res.render('article', { article: article, comments: comments });
});

// Like Article
router.get('/article/:id/like', async (req, res) => {
  await db.likeArticle(req.params.id);
  res.redirect(`/reader/article/${req.params.id}`);
});

// Add Comment
router.post('/article/:id/comment', async (req, res) => {
  const { commenter_name, comment } = req.body;
  await db.addComment(req.params.id, commenter_name, comment);
  res.redirect(`/reader/article/${req.params.id}`);
});

module.exports = router;
