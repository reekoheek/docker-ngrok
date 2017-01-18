class Ngrok {
  async fetch (uri, { method = 'GET', headers, body } = {}) {
    const options = {
      method: method,
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.jwt.getToken()}`,
      }, headers),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await window.fetch(this.getUrl(uri), options);

    if (!response.ok) {
      if (response.status === 401) {
        await window.jwt.signout();
        throw new Error('Unauthorized');
      }

      const err = new Error('HTTP Error');
      err.status = response.status;
      err.response = response;
      throw err;
    }

    return await response.json();
  }

  async all () {
    const result = await this.fetch('/api/tunnels');

    return result.tunnels;
  }

  async create (body) {
    try {
      await this.fetch('/api/tunnels', { method: 'POST', body: body });
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      const json = await err.response.json();
      throw new Error(json.details.err);
    }
    // if (result >= 400) {
    //   const data = await response.json();
    //   window.alert(data.details.err || `${data.status_code} ${data.msg}`);
    //   return;
    // }
  }

  getUrl (uri) {
    return new window.URL(uri, window.location.href).href;
  }
}

export default new Ngrok();
