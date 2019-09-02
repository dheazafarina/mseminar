<template>
  <main style="padding: 0px">
    <div style="margin: 0% 0%;">
      <div>
        <v-layout wrap>
          <v-flex 
            xs12 sm6 md6 order-md3 order-sm1
            class="text__"
            style="background: #fff;">
            <div style="padding-top: 14%; padding-right: 35%; padding-left: 15%; padding-bottom: 5%">
              <span>
                <b style="line-height: 1.25; color: #16A086; font-size: 40px;"> LOGIN SEMINAR <br> GOTRAINING </b>
                <div 
                  class="v-input v-text-field"
                  style="border-bottom: 0.5px solid #16A086; margin-top: 10%; ">
                  <div 
                    class="v-input__prepend-outer"
                    style="margin-right: 5px; margin-top: 3px">
                    <div class="v-input__icon v-input__icon--prepend">
                      <img
                        :src="require('~/assets/icon/Email_login.svg')"
                        aspect-ratio="1"
                        style="width: 22px"/>
                    </div>
                  </div>
                  <div class="v-input__control">
                    <div>
                      <div class="v-text-field__slot">
                        <input style="color: #16A086; font: -webkit-control;" v-model="username" type="text" placeholder="E-mail">
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="hasOwnProp(error, 'username') == true && 
                                    error.username.length > 0"
                  style="margin-top: 2%; color:red;">
                  {{error.username[0].message}}
                </div>
                <div 
                  class="v-input v-text-field"
                  style="border-bottom: 0.5px solid #16A086; margin-top: 8%">
                  <div 
                    class="v-input__prepend-outer"
                    style="margin-right: 5px; margin-top: 2px;">
                    <div class="v-input__icon v-input__icon--prepend">
                      <img
                        :src="require('~/assets/icon/Password.svg')"
                        aspect-ratio="1"
                        style="width: 20px"/>
                    </div>
                  </div>
                  <div class="v-input__control">
                    <div>
                      <div class="v-text-field__slot">
                        <input style="color: #16A086; font: -webkit-control;" v-model="password" type="password" placeholder="Password">
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="hasOwnProp(error, 'password') == true && 
                                    error.password.length > 0"
                  style="margin-top: 2%; color:red;">
                  {{error.password[0].message}}
                </div>
                <div class="forget">
                </div>
                <div style="margin-top: 10%">
                  <div class="text-xs-left">
                    <v-btn v-if="savelogin == false" @click="login" style="width: 95%;" round color="#16A086" dark><b>Login</b></v-btn>
                    <v-btn v-if="savelogin == true" style="width: 95%;" round color="#16A086" dark loading><b>Login</b></v-btn>
                  </div>
                </div>
                <div 
                  v-if="messages.length > 0">
                  <div>
                    <div style="padding-top: 5px; padding-bottom: 10px;">
                      <div>
                        <div style="color: red; text-align: center;">
                          {{ messages }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="margin-top: 15px;">
                  Belum menerima verifikasi ? <a href="/verifikasi-kode-sms" style="color: #16A086;">Kirim ulang disini</a>
                </div>
                <div style="margin-top: 5px;">
                  Belum punya akun ? <nuxt-link to="/pendaftaran-siswa" style="color: #16A086;">Daftar</nuxt-link>
                </div>
              </span>
            </div>
          </v-flex>
          <v-flex 
            xs12 sm6 md6 order-md4 order-sm2
            style="margin-top: -10px; text-align: right">
            <div>
              <!-- <img
                :src="require('~/assets/login.png')"
                aspect-ratio="1"
                style="height: 600px; width: 100%;"/> -->
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </main>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'public',
    data: () => ({
      username: '',
      password: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      error: {
        username: [],
        password: [],
        errorLength: false
      },
      messages:'',
      checkbox: false,
      savelogin: false
    }),
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
  .forget {
    margin-top: 5%;
    text-align: center;
    color: #16A086;
  }
</style>
