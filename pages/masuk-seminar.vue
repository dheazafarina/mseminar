<template>
  <div class="body_ login_form">
    <div class="text_center font_bold" style="font-size: 14px; color: #16A086;">
      LOGIN SEMINAR GOTRAINING
    </div>
    <div>
      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 8%; ">
        <div 
          class="v-input__prepend-outer"
          style="margin-right: 20px; margin-top: 13px">
          <div>
            <img
              :src="require('~/assets/icon/Email_login.svg')"
              aspect-ratio="1"
              style="width: 22px"/>
          </div>
        </div>
        <div class="v-input__control">
          <div>
            <div class="v-text-field__slot">
              <input
                class="btn_btn f_input"
                type="email"
                name="email"
                v-model="username"
                v-validate="'required|email'"
                placeholder="E-mail">
            </div>
          </div>
        </div>
      </div>
      <p class="_error"
        v-show="errors.has('email')">
        {{ errors.first('email') }}
      </p>
      <p
        v-if="hasOwnProp(error, 'username') == true && 
                         error.username.length > 0"
        class="mt-2 _error">
        {{error.username[0].message}}
      </p>
      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 8%">
        <div 
          class="v-input__prepend-outer"
          style="margin-right: 20px; margin-top: 13px;">
          <div>
            <img
              :src="require('~/assets/icon/Password.svg')"
              aspect-ratio="1"
              style="width: 20px"/>
          </div>
        </div>
        <div class="v-input__control">
          <div>
            <div class="v-text-field__slot">
              <input
                class="btn_btn"
                type="password"
                name="password"
                v-model="password"
                v-validate="'required|min:8'"
                placeholder="Password">
            </div>
          </div>
        </div>
      </div>
      <p class="_error"
        v-show="errors.has('password')">
        {{ errors.first('password') }}
      </p>
      <p
        v-if="hasOwnProp(error, 'password') == true && 
                         error.password.length > 0"
        class="mt-2 _error">
        {{error.password[0].message}}
      </p>
      <div style="margin-top: 5%">
        <div class="text-xs-left">
          <v-btn
            block rounded dark
            v-if="savelogin == false"
            @click="login"
            color="#16A086">
            <b>Login</b>
          </v-btn>
          <v-btn
            block rounded dark loading
            v-if="savelogin == true"
            color="#16A086">
            <b>Login</b>
          </v-btn>
        </div>
      </div>
      <div class="mt10">
        Belum menerima verifikasi?
        <a href="/verifikasi-kode-sms" style="color: #16A086;">
          <span>
            Kirim ulang disini
          </span>
        </a>
      </div>
      <div class="mt10">
        Belum punya akun?
        <nuxt-link to="/pendaftaran-siswa">
          <span class="text_color">
            Daftar
          </span>
        </nuxt-link>
      </div>
    </div>
    <!-- <div class="mt10" style="margin-left: -12px;">
      <img
        :src="require('~/assets/image/login.png')"
        aspect-ratio="1"/>
    </div> -->
  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'public',
    data: () => ({
      username: '',
      password: '',
      select: null,
      error: {
        username: [],
        password: [],
        errorLength: false
      },
      messages:'',
      checkbox: false,
      savelogin: false
    }),
    // mounted() {
    //   if (this.error.username.length > 0 && this.error.password.length > 0) {
    //     errors.first('username') = ''
    //     errors.first('password') = ''
    //   }
    // },
    methods: {
      async login () {
          this.error = this.validation();
          if (this.error.errorLength == false) {
            this.savelogin = true
            await this.$store.dispatch('auth/POST_LOGIN', {
              username: this.username,
              password: this.password
            })
            .then ((res) => {
              var yourval = res.result
              Cookie.set('id', yourval.member_id)
              Cookie.set('user', yourval)
              Cookie.set('token', res.token, { 
                expires: (1 / 1440) * (res.exired_token / 60) 
              })
              this.$root.$loading.finish()
              window.location = '/marketplace'
              this.savelogin = false
            })
            .catch(error => {
              if (error.response.data.status_code !== 422) {
                this.messages = error.response.data.message
                this.savelogin = false
              }
              this.savelogin = false
            })
          } else {
            this.messages = ''
            this.savelogin = false
          }
      },
      validation: function () {
          var error = {
            message: '',
            username: [
              { message: '' }
            ],
            password: [
              { message: '' }
            ]
          }

          error.errorLength = false

          if (this.username.length < 1) {
            error.username[0].message = 'Masukkan email anda'
            error.errorLength = true
          } else if (this.username.length > 0 && !this.validationEmail(this.username)) {
            error.username[0].message = 'Email tidak valid'
            error.errorLength = true
          } else {
            error.username = []
          }

          if (this.password.length < 1) {
            error.password[0].message = 'Masukkan password anda'
            error.errorLength = true
          } else if (this.password.length > 0 && this.password.length < 8) {
            error.password[0].message = 'Minimal password 8 karakter'
            error.errorLength = true
          } else {
            error.password = []
          }

        return error;
      },
      validationEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
      },
      hasOwnProp: function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
      },
      clear () {
        this.username = ''
        this.password = ''
        this.select = null
        this.checkbox = false
      }
    },
    head () {
      return {
        title: 'Masuk Seminar | Gotraining.co.id',
        meta: [
          { hid: 'description', name: 'description', content: 'Masuk Seminar Gotraining' },
          { hid: 'og:title', property: 'og:title', content: 'Masuk Seminar | Gotraining.co.id' },
          { hid: 'og:description', property: 'og:description', content: 'Masuk Seminar Gotraining' },
          // { hid: 'og:url', property: 'og:url', content: 'http://m.gotraining.co.id/bantuan' }
        ]
      }
    }
  }
</script>

<style>
  ::-webkit-input-placeholder { /* Chrome */
    color: #16A086;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #16A086;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #16A086;
    opacity: 1;
  }
  :-moz-placeholder { /* Firefox 4 - 18 */
    color: #16A086;
    opacity: 1;
  }
  .f_input {
    text-align: -webkit-left !important;
  }
</style>
