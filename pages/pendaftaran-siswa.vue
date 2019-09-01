<template>
  <div class="body_">
    
    <div class="text_center font_bold"
      style="font-size: 14px; color: #16A086;">
      DAFTAR SISWA SEMINAR GOTRAINING
    </div>
    
    <div>
      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 10%; ">
        <div class="v-input__prepend-outer txt_input">
          <div>
            <img
              :src="require('~/assets/icon/user.png')"
              aspect-ratio="1"
              style="width: 17px"/>
          </div>
        </div>
        <div class="v-input__control">
          <div>
            <div class="v-text-field__slot">
              <input class="txt_field"
                v-model="form.name"
                type="text"
                placeholder="Nama">
            </div>
          </div>
        </div>
      </div>

      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 8%; ">
        <div class="v-input__prepend-outer txt_input">
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
              <input class="txt_field"
                v-model="form.email"
                type="text"
                placeholder="E-mail">
            </div>
          </div>
        </div>
      </div>
      <p class="_error"
        v-show="errors.has('email')">
        {{ errors.first('email') }}
      </p>

      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 8%">
        <div class="v-input__prepend-outer txt_input">
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
              <input class="txt_field"
                v-model="form.password"
                type="password"
                name="password"
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

      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 8%">
        <div class="v-input__prepend-outer txt_input">
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
              <input class="txt_field"
                v-model="form.confirm_password"
                type="password"
                placeholder="Konfirmasi Password">
            </div>
          </div>
        </div>
      </div>

      <div 
        class="v-input v-text-field"
        style="border-bottom: 0.5px solid #16A086; margin-top: 8%">
        <div class="v-input__prepend-outer txt_input">
          <div>
            <img
              :src="require('~/assets/icon/phone-call.png')"
              aspect-ratio="1"
              style="width: 15px"/>
          </div>
        </div>
        <div class="v-input__control">
          <div>
            <div class="v-text-field__slot">
              <input class="txt_field"
                v-model="form.phone"
                type="number"
                placeholder="Nomor Telepon">
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-left: 10px;">
        <v-layout row wrap style="margin-top: 5%; cursor: pointer;">
          <v-flex xs1 sm1 md1>
            <v-checkbox
              v-model="checkbox"
              color="#16A086"
              style="margin-top: 0px; padding-top: 0px;">
            </v-checkbox>
          </v-flex>
          <v-flex xs10 sm11 md11>
            Dengan memberi tanda centang, maka anda telah menyetujui Syarat, Ketentuan dan Kebijakan Privasi Gotraining.
          </v-flex>
        </v-layout>
      </div>

      <div style="margin-top: 5%" v-if="checkbox == true">
        <div class="text-xs-left">
          <v-btn v-if="savereg == false"
            @click="save"
            style="width: 95%;"
            color="#16A086" dark>
            <b>Registrasi</b>
          </v-btn>
          <v-btn v-if="savereg == true"
            style="width: 95%;"
            color="#16A086"
            dark loading>
          </v-btn>
        </div>
      </div>
      <div style="margin-top: 5%" v-if="checkbox == false">
        <div class="text-xs-left">
          <v-btn disabled 
            style="width: 95%;"
            color="#16A086">
            <b>Registrasi</b>
          </v-btn>
        </div>
      </div>

      <div class="mt15">
        Sudah punya akun ? <nuxt-link to="/masuk-seminar" style="color: #16A086;">Login</nuxt-link>
      </div>
      <div style="margin-top: 5px;">
        Jika Anda belum terverifikasi <nuxt-link to="/verifikasi-kode" style="color: #16A086;">Silahkan Verifikasi</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    data () {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          confirm_password: '',
          phone: ''
        },
        checkbox: false,
        savereg: false,
        response: ''
      }
    },
    methods: {
      async save () {
        const valid = await this.$validator.validateAll()
        if (valid) {
          this.savereg = true
          await this.$store.dispatch('auth/REGISTER', {
            member_name : this.form.name,
            member_email : this.form.email,
            member_password : this.form.password,
            member_password_confirmation : this.form.confirm_password,
            member_mobile_phone_number : this.form.phone,
          })
          .then ((res) => {
            if (res.status_code === 201) {
              Cookie.set('registrations', res.result)
              window.location = '/verifikasi'
              this.savereg = false
            } else {
              this.response = res.message
            }
          })
        }
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
  .txt_field {
    color: #16A086;
    font: -webkit-control
  }
  .txt_input {
    margin-right: 20px;
    margin-top: 13px;
  }
</style>