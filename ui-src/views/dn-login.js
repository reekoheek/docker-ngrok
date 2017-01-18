import xin from 'xin';
import View from 'xin/components/view';

import html from './dn-login.html';

class DnLogin extends View {
  get template () {
    return html;
  }

  get props () {
    return Object.assign({}, super.props, {
      form: {
        type: Object,
        value: () => ({}),
      },
    });
  }

  async loginButtonClicked (evt) {
    evt.stopImmediatePropagation();
    evt.preventDefault();

    try {
      await window.jwt.signin(this.form);

      this.__app.navigate('/');
    } catch (err) {
      console.error(err);
    }
  }
}

xin.define('dn-login', DnLogin);

export default DnLogin;
