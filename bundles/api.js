const Bundle = require('bono/bundle');

class APIBundle extends Bundle {
  constructor () {
    super();

    const ngrok = require('../services/ngrok').instance();

    ngrok.start();

    this.use(async (ctx, next) => {
      ctx.ngrok = ngrok;

      await next();
    });
  }
}

module.exports = APIBundle;
