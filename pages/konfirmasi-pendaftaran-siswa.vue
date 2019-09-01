<template>
  <div class="body_">
    <div class="text_center">
      <div style="font-size: 20px;">
      <b>Terima Kasih Telah Mendaftar</b>
    </div>
    <p class="sub_txt_verify">
      Terima Kasih Telah Menyelesaikan Verifikasi Pendaftaran Anda
    </p>
    <nuxt-link to="/masuk-seminar">
      <v-btn style="width: 50px;" color="#16A086" dark>
        <b>Login</b>
      </v-btn>
    </nuxt-link>
    <div style="margin-top: 30px;">
      <img
        :src="require('~/assets/image/veristd.jpg')"
        aspect-ratio="1" 
        class="img_verify" />
    </div>
    </div>
  </div>
</template>

<style>
.img_verify {
  width: 80%;
}
.sub_txt_verify {
  font-size: 14px;
  margin: 16px;
}
</style>