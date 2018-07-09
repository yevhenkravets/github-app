import ApiService from '../../services/api';
import notification from "../notifications";

export default  {
  name: 'signin',
  props: [],
  mounted() {
    $(function() {
      $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });

    });
  },
  data() {
    return {
      loginData: {
        username: 'grigoriev.aleks@gmail.com',
        password: 'alex1234'
      },
      registerData: {
        email: 'leopesyk@ukr.net',
        password: 'peolesyk'
      },
      selectedFile: null,
    }
  },
  methods: {
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
    },
    register() {
      ApiService.register(
        this.registerData.email,
        this.registerData.password,
        this.selectedFile
      )
        .then((data) => {
          console.log(data);
          notification.$emit('success', 'Great! Please, Log in now!')
        });
    },
    login() {
      ApiService.login(this.loginData.username, this.loginData.password)
        .then((data) => {
          console.log(data);
          this.$router.push('/send-email')
        });
    },
  },
  computed: {

  }
}
