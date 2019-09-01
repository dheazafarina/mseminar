<template>
  <div>
    <div>
      <v-layout row wrap>
        <v-flex 
          xs12 sm6 md6 order-md3 order-sm1
          class="text__"
          style="background: #fff;">
          <div class="padding_verify">
            <div style="color: #16A086; text-align: center;">
              <p style="line-height: 1.25; color: #16A086; font-size: 20px; font-weight: bold;">
                Pendaftaran Seminar Berhasil
              </p>
              <p style="padding:0% 15%;">
                Kami telah mengirimkan kode verifikasi melalui SMS ke nomor {{phonenumber}}
              </p>
              <div style="padding:0% 15%;">
                Masukkan kode tersebut untuk melengkapi tahap pendaftaran
              </div>
            </div>
            <div style="text-align: center; margin-top: 70px;">
              <input v-model="code_number" class="input_kode_veri" maxlength='5'/>
              <!-- <div
                class="error_message"
                  style="width: 250px; margin-left: auto; margin-right: auto;     margin-top: 10px;"
                v-if="hasOwnProp(error, 'code_number') == true &&  error.code_number.length > 0">
                {{error.code_number[0].message}}
              </div> -->
              <!-- <div
                class="error_message"
                  style="width: 250px; margin-left: auto; margin-right: auto; margin-top: 10px;"
                v-if="error.errorLength == false && message.length > 0">
                {{message}}
              </div> -->
            </div>
            <div style="margin-top: 5%">
              <div class="text-xs-left" style="padding: 0% 12%;">
                <v-btn v-if="saveveri == false"
                  @click="saveConfirmation"
                  style="width: 95%;" rounded
                  color="#16A086" dark>
                  <b>Verifikasi</b>
                </v-btn>
                <v-btn v-if="saveveri == true"
                  style="width: 95%;" rounded
                  color="#16A086" dark loading>
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
                  @click="resendCode">
                  Kirim ulang Kode Verifikasi
                </span>
              </vac>
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
</template>

<script>
  import axios from 'axios'
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'unauth',
    data() {
      return {
        username: '',
        password: '',
        name: '',
        confirm_pass:'',
        phone:'',
        phonenumber: '',
        select: null,
        checkbox: false,
        code_number:'',
        saveveri: false,
        send_code : false,
      }
    },
    computed: {
      expired () {
        if (this.$store.state.auth.registrations !== null) {
          return this.$store.state.auth.registrations
        } else {
          console.log('sss')
        }
      }
    },
    mounted() {
      console.log(this.$store.state.auth.registrations)
      // this.time()
      // this.phonenumber = this.$store.state.auth.registration.member_phone
    },
    methods: {
      async time (){
        const voc = this.$refs.sendSMSOtp
        voc.startCountdown(true)
      },
      async resendCode () {
        this.send_code = true
        await this.$store.dispatch('auth/RESEND_CODE')
        .then ((res) => {
          if (res.status_code == 204) {
          } else if (res.status_code == 200) {
            Cookie.set('registrations', res.result)
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
      async saveConfirmation () {
        this.error = this.validationCode();
        if (this.error.errorLength == false) {
          this.saveveri = true;
          await this.$store.dispatch('auth/VERIFY_CODE', {
            member_hash : this.code_number
          })
          .then ((res) => {
            window.location = '/konfirmasi-pendaftaran-siswa'
            Cookie.remove('registrations');
            this.saveveri = false;
          })
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
      }
    }
  }
</script>

<style>
.input_kode_veri {
  border: none;
  width: 112px;
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
.padding_verify {
  padding-top: 10%;
  padding-right: 20%;
  padding-left: 15%;
  padding-bottom: 5%
}
</style>