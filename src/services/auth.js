class Token {
  setData({ token = '', email, avatarUrl }) {
    this.token = token;
    this.email = email;
    this.avatarUrl = avatarUrl;
  }

  checkToken() {
    return !!this.token;
  }

  getToken() {
    if (!this.token) {
      return '';
    }
    return `JWT ${this.token}`
  }
}

const auth = new Token();

module.exports = auth;
