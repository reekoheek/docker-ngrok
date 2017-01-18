import xin from 'xin';
import App from 'xin/components/app';

import html from './dn-app.html';

import 'xin/components/pager';
import 'xin/components/repeat';
import 'xin/components/view';
import '../vendor/log/log-middleware';
import '../vendor/jwt/jwt-middleware';
import '../vendor/lazy-view';

window.viewLoaders = [
  { test: /^dn-/, load: (view) => System.import('../views/' + view.name) },
  { test: /^test-/, load: (view) => System.import('test/' + view.name) },
];

class DnApp extends App {
  get template () {
    return html;
  }

  signedOut (evt) {
    this.navigate('/login');
  }
}

xin.define('dn-app', DnApp);

export default DnApp;
