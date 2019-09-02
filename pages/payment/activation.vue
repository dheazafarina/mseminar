<template>
  <div class="body_">
    
  <div class="text_center" v-if="expired.member_mobile_phone_number === ''">
    <div style="margin-top: 45px;">
      <span>Support by</span>
      <img
        :src="require('~/assets/logo/payment.png')"
        aspect-ratio="1"
        style="width: 30%"/>
    </div>

    <div v-if="!form.show">
      <div class="font_bold">Aktivasi Akun Payment</div>
      <div class="mt10 p20">
        Silahkan tekan tombol <i>"Minta Kode Verifikasi"</i> untuk mendapat kode aktivasi payment, Anda dapat menggunakan nomor telepon
        <b>{{ member.member_mobile_phone_number | phone }}</b> atau nomor lain dengan menekan tombol <i>"Ganti Nomor Telepon"</i>
      </div>
      <div class="mt10">
        <v-btn
          rounded
          color="#7842ff"
          @click="sendOtp"
          class="capitalize font12 btn_color">
          Minta Kode Verifikasi
        </v-btn>
      </div>
      <div class="mt10">
        <!-- <v-divider></v-divider> -->
          <span>Atau</span>
        <!-- <v-divider></v-divider> -->
      </div>
      <div class="mt10">
        <v-btn
          rounded
          color="#3eb0d2"
          @click="changePhone"
          class="capitalize font12 btn_color">
          Ganti Nomor Telepon
        </v-btn>
      </div>
      <div class="mt10 p20">
        Kode verifikasi akan dikirimkan ke nomor telepon sesuai yang anda pilih diatas
      </div>
    </div>

    <div v-if="form.show">
      <div class="font_bold">Aktivasi Akun Payment</div>
      <div>
        <div class="mt10" style="font-size:16px; padding: 15px 70px;">
          Silahkan masukkan nomor telepon untuk mendapatkan kode verifikasi aktivasi payment anda
        </div>
        <div>
          <input
            name="phone" 
            type="number" 
            placeholder="XXXX  -  XXXX  -  XXXX"
            v-model="form.phone"
            v-validate="'required|min:10|max:13'">
        </div>
      </div>
      <div class="button__" style="width: 200px;">
        <v-btn class="buttom_next_" @click="sendOtp" rounded>Minta Kode Verifikasi</v-btn>
      </div>
      <div style="text-align: center;  padding-top: 12px;">
        <p>Kode verifikasi akan dikirimkan ke nomor telepon sesuai yang anda inputkan diatas.</p>
        <p>
          Jika anda tidak yakin
          <span class="_resend"
            @click="changeMenu">
            klik disini
          </span>
          untuk kembali ke menu
        </p>
      </div>
    </div>
  </div>
  
  <div class="text_center" v-if="expired.member_mobile_phone_number !== ''">
    <div style="margin-top: 45px;">
      <span>Support by</span>
      <img
        :src="require('~/assets/logo/payment.png')"
        aspect-ratio="1"
        style="width: 40%"/>
    </div>
    <div class="font_bold mt10">Aktivasi Akun Payment</div>
    <div class="mt10 p20">
      Silahkan masukkan kode verifikasi yang telah dikirimkan melalui sms ke nomor telepon
      <b>
        {{ expired.member_mobile_phone_number | phone }}
      </b>
    </div>
    <div style="margin-top: 25px">
      <input
        id="partitioned"
        class="text_center"
        name="verfication code" 
        type="text" 
        maxlength="6"
        v-model="form.otp"
        v-validate="'required|min:6|max:6'"/>
      <p class="_error"
        v-show="errors.has('verfication code')">
        {{ errors.first('verfication code') }}
      </p>
    </div>
    <div class="text_center" style="margin-top: 25px;">
      <v-btn
        rounded
        class="btn_verify capitalize"
        @click="save">
          Verifikasi
      </v-btn>
      <p class="_error mt10 mb15 capitalize"
        v-show="response !== null">
        {{ response }}
      </p>
    </div>
    <div class="mt10">
      <p>
        Belum menerima kode verifikasi ?
      </p>
      <p>
        <vac class="_titles_field"
          ref="sendSMSOtp"
          :autoStart="false"
          :end-time="expired.member_sms_expired">
          <span class="_resend"
            slot="before"
            @click="sendOtp">
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
          <span class="_resend"
            slot="finish"
            @click="sendOtp">
            Kirim ulang Kode Verifikasi
          </span>
        </vac>
      </p>
    </div>
  </div>

  </div>
</template>

<script>  
  export default {
    middleware: 'auth',
    data () {
      return {
        callback: this.$route.query.cb,
        form: {
          show: false,
          phone: '',
          otp: ''
        },
        process: {
          run: false
        },
        response: null
      }
    },
    computed: {
      member () {
        return this.$store.state.auth.user
      },
      expired () {
        return this.$store.state.payment.expired
      }
    },
    async fetch ({ store }) {
      await store.dispatch('payment/GET_IP')
    },
    mounted () {
      this.fetchExpired()
    },
    methods: {
      async fetchExpired () {
        await this.$store.dispatch('payment/GET_EXPIRED')
        .then ((res) => {
          if (res.result.member_mobile_phone_number !== '') {
            this.form.phone = res.result.member_mobile_phone_number
            const voc = this.$refs.sendSMSOtp
            voc.startCountdown(true)
          } else {
            this.form.phone = this.$store.state.auth.user.member_mobile_phone_number
          }
        })
      },
      changePhone () {
        this.form.phone = ''
        this.form.show = !this.form.show ? true:false 
      },
      changeMenu () {
        if (this.expired.member_mobile_phone_number !== '') {
          this.form.phone = this.expired.member_mobile_phone_number
        } else {
          this.form.phone = this.$store.state.auth.user.member_mobile_phone_number
        }

        this.form.show = false
      },
      async sendOtp () {
        this.form.otp = ''
        this.response = null
        const valid = this.form.show ? await this.$validator.validateAll():true
        if (valid) {
          this.process.run = true
          this.$root.$loading.start()
          await this.$store.dispatch('payment/POST_ACTIVATION', {
            member_mobile_phone_number: this.form.phone
          })
          .then ((res) => {
            this.process.run = false
            this.$root.$loading.finish()
            if (res.status_code === 201) {
              this.fetchExpired()
            } else {
              this.response = res.message
            }
          })
        }
      },
      async save () {
        this.response = null
        const valid = await this.$validator.validateAll()
        if (valid) {
          this.process.run = true
          this.$root.$loading.start()
          await this.$store.dispatch('payment/POST_VERIFICATION', {
            otp: this.form.otp
          })
          .then ((res) => {
            this.$root.$loading.finish()
            if (res.status_code === 201) {
              window.location = `${process.env.URL_PAYMENT}signin/activated?key=${res.result.key}&cb=${this.callback}`
            } else {
              this.process.run = false
              this.response = res.message
            }
          })
        }
      }
    }
  }
</script>

<style>
.btn_verify {
  color: #fff !important;
  background: #7842ff !important;
}
._resend {
  cursor: pointer;
  color: #3eb0d2;
}
#partitioned {
  letter-spacing: 12.5px;
  border-bottom: 2px solid #7842ff;
  font-size: 16px;
  font-weight: bold;
  width: 45%
  /* letter-spacing: 20.5px; */
  /* border: 0;
  background-image: linear-gradient(to left, #000000b3 70%, rgba(255, 255, 255, 0) 0%);
  background-position: bottom;
  background-size: 30px 1px;
  background-repeat: repeat-x;
  background-position-x: 60px;
  width:190px;
  font-weight: bold; */
}
</style>