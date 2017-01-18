const http = require('http');
const Bundle = require('bono/bundle');
const UIBundle = require('./bundles/ui');
const APIBundle = require('./bundles/api');
const AuthBundle = require('./bundles/auth');

const PORT = process.env.PORT || 4041;
const SECRET = process.env.API_SECRET || 'please-override-this-by-setting-up-env-API_SECRET';

const app = new Bundle();

app.use(require('bono/middlewares/logger')());

app.bundle('/auth', new AuthBundle({ secret: SECRET }));
app.bundle('/api', new APIBundle({ secret: SECRET }));
app.bundle('/ui', new UIBundle());

app.get('/', ctx => ctx.redirect('/ui/'));

const server = http.Server(app.callback());

server.listen(PORT, () => console.log(`Listening at http://0.0.0.0:${server.address().port}`));
