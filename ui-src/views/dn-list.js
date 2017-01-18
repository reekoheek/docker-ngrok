import xin from 'xin';
import View from '../components/dn-view';
import ngrok from '../services/ngrok';

import html from './dn-list.html';

class DnList extends View {
  get template () {
    return html;
  }

  focused () {
    super.focused();

    (async () => {
      this.set('tunnels', await ngrok.all());
    })();
  }

  createButtonClicked (evt) {
    this.__app.navigate('/create');
  }
}

xin.define('dn-list', DnList);

export default DnList;
