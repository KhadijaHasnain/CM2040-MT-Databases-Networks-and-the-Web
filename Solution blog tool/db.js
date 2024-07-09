const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/blog.db');

module.exports = {
  getSettings: () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM settings', (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  updateSettings: (blog_title, author_name) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE settings SET blog_title = ?, author_name = ?', [blog_title, author_name], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  getPublishedArticles: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM articles WHERE published = 1 ORDER BY updated_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  getDraftArticles: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM articles WHERE published = 0 ORDER BY updated_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  getArticleById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else if (row) resolve(row);
        else reject(new Error('Article not found'));
      });
    });
  },  
  updateArticle: (id, title, content) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE articles SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, content, id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  publishArticle: (id) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE articles SET published = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  deleteArticle: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM articles WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  likeArticle: (id) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE articles SET likes = likes + 1 WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
  getCommentsByArticleId: (article_id) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM comments WHERE article_id = ? ORDER BY created_at ASC', [article_id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  // Create a new draft article
createDraftArticle: () => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO articles (title, content, published) VALUES (?, ?, ?)', ['New Draft', '', 0], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  },  
  addComment: (article_id, commenter_name, comment) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO comments (article_id, commenter_name, comment, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [article_id, commenter_name, comment], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};
