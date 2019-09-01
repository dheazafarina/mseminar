<template>
  <div class="body_">
    
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
                class="btn_btn"
                type="text"
                name="username"
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
      <div style="margin-top: 5%">
        <div class="text-xs-left">
          <v-btn
            block rounded dark
            @click="login"
            color="#16A086">
            <b>Login</b>
          </v-btn>
        </div>
      </div>
      <div class="mt10">
        Belum menerima verifikasi?
        <span class="text_color">
          Kirim ulang disini
        </span>
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
    middleware: 'unauth',
    data () {
      return {
        username: '',
        password: ''
      }
    },
     methods: {
      async login () {
        const valid = await this.$validator.validateAll()
        if (valid) {
          await this.$store.dispatch('auth/POST_LOGIN', {
            username: this.username,
            password: this.password
          })
          .then ((res) => {
            console.log(res)
            if (res.status_code === 201) {
              Cookie.set('user', res.result)
              Cookie.set('token', res.token, { 
                expires: (1 / 1440) * (res.exired_token / 60) 
              })
              window.location = '/marketplace'
            } else {
              this.response = res.message
            }
          })
        }
      }
    }
  }
</script>
