const ArticleParser = require('article-parser');
const Express = require('express');
const app = Express();
const striptags = require('striptags');
const wordcount = require('wordcount');

app.get('/', (req,res) => {
  res.setHeader("Content-Type", "application/json");

  // res.end(req.query.url);
  let url = req.query.url;

  ArticleParser.extract(url).then((article) => {
    article.content = striptags(article.content);
    article.wordcount = wordcount(article.content);
    res.json(article);
  }).catch((err) => {
    res.json(err);
  });
})

app.listen(8080);
