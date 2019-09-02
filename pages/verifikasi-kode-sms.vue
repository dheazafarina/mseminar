<template>
  <main style="padding: 0px">
    <div style="margin: 0% 0%;">
      <div>
        <v-layout row wrap>
          <v-flex 
            xs12 sm6 md6 order-md3 order-sm1
            class="text__"
            style="background: #fff; margin-top: 130px;">
            <div style="padding-right: 20%; padding-left: 15%;">
              <div style="color: #16A086; text-align: center;">
                <div style="padding:0% 15%; font-size: 20px; font-weight: bold;">
                  Verifikasi Telephone
                </div>
              </div>
              <div style="margin-top: 20px; padding: 0% 15%;">
                <div 
                  class="v-input v-text-field input_sms"
                  style="margin-top: 8%; padding: 2px; border-radius: 4px;">
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
                        <input 
                          style="color: #16A086; font: -webkit-control;" 
                          v-model="phone" 
                          type="number" 
                          placeholder="Nomor Telepon">
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="hasOwnProp(error, 'phone') == true && 
                                    error.phone.length > 0"
                  style="margin-top: 2%; color:#16A086;">
                  {{error.phone[0].message}}
                </div>
                <div
                  class="error_message"
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
                <!-- <div
                  class="error_message"
                  style="width: 262px; margin-top: 10px;"
                  v-if="error.errorLength == false && message2.length > 0">
                  {{message2}}
                </div>
                <div
                  class="error_message"
                  style="width: 262px; margin-top: 10px;"
                  v-if="error.errorLength == false && message4.length > 0">
                  {{message4}}
                </div> -->
              </div>
              <div style="margin-top: 3%">
                <div style="padding: 0% 15%;">
                  <nuxt-link to="/masuk-seminar">
                    Kembali
                  </nuxt-link>
                </div>
                <div class="text-xs-left" style="padding: 0% 12%;">
                  <v-btn 
                    v-if="saveveri == false" 
                    @click="resendCodeSMS" 
                    style="width: 95%;" 
                    color="#16A086" 
                    dark>
                    <b>Verifikasi</b>
                  </v-btn>
                  <v-btn 
                    v-if="saveveri == true" 
                    style="width: 95%;" 
                    color="#16A086" 
                    dark 
                    loading>
                    <b>Verifikasi</b>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex 
            xs12 sm6 md6 order-md4 order-sm2
            style="margin-top: -10px; text-align: right">
            <div>
              <!-- <img
                :src="require('~/assets/login.png')"
                aspect-ratio="1"
                style="height: -webkit-fill-available; width: 100%;"/> -->
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from 'axios';
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'public',
    data: () => ({
      phone: '',
      error: {
        phone: [],
        errorLength: false
      },
      saveveri: false,
      message:'',
      toRegistrasi: false,
      toVerifikasi: false
    }),
    mounted () {
      // if (this.$store.state.auth.id !== null) {
      //   window.location = "/verifikasi-kode"
      // }
      // this.time()
      window.history.forward();
      function noBack() { window.history.forward(); }
    },
    // computed: {
    //   expired () {
    //     if (this.$store.state.auth.id == null) {
    //       return 0
    //     } else {
    //       return this.$store.state.auth.id.date_time
    //     }
    //   }
    // },
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
          // axios.post(`${process.env.API_MEMBER}resend-by-phone`, {
          //     phone_number : this.phone
          //   },
          //   {
          //     headers: {
          //       'X-Authorization': `${process.env.AUTH_PUBLIC}`
          //     }
          //   }
          // )
          // .then(res => {
          //   if (res.status == 200) {
          //     if (res.data.status_code == 204) {
          //       this.message4 = res.data.result
          //       this.saveveri = false
          //       this.message2 = ''
          //       this.message = ''
          //     } else {
          //       this.message = 'Akun Anda belum terdaftar'
          //       this.message2 = ''
          //       this.message4 = ''
          //     }
          //     this.saveveri = false
          //   } else if (res.status == 201) {
          //       Cookie.set('id', res.data.result)
          //       window.location = "/verifikasi-kode"
          //       this.clear();
          //       this.saveveri = false
          //       this.message = ''
          //     }
          //   this.saveveri = false
          // })
          // .catch(error => {
          //   this.saveveri = false
          //   if (error.response.data.status_code == 404) {
          //     this.message = error.response.data.message
          //     this.message2 = ''
          //   }
          //   if (error.response.data.status_code == 409) {
          //     this.message = ''
          //     this.message2 = error.response.data.message
          //   }
          // })
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
  .input_kode_veri {
    border: none;
    width: 7ch;
    background: 
      repeating-linear-gradient(90deg, 
          dimgrey 0, 
          dimgrey 1ch, 
          transparent 0, 
          transparent 1.5ch) 
        0 100%/100% 2px no-repeat;
    color: dimgrey;
    font: 4ch consolas, monospace;
    letter-spacing: .5ch;
  }
  .input_kode_veri:focus {
    outline: none;
    color: #16A086;
    background: repeating-linear-gradient(90deg, #16A086 0, #16A086 1ch, transparent 0, transparent 1.5ch) 0 100%/100% 2px no-repeat;
  }
  .error_message {
    font-size: 13px;
    color: red;
    margin-top: -10px;
    margin-bottom: 5px;
    font-family: Lato;
  }
  .input_sms {
    border: 0.5px solid #a9e6db; 
  }
  /* .input_sms:focus {
    border: 0.5px solid #16A086 !important; 
  } */
</style>
