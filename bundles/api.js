const Bundle = require('bono/bundle');
const cors = require('kcors');
const Ngrok = require('../services/ngrok');
const jwt = require('koa-jwt');

class APIBundle extends Bundle {
  constructor ({ secret }) {
    super();

    this.use(cors());

    this.use(jwt({ secret }));

    this.use(async (ctx, next) => {
      if (await ngrok.dispatch(ctx)) {
        return;
      }

      await next();
    });

    this.use(async (ctx, next) => {
      ctx.ngrok = ngrok;

      await next();
    });

    const ngrok = Ngrok.instance();
    ngrok.start();
  }
}

module.exports = APIBundle;
