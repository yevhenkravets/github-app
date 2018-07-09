<template>
  <div class="top-alert" v-if="msg">
    <div class="alert alert-success alert-dismissible fade in " role="alert">
      {{msg}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="msg = ''">
        <span aria-hidden="true">×</span>
      </button>
    </div>
  </div>
</template>
<script>
  export default  {
    name: 'success-notification',
    props: {
      message: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        msg: this.message,
      }
    },
    mounted() {
      setTimeout(() => this.msg = '', 3000);
    }
  }
</script>
<style>
  .top-alert {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100000;
    left: 0;
    padding: 20px;
    display: inline-block;
    text-align: center;
  }
  .top-alert .alert {
    width: auto !important;
    height: 100%;
    display: inline;
    position: relative;
    margin: 0;
  }
  .top-alert .alert .close {
    position: absolute;
    top: 11px;
    right: 10px;
    color: inherit;
  }
</style>
