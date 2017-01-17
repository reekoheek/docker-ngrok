const spawn = require('child_process').spawn;

let instance;

class Ngrok {
  constructor ({ auth } = {}) {
    this.auth = auth;
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

    this.cmd = spawn('ngrok', args, { stdio: 'inherit' });

    // this.cmd = spawn('ngrok', args);
    // this.cmd.stdout.on('data', chunk => {
    //   chunk.toString().split('\n').forEach(line => console.log('[ngrok/i]', line.trim()));
    // });
    //
    // this.cmd.stderr.on('data', chunk => {
    //   chunk.toString().split('\n').forEach(line => console.error('[ngrok/e]', line.trim()));
    // });
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
