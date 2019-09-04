<template>
  <div>
    <!-- <div 
      v-if="load == false" 
      class="text_center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div> -->
    <div v-if="load == true" class="login_reg">
      <span>
        <b  style="line-height: 1.25; color: #16A086; font-size: 27px;"> DAFTAR SISWA SEMINAR <br> GOTRAINING </b>
        <div style="padding-right: 20%;">
          <div 
            class="v-input v-text-field"
            style="border-bottom: 0.5px solid #16A086; margin-top: 10%; ">
            <div 
              class="v-input__prepend-outer"
              style="margin-right: 5px; margin-top: 3px">
              <div class="v-input__icon v-input__icon--prepend">
                <img
                  :src="require('~/assets/icon/user.png')"
                  aspect-ratio="1"
                  style="width: 17px"/>
              </div>
            </div>
            <div class="v-input__control">
              <div>
                <div class="v-text-field__slot">
                  <input style="color: #16A086; font: -webkit-control;" v-model="name" type="text" placeholder="Nama">
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="hasOwnProp(error, 'name') == true && 
                              error.name.length > 0"
            style="margin-top: 2%; color:red;">
            {{error.name[0].message}}
          </div>
          <div 
            class="v-input v-text-field"
            style="border-bottom: 0.5px solid #16A086; margin-top: 8%; ">
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
            v-if="message_email.length > 0"
            style="margin-top: 2%; color:red;">
            {{ message_email }}
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
                  <input style="color: #16A086; font: -webkit-control;" v-model="confirm_pass" type="password" placeholder="Konfimasi Password">
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="hasOwnProp(error, 'confirm_pass') == true && 
                              error.confirm_pass.length > 0"
            style="margin-top: 2%; color:red;">
            {{error.confirm_pass[0].message}}
          </div>
          <div 
            class="v-input v-text-field"
            style="border-bottom: 0.5px solid #16A086; margin-top: 8%">
            <div 
              class="v-input__prepend-outer"
              style="margin-right: 5px; margin-top: 2px;">
              <div class="v-input__icon v-input__icon--prepend">
                <img
                  :src="require('~/assets/icon/phone-call.png')"
                  aspect-ratio="1"
                  style="width: 15px"/>
              </div>
            </div>
            <div class="v-input__control">
              <div>
                <div class="v-text-field__slot">
                  <input style="color: #16A086; font: -webkit-control;" v-model="phone" type="number" placeholder="Nomor Telepon">
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="hasOwnProp(error, 'phone') == true && 
                              error.phone.length > 0"
            style="margin-top: 2%; color:red;">
            {{error.phone[0].message}}
          </div>
          <div
            v-if="message_phone.length > 0"
            style="margin-top: 2%; color:red;">
            {{ message_phone }}
          </div>
          <div>
            <v-layout row wrap style="margin-top: 5%; cursor: pointer;">
              <v-flex 
                xs12 sm1 md1>
                <v-checkbox
                  v-model="checkbox"
                  color="#16A086"
                  style="margin-top: 0px; padding-top: 0px;"
                ></v-checkbox>
              </v-flex>
              <v-flex 
                @click="checkbox = true"
                v-if="checkbox == false"
                xs12 sm11 md11>
                Dengan memberi tanda centang, maka anda telah menyetujui Syarat, Ketentuan dan Kebijakan Privasi Gotraining.
              </v-flex>
              <v-flex 
                v-if="checkbox == true"
                @click="checkbox = false"
                xs12 sm11 md11>
                Dengan memberi tanda centang, maka anda telah menyetujui Syarat, Ketentuan dan Kebijakan Privasi Gotraining.
              </v-flex>
            </v-layout>
          </div>
          <div class="forget">
            <!-- Lupa Password -->
          </div>
          <!-- <div 
            v-if="messages.length > 0 && error.username.length == 0"
            class="el-card is-always-shadow"
            style="box-shadow: none; background: antiquewhite; margin-bottom: 2%; margin-top: 7%; border: 1px solid red;">
            <div>
              <div style="padding-top: 10px; padding-bottom: 10px;">
                <div>
                  <div style="color: red; text-align: center;">
                    {{ messages }}
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div style="margin-top: 5%" v-if="checkbox == true">
            <div class="text-xs-left">
              <v-btn v-if="savereg == false" @click="save" style="width: 95%;" rounded color="#16A086" dark><b>Registrasi</b></v-btn>
              <v-btn v-if="savereg == true" style="width: 95%;" rounded color="#16A086" dark loading><b>Login</b></v-btn>
            </div>
          </div>
          <div style="margin-top: 5%" v-if="checkbox == false">
            <div class="text-xs-left">
              <v-btn disabled style="width: 95%;" rounded color="#16A086"><b>Registrasi</b></v-btn>
            </div>
          </div>
          <div 
            v-if="message.length > 0">
            <div>
              <div style="padding-top: 5px; padding-bottom: 10px;">
                <div>
                  <div style="color: red; text-align: center;">
                    {{ message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 15px;">
            Sudah punya akun ? <nuxt-link to="/masuk-seminar" style="color: #16A086;">login</nuxt-link>
          </div>
          <div style="margin-top: 5px;">
            Jika Anda belum terverifikasi <nuxt-link to="/verifikasi-kode" style="color: #16A086;">Silahkan Verifikasi</nuxt-link>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'public',
    data: () => ({
      username: '',
      password: '',
      name: '',
      confirm_pass:'',
      phone:'',
      select: null,
      checkbox: false,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      error: {
        username: [],
        password: [],
        name:[],
        confirm_pass:[],
        phone: [],
        errorLength: false
      },
      messages: '',
      message_phone: '',
      message_email: '',
      checkbox: false,
      savereg: false,
      message:'',
      load: false
    }),
    mounted(){
      this.loader()
    },
    methods: {
      async save () {
        var self = this
        this.error = this.validation();
        if (this.error.errorLength == false) {
        this.savereg = true;
        this.message = ''
        this.message_phone= ''
        this.message_email= ''
        await this.$store.dispatch('auth/POST_REGISTRASI', {
            member_name : this.name,
            member_email : this.username,
            member_password : this.password,
            member_password_confirmation : this.confirm_pass,
            member_mobile_phone_number : this.phone,
          })
          .then(res => {
            if (res.status_code == 201) {
              Cookie.set('id', res.result)
              window.location = "/verifikasi-kode"
              this.savereg = false;
              this.clear();
            } else if (res.status_code == 422) {
              for (let i in res.error) {
                if (i === 'member_mobile_phone_number' && i === 'member_email') {
                  this.message_phone = res.error.member_mobile_phone_number[0].message;
                  this.message_email = res.error.member_email[0].message;
                } else if (i === 'member_email') {
                  this.message_email = res.error.member_email[0].message;
                } else if (i === 'member_mobile_phone_number') {
                  this.message_phone = res.error.member_mobile_phone_number[0].message;
                }
                this.savereg = false;
              }
            } else if (res.status_code == 404) {
              this.message = res.message
              this.savereg = false;
            }else {
              this.savereg = false;
            }
          })
        } else {
          this.savereg = false
        }
      },
      loader: function (paras) {
        this.load = true
      },
      validation: function () {
        var error = {
          message: '',
          username: [
            { message: '' }
          ],
          password: [
            { message: '' }
          ],
          name: [
            { message: '' }
          ],
          phone: [
            { message: '' }
          ],
          confirm_pass: [
            { message: '' }
          ]
        }

        error.errorLength = false

        if (this.name.length < 1) {
          error.name[0].message = 'Masukkan nama lengkap Anda';
          error.errorLength = true;
        }  else {
          error.name = [];
        }

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

        if (this.confirm_pass.length < 1) {
          error.confirm_pass[0].message = 'Konfirmasi password';
          error.errorLength = true;
        } else if (this.confirm_pass.length > 0 && this.confirm_pass !== this.password) {
          error.confirm_pass[0].message = 'Konfirmasi password tidak sesuai';
          error.errorLength = true;
        } else {
          error.confirm_pass = [];
        }

        if (this.phone.length < 1) {
          error.phone[0].message = 'Masukkan nomor telepon aktif';
          error.errorLength = true;
        } else if (this.phone.length < 10) {
          error.phone[0].message = 'Minimal nomor handphone 10 Karakter';
          error.errorLength = true;
        } else if (this.phone.length > 13) {
          error.phone[0].message = 'Maksimal nomor handphone 13 Karakter';
          error.errorLength = true;
        } else if (this.phone.length > 0 && !this.validationPhone(this.phone)) {
          error.phone[0].message = 'Nomor telepon tidak valid'
          error.errorLength = true
        } else {
          error.phone = [];
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
      validationPhone: function (phone) {
        var re = /^\d{10}|\d{2}$/;
        return re.test(phone);
      },
      clear () {
        this.username = ''
        this.password = ''
        this.name = '',
        this.confirm_pass ='',
        this.phone ='',
        this.select = null
        this.checkbox = false
      }
    },
    head () {
      return {
        title: 'Pendaftaran Seminar | Gotraining.co.id',
        meta: [
          { hid: 'description', name: 'description', content: 'Bagaimana cara menjadi siswa di Seminar online Gotraining?' },
          { hid: 'og:title', property: 'og:title', content: 'Pendaftaran Seminar | Gotraining.co.id' },
          { hid: 'og:description', property: 'og:description', content: 'Bagaimana cara menjadi siswa di Seminar online Gotraining?' },
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
  .checkbox_ {
    height: 19px;
    width: 19px;
    background-color: #fff;
  }
  .error_message {
    font-size: 13px;
    color: red;
    margin-top: -10px;
    margin-bottom: 5px;
    font-family: Lato;
  }
</style>
