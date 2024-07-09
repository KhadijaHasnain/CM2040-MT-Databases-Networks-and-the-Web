const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/blog.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS settings (blog_title TEXT, author_name TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, published INTEGER DEFAULT 0, views INTEGER DEFAULT 0, likes INTEGER DEFAULT 0)');
  db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, article_id INTEGER, commenter_name TEXT, comment TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (article_id) REFERENCES articles (id))');
  db.run('INSERT INTO settings (blog_title, author_name) VALUES (?, ?)', ['My Blog', 'Author Name']);
});

db.close();
