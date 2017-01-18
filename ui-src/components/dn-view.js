import View from 'xin/components/view';

class DnView extends View {
  logoutClicked (evt) {
    if (window.confirm('Continue logout?')) {
      window.jwt.signout();
    }
  }
}

export default DnView;
