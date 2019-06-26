const Express = require('express');
const Prismic = require('prismic-javascript');
const PrismicDOM = require('prismic-dom');
const hbs = require('hbs');
const PrismicConfig = require('./prismic-configuration');

const app = new Express();

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(Express.static(`${__dirname}/static`));

// Middleware to inject prismic context
app.use((req, res, next) => {
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req
  }).then((api) => {
    req.prismic = { api };
    next();
  }).catch((error) => {
    next(error.message);
  });
});

app.use(function (req, res, next) {
  if (req.get('x-forwarded-port') === '80' || req.get('x-forwarded-port') === 80) {
    return res.redirect(301, `https://${req.get('host')}${req.originalUrl}`);
  }
  return next();
});

app.get('/', (req, res, next) => {
  req.prismic.api.getSingle('home_page').then((document) => {
    if (document) {
      res.render('home', {
        document,
        title: 'Digital Tiering Tool',
        description: 'Internal tool for Red Square.',
        url: `${(req.get('x-forwarded-port') === '443' || req.get('x-forwarded-port') === 443) ? 'https' : 'http'}://${req.get('host')}${req.originalUrl}`,
        'og_img': '#',
        'site_name': 'Digital Tiering Tool',
        'author': 'Red Square'
      });
    } else {
      var err = new Error();
      err.status = 404;
      next(err);
    }
  });
});

app.get('/:uid', (req, res, next) => {
  req.prismic.api.getByUID('page', req.params.uid).then((document) => {
    if (document) {
      res.render('department', {
        document,
        title: 'Digital Tiering Tool',
        description: 'Internal tool for Red Square.',
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        'og_img': '#',
        'site_name': 'Digital Tiering Tool',
        'author': 'Red Square'
      });
    } else {
      var err = new Error();
      err.status = 404;
      next(err);
    }
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
    description: 'Digital Tiering Tool',
    url: `${(req.get('x-forwarded-port') === '443' || req.get('x-forwarded-port') === 443) ? 'https' : 'http'}://${req.get('host')}${req.originalUrl}`,
    'og_img': '#',
    'site_name': 'Digital Tiering Tool',
    'author': 'Red Square'
  });
});

hbs.registerHelper('PrismicRichText', context => PrismicDOM.RichText.asHtml(context, PrismicConfig.linkResolver));
hbs.registerHelper('PrismicPlainText', context => PrismicDOM.RichText.asText(context));
hbs.registerHelper('PrismicSterilizeText', function (context, name) {
  let text = PrismicDOM.RichText.asText(context);
  text = text.replace(/\s+/g, '');
  text = text.replace(/\//g, '');
  return text.toLowerCase();
});
app.listen(process.env.PORT || 3000);
