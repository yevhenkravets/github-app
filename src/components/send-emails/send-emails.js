import ApiService from '../../services/api';
import AuthService from '../../services/auth';
import notification from '../notifications';

const debounce = (func, wait, immediate) => {
  var timeout;
  return () => {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default  {
  name: 'send-emails',
  props: [],
  beforeCreate() {
    if (!AuthService.checkToken()) {
      this.$router.push('/');
      notification.$emit('error', 'Please, first log in');
    }
  },
  mounted() {
    this.doAutocomplete = debounce(this.autocompleteHandler, 600);
  },
  data() {
    return {
      username: '',
      accounts: [],
      autocomplete: [],
      message: '',
    }
  },
  methods: {
    addAccount(u) {
      if (!this.accounts.includes(u)) {
        this.accounts.push(u);
        this.username = '';
        this.autocomplete = [];
      }
    },
    autocompleteHandler() {
      if (this.username) {
        this.autocomplete = ApiService.getUsernames(this.username)
          .then(r => this.autocomplete = r)
          .catch(e => this.$emit('error', e.message));
      } else {
        this.autocomplete = [];
      }
    },
    doAutocomplete() {},
    removeAccount(item) {
      this.accounts = this.accounts.filter(a => a !== item);
    },
    validate() {
      if (!this.accounts.length) {
        this.$emit('error', 'Please, add one or more account');
        return false;
      }
      if (!this.message()) {
        this.$emit('error', 'Please, write a message');
        return false;
      }
      return true;
    },
    sendEmails() {
      if (this.validate()) {
        ApiService.sendEmails(this.accounts, this.message)
          .then(() => this.$emit('success', 'Success'))
          .catch(e => this.$emit('error', e.message));
      }
    },
  }
}
