<template>
  <div>
    <router-view @error="onError" @success="onSuccess"></router-view>
    <error-notification v-if="errorMessage" :message="errorMessage"></error-notification>
    <success-notification v-if="successMessage" :message="successMessage"></success-notification>
  </div>
</template>

<script>
import errorNotification from './components/notifications/error';
import successNotification from './components/notifications/success';
import notification from './components/notifications';

export default {
  name: 'app',
  components: {
    errorNotification,
    successNotification,
  },
  beforeCreate() {
    notification.$on('error', e => this.onError(e));
    notification.$on('success', m => this.onSuccess(m));
  },
  data () {
    return {
      errorMessage: '',
      successMessage: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onError(m) {
      this.errorMessage = m;
      setTimeout(() => this.errorMessage = '', 3000)
    },
    onSuccess(m) {
      console.log(28);
      this.successMessage = m;
      setTimeout(() => this.successMessage = '', 3000)
    },
  },
}
</script>
