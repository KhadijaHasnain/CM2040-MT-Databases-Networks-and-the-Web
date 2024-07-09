const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/author');
const readerRouter = require('./routes/reader');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/author', authorRouter);
app.use('/reader', readerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
