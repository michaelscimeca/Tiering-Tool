const Express = require('express');
const hbs = require('hbs');
const app = new Express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(Express.static(`${__dirname}/static`));

app.use(function (req, res, next) {
  if (req.get('x-forwarded-port') === '80' || req.get('x-forwarded-port') === 80) {
    return res.redirect(301, `https://${req.get('host')}${req.originalUrl}`);
  }
  return next();
});

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Tiering Tool',
    description: 'Strategic and Complexity Criteria',
    url: `${(req.get('x-forwarded-port') === '443' || req.get('x-forwarded-port') === 443) ? 'https' : 'http'}://${req.get('host')}${req.originalUrl}`,
    'og_img': '#',
    'site_name': 'Hello Starter',
    'author': 'Red Square'
  });
});

app.get('*', function (req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.status !== 404) {
    return next();
  }

  res.render('four-oh-four', {
    title: 'Not found',
    description: 'Description',
    url: `${(req.get('x-forwarded-port') === '443' || req.get('x-forwarded-port') === 443) ? 'https' : 'http'}://${req.get('host')}${req.originalUrl}`,
    'og_img': '#',
    'site_name': 'Hello Starter',
    'author': 'Red Square'
  });
});

app.listen(process.env.PORT || 3000);
