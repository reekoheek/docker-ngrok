const http = require('http');
const PORT = process.env.PORT || 4041;
const Bundle = require('bono/bundle');
const UIBundle = require('./bundles/ui');
const APIBundle = require('./bundles/api');

const app = new Bundle();

app.use(require('bono/middlewares/logger')());

app.bundle('/api', new APIBundle());
app.bundle('/ui', new UIBundle());

app.get('/', ctx => ctx.redirect('/ui'));

const server = http.Server(app.callback());

server.listen(PORT, () => console.log(`Listening at http://0.0.0.0:${server.address().port}`));
