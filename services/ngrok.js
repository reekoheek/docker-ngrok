const fetch = require('node-fetch');
const spawn = require('child_process').spawn;

let instance;

class Ngrok {
  constructor ({ auth } = {}) {
    this.auth = auth;
    this.url = 'http://localhost:4040';
  }

  start () {
    process.once('SIGUSR2', () => {
      this.cmd.kill('SIGHUP');
      process.kill(process.pid, 'SIGUSR2');
    });

    const args = [ 'start', '--none', '-log=stdout' ];
    if (this.auth) {
      args.push(`-authtoken=${this.auth}`);
    }

    // this.cmd = spawn('ngrok', args, { stdio: 'inherit' });

    this.cmd = spawn('ngrok', args);
    this.cmd.stdout.on('data', chunk => {
      chunk.toString().split('\n').forEach(line => console.log('[ngrok/i]', line.trim()));
    });

    this.cmd.stderr.on('data', chunk => {
      chunk.toString().split('\n').forEach(line => console.error('[ngrok/e]', line.trim()));
    });

    this.createDefaultTunnels();
  }

  async createDefaultTunnels () {
    await new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          console.log('Creating default tunnels');

          // await this.create({
          //   name: 'ssh',
          //   proto: 'tcp',
          //   addr: '22',
          // });

          await this.create({
            name: 'ngrok',
            proto: 'http',
            addr: '4041',
          });

          resolve();
        } catch (err) {
          reject(err);
        }
      }, 1000);
    });
  }

  async create (body) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const response = await fetch(this.createUrl('/tunnels'), options);

    if (response.status >= 400) {
      const data = await response.text();

      console.error('err create', data);
      return false;
    }

    return true;
  }

  createUrl (uri) {
    return `${this.url}/api${uri}`;
  }

  async dispatch (ctx) {
    if (ctx.url.indexOf('/tunnels') !== 0) {
      return;
    }

    const options = {
      method: ctx.method,
      headers: { 'Content-Type': 'application/json' },
      body: ctx.req,
    };

    const response = await fetch(this.createUrl(ctx.url), options);
    ctx.body = response.body;
    ctx.status = response.status;

    return true;
  }

  static instance () {
    if (!instance) {
      instance = new Ngrok({
        auth: process.env.NGROK_AUTH,
      });
    }

    return instance;
  }
}

module.exports = Ngrok;
