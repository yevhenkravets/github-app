import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import SignIn from './components/sign-in'
import SendEmails from './components/send-emails'
import notification from './components/notifications'

Vue.use(VueRouter);

const router = new VueRouter({ routes: [
    {
      name: "default",
      path: "/",
      redirect: "/signin",
    },
    {
      name: 'signin',
      path: '/signin',
      component: SignIn
    },
    {
      name: 'send-emails',
      path: '/send-emails',
      component: SendEmails,
    },
  ],
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
  }
});
