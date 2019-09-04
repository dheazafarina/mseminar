<template>
  <div class="body_">
    <div style="margin-top: 100px;">
      <div class="text_center">
        <p class="text_color font_bold"
          style="font-size: 21px">
          Pendaftaran Seminar Berhasil
        </p>
        <p class="text_color m30">
          Kami telah mengirimkan kode verifikasi melalui SMS ke nomor <b>{{phonenumber}}</b>
        </p>
        <p class="text_color m30 mt-auto">
          Masukkan kode tersebut untuk melengkapi tahap pendaftaran
        </p>
      </div>

      <div class="text_center"
        style="margin-top: 30px">
        <input
          id="partitioned"
          class="text_center"
          name="verfication code" 
          type="text" 
          maxlength="5"
          v-model="code_number"
          v-validate="'required|min:5|max:5'"/>
      </div>

      <div class="text_center">
        <v-btn
          class="btn_verif"
          v-if="saveveri == false" 
          @click="sendConfirmation" 
          rounded small
          color="#16A086" dark>
          <b>Verifikasi</b>
        </v-btn>
        <v-btn
          class="btn_verif"
          v-if="saveveri == true"
          rounded small
          color="#16A086" 
          dark loading>
          <b>Verifikasi</b>
        </v-btn>
      </div>

      <div
        class="_error text_center"
        style="width: 250px; margin-left: auto; margin-right: auto;margin-top: 10px;"
        v-if="hasOwnProp(error, 'code_number') == true &&  error.code_number.length > 0">
        {{error.code_number[0].message}}
      </div>
      <div
        class="_error text_center"
          style="width: 250px; margin-left: auto; margin-right: auto; margin-top: 10px;"
        v-if="error.errorLength == false && message.length > 0">
        {{message}}
      </div>

      <div class="text_center" style="padding-top: 30px;">
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
            Kirim ulang kode verifikasi
          </span>
        </vac>
      </div>
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
      if (this.$store.state.auth.id.date_time === undefined) {
        window.location = "/verifikasi-kode-sms"
      }
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
      async sendConfirmation () {
        var self = this
        this.error = this.validationCode();
        if (this.error.errorLength == false) {
        this.saveveri = true
        await this.$store.dispatch('auth/POST_CONFIRMATION_SMS', {
          member_hash : this.code_number
        })
        .then(res => {
          if (res.status_code == 201) {
            window.location = "/konfirmasi-pendaftaran-siswa"
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
  .btn_verif {
    width: 165px;
    margin-top: 10px;
  }
  #partitioned {
    letter-spacing: 12.5px;
    border-bottom: 2px solid #000;
    font-size: 16px;
    font-weight: bold;
    width: 140px
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
