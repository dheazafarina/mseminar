<template>
  <main style="padding: 0px">
    <div style="margin: 0% 0%;">
      <div>
        <v-layout row wrap>
          <v-flex 
            xs12 sm6 md6 order-md3 order-sm1
            class="text__"
            style="background: #fff;">
            <div style="padding-top: 10%; padding-right: 20%; padding-left: 15%; padding-bottom: 5%">
              <div style="color: #16A086; text-align: center;">
                <p style="line-height: 1.25; color: #16A086; font-size: 30px; font-weight: bold;">
                  Pendaftaran Seminar Berhasil
                </p>
                <p style="font-weight: bold; padding:0% 15%;">
                  Kami telah mengirimkan kode verifikasi melalui SMS ke nomor {{phonenumber}}
                </p>
                <div style="padding:0% 15%;">
                  Masukkan kode tersebut untuk melengkapi tahap pendaftaran
                </div>
              </div>
              <div style="text-align: center; margin-top: 70px;">
                <input v-model="code_number" class="input_kode_veri" maxlength='5'/>
                <div
                  class="error_message"
                    style="width: 250px; margin-left: auto; margin-right: auto;     margin-top: 10px;"
                  v-if="hasOwnProp(error, 'code_number') == true &&  error.code_number.length > 0">
                  {{error.code_number[0].message}}
                </div>
                <div
                  class="error_message"
                    style="width: 250px; margin-left: auto; margin-right: auto; margin-top: 10px;"
                  v-if="error.errorLength == false && message.length > 0">
                  {{message}}
                </div>
              </div>
              <div style="margin-top: 5%">
                <div 
                  class="text-xs-left" 
                  style="padding: 0% 12%;">
                  <v-btn 
                    v-if="saveveri == false" 
                    @click="sendComfirmation" 
                    style="width: 95%;" 
                    round
                    color="#16A086" dark>
                    <b>Verifikasi</b>
                  </v-btn>
                  <v-btn 
                    v-if="saveveri == true" 
                    style="width: 95%;" 
                    round 
                    color="#16A086" 
                    dark 
                    loading>
                    <b>Verifikasi</b>
                  </v-btn>
                </div>
              </div>
              <div style="text-align: center;  padding-top: 12px;">
                Belum punya kode verifikasi? <br>
                <vac
                  ref="sendSMSOtp"
                  :autoStart="false"
                  :end-time="expired">
                  <span
                    slot="before"
                    style="color: #3eb0d2 !important; cursor: pointer;">
                    Kirim Kode Verifikasi
                  </span>
                  <span
                    slot="process"
                    slot-scope="{ state, timeObj }">
                    Kirim ulang dalam
                    <b>
                      {{ `${timeObj.m}:${timeObj.s}` }}
                    </b>
                  </span>
                  <span style="cursor: pointer; color: #16A086"
                    slot="finish"
                    v-if="send_code == false"
                    @click="fetchExpired">
                    Kirim ulang Kode Verifikasi
                  </span>
                </vac>
              </div>
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
    middleware: 'unauth',
    data: () => ({
      username: '',
      password: '',
      name: '',
      confirm_pass:'',
      phone:'',
      select: null,
      checkbox: false,
      code_number:'',
      error: {
        code_number: [],
        errorLength: false
      },
      messages: '',
      message_phone: '',
      message_email: '',
      checkbox: false,
      saveveri: false,
      message:'',
      send_code : false,
      phonenumber :'',
      load : false
    }),
    mounted () {
      this.time()
    //   if (this.$store.state.auth.id.date_time === undefined) {
    //     window.location = "/verifikasi-kode-sms"
    //   }
      this.phonenumber = this.$store.state.auth.id.member_phone
    },
    computed: {
      expired () {
        if (this.$store.state.auth.id !== null) {
          return this.$store.state.auth.id.date_time
        } else {
          this.next()
        }
      }
    },
    methods: {
      next: function() {
        window.location = `/verifikasi-kode-sms`
      },
      async time (){
        const voc = this.$refs.sendSMSOtp
        voc.startCountdown(true)
      },
      async fetchExpired () {
        this.send_code = true
        await this.$store.dispatch('auth/GET_PHONE_EXPIRED')
        .then ((res) => {
          if (res.status_code == 204) {
            // this.message = 'Nomor Belum Terdaftar Silahkan Melaukan Regristrasi'
          } else if (res.status_code == 200) {
            Cookie.set('id', res.result)
            const voc = this.$refs.sendSMSOtp
            voc.startCountdown(true)
            this.send_code = false
          } else if (res.status_code == 404) {
            this.message = res.data.message
          }
          this.saveveri = false
        })
        .catch(error => {
          this.saveveri = false
          if (error.response.data.status_code == 404) {
            this.message = error.response.data.message
          }
          if (error.response.data.status_code == 409) {
            this.message = error.response.data.message
          }
        })
      },
      async sendComfirmation () {
        var self = this
        this.error = this.validationCode();
        if (this.error.errorLength == false) {
        this.saveveri = true
        await this.$store.dispatch('auth/POST_CONFIRMATION_SMS', {
          member_hash : this.code_number
        })
        .then(res => {
          if (res.status_code == 201) {
            window.location = "/komfirmasi-pendaftaran-siswa"
            this.clear();
            Cookie.remove('id');
            this.saveveri = false;
          } else if (res.status_code == 404) {
            this.message = res.message
            this.saveveri = false
          } else if (res.status_code == 409) {
            this.message = res.message
            this.saveveri = false
          } else {
            this.message = res.message 
            this.saveveri = false
          }
        })
        // axios.post(`${process.env.API_MEMBER}confirmation-sms`, {
        //     member_hash : this.code_number
        //   },
        //   {
        //     headers: {
        //       'X-Authorization': `${process.env.AUTH_PUBLIC}`
        //     }
        //   }
        // )
        // .then(res => {
        //   if (res.status == 201) {
        //     window.location = "/komfirmasi-pendaftaran-siswa"
        //     this.clear();
        //     Cookie.remove('id');
        //     this.saveveri = false;
        //   } else {
        //     this.saveveri = false;
        //     this.message = res.data.message
        //   }
        //   this.saveveri = false;
        // })
        // .catch(error => {
        //   this.saveveri = false
        //   if (error.response.data.status_code == 404) {
        //     this.message = error.response.data.message
        //   }
        //   if (error.response.data.status_code == 409) {
        //     this.message = error.response.data.message
        //   }
        // })
        } else {
          this.saveveri = false
        }
      },
      validationCode: function () {
        var error = {
          code_number: [
            { message: ''}
          ]
        }
        
        error.errorLength = false

        if (this.code_number.length < 1) {
            error.code_number[0].message = 'Masukkan Kode';
            error.errorLength = true;
          } else if (this.code_number.length < 5) {
            error.code_number[0].message = 'Minimal Kode 5 Karakter';
            error.errorLength = true;
          } else {
            error.code_number = [];
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
        this.code_number = ''
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
  .input_kode_veri {
    border: none;
    width: 141px;
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
</style>
