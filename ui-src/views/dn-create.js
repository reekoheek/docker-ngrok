import xin from 'xin';
import View from '../components/dn-view';
import ngrok from '../services/ngrok';

import html from './dn-create.html';

class DnCreate extends View {
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

  async createButtonClicked (evt) {
    evt.stopImmediatePropagation();
    evt.preventDefault();

    this.form.proto = this.$.protoGroup.proto.value;

    try {
      await ngrok.create(this.form);

      this.__app.navigate('/');
    } catch (err) {
      window.alert(err.message);
    }
  }
}

xin.define('dn-create', DnCreate);

export default DnCreate;
