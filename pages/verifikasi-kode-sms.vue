<template>
  <div class="body_">
    <div style="margin-top: 100px;">
      <div class="text_color text_center mb-6">
        <div class="font_bold txt_verif">
          Verifikasi Telepon
        </div>
      </div>
      <div>
        <v-text-field
          outlined
          color="#16A086"
          v-model="phone" 
          type="number"
          placeholder="Nomor Telepon"
          prepend-inner-icon="mdi-phone">
        </v-text-field>
        <div class="position_">
          <nuxt-link to="/masuk-seminar">
            Kembali
          </nuxt-link>
        </div>
      </div>
      <div class="mt15 text_center">
        <div>
          <v-btn
            small
            style="width: 250px;"
            v-if="saveveri == false" 
            @click="resendCodeSMS"
            color="#16A086" 
            dark>
            <b>Verifikasi</b>
          </v-btn>
          <v-btn
            small
            style="width: 250px;"
            v-if="saveveri == true"
            color="#16A086" 
            dark loading>
            <b>Verifikasi</b>
          </v-btn>
        </div>
      </div>
      <div
        class="mt-2 _error text_center"
        v-if="hasOwnProp(error, 'phone') == true && 
                         error.phone.length > 0">
        {{error.phone[0].message}}
      </div>
      <div
        class="_error text_center"
        style="width: 262px; margin-top: 10px;"
        v-if="error.errorLength == false && message.length > 0">
          {{message}}
        <span v-if="toRegistrasi == true">
          , silahkan melakukan 
          <nuxt-link to="/pendaftaran-siswa" style="color: #16A086">registrasi</nuxt-link>
        </span>
        <span v-if="toVerifikasi == true">
          , <nuxt-link to="/verifikasi-kode" style="color: #16A086">ke halaman kode</nuxt-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'public',
    data() {
      return {
       phone: '',
        error: {
          phone: [],
          errorLength: false
        },
        saveveri: false,
        message:'',
        toRegistrasi: false,
        toVerifikasi: false 
      }
    },
    mounted () {
      window.history.forward();
      function noBack() { window.history.forward(); }
    },
    methods: {
      async resendCodeSMS () {
        var self = this
        this.message = ''
        this.toVerifikasi = false
        this.toRegistrasi = false
        this.error = this.validationCode();
        if (this.error.errorLength == false) {
          this.saveveri = true;
          await this.$store.dispatch('auth/POST_RESEND_SMS', {
            phone_number : this.phone
          })
          .then(res => {
            if (res.status_code == 201) {
              Cookie.set('id', res.result)
              window.location = "/verifikasi-kode"
              this.clear();
              this.saveveri = false
            } else if (res.status_code == 204) {
              this.message = res.result
              this.toVerifikasi = true
              this.saveveri = false
            } else if (res.status_code == 404) {
              this.message = res.message
              this.saveform = false
            } else if (res.status_code == 409) {
              this.message = res.message
              this.saveform = false
            } else {
              this.toRegistrasi = true
              this.message = 'Akun Anda belum terdaftar' 
              this.saveveri = false
            }
          })
        } else {
          this.saveveri = false
        }
      },
      validationCode: function () {
        var error = {
          phone: [
            { message: ''}
          ]
        }
        
        error.errorLength = false

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
      hasOwnProp: function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
      },
      validationPhone: function (phone) {
        var re = /^\d{10}|\d{2}$/;
        return re.test(phone);
      },
      clear () {
        this.phone = ''
      }
    },
    head () {
      return {
        title: 'Pendaftaran Seminar | Gotraining.co.id',
        meta: [
          { hid: 'description', name: 'description', content: 'Bagaimana cara menjadi siswa di Seminar online Gotraining?' },
          { hid: 'og:title', property: 'og:title', content: 'Pendaftaran Seminar | Gotraining.co.id' },
          { hid: 'og:description', property: 'og:description', content: 'Bagaimana cara menjadi siswa di Seminar online Gotraining?' }
        ]
      }
    }
  }
</script>

<style>
  .txt_verif {
    padding:0% 15%;
    font-size: 20px;
  }
  .v-input__slot  {
    min-height: 40px !important;
    width: 250px;
    margin-bottom: -20px;
  }
  .v-input__icon {
    align-items: center;
    display: inline-flex;
    height: 10px;
    min-width: 24px;
  }
  .v-input {
    text-align: -webkit-center;
  }
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
</style>
