const Bundle = require('bono/bundle');
const jwt = require('koa-jwt');
const parse = require('co-body');

class AuthBundle extends Bundle {
  constructor ({ secret }) {
    super();

    this.secret = secret;

    this.post('/signin', this.signin.bind(this));
    // this.post('/signout', this.signout.bind(this));
  }

  async signin (ctx) {
    const { username, password } = (await parse.json(ctx)) || {};
    if (username === 'admin' && password === 'password') {
      const today = new Date();
      const expDate = new Date(today);
      expDate.setDate(today.getDate() + 1);
      const exp = parseInt(expDate.getTime() / 1000);

      ctx.body = {
        token: jwt.sign({ username, exp }, this.secret),
        message: 'Successfully signed in!',
      };

      return;
    }

    ctx.status = 401;
    ctx.body = { message: 'Authentication failed' };
  }

  // async signout (ctx) {
  //
  // }
}

module.exports = AuthBundle;
