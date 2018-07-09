import axios from 'axios';
import auth from './auth';
import notification from '../components/notifications';

const API_URL = 'http://194.44.253.78:6030';

const ApiService = {
  _handleError(e) {
    notification.$emit('error', e.message);
    throw e;
  },
  login(email, password) {
    console.log(8, { email, password });
    return axios.post(`${API_URL}/auth/signin`, { email, password })
      .then(res => {
        return res.data;
      })
      .then(data => {
        console.log(11, data);
        auth.setData(data)
      })
      .catch(this._handleError);
  },
  register(email, password, image) {
    const formData = new FormData();
    formData.append('avatar', image, image.name);
    formData.append('email', email);
    formData.append('password', password);
    return axios.post(`${API_URL}/auth/signup`, formData)
      .then(res => res.data)
      .catch(this._handleError);
  },
  getUsernames(u) {
    const url = `https://api.github.com/search/users?q=${u}+in:login&type=Users`;
    return axios.get(url)
      .then(r => {
        return r.data.items.map(i => i.login).slice(0, 4)
      })
      .catch(this._handleError);
  },
  sendEmails(usernames, message) {
    const config = {
      url: `${API_URL}/api/v1/github/send-emails`,
      method: 'post',
      data: { usernames, message },
      headers: {
        Authorization: auth.getToken()// || 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQwZWE1ZGYzZjg3YzRhOTE2MGExYjkiLCJlbWFpbCI6ImdyaWdvcmlldi5hbGVrc0BnbWFpbC5jb20iLCJhdmF0YXJVcmwiOiJodHRwOi8vMTk0LjQ0LjI1My43ODo2MDMwL0RTQzA2OTgwLkpQRyIsImlhdCI6MTUzMTEzMDQ1NX0.ryLCt5pPzfFr-tdc9kA5AvJ1C51eqI70qP3TQHYLvzs'
      }
    };
    return axios(config)
      .then(res => res.data)
      .then(data => {
        const result = data.reduce((a, b) => {
          const localResult = `${b.username} - email: ${b.email}, sent: ${b.emailSent.success}, with weather: ${b.emailSent.success}\n`;
          return a + localResult;
        }, '');
        notification.$emit('success', result);
      })
      .catch(this._handleError);
  }
};

export default ApiService;
