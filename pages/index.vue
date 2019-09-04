<template>
  <div class="body_">
    <div id="bennerSeminar" class="vertical-align-content">
      <p class="text_title_benner">
        Temukan seminar di kotamu
      </p>
      <v-layout row wrap class="search_box">
          <v-flex xs10 sm9 md9>
            <v-select
              v-model="e2"
              :items="states"
              label="Kota"
              solo
              class="aaa">
            </v-select>
          </v-flex>
          <v-flex xs2 sm2 md2>
            <v-btn 
              :disabled="e2 === null" 
              @click="toMarket" 
              style="margin-top: 9px;
                border-radius: 0px;
                box-shadow: none;
                height: 34px;" 
              color="#27626a">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-flex>
      </v-layout>
      <div class="link_to">
        <nuxt-link to="/marketplace">
          <v-icon>mdi-home</v-icon>
          <span style="color: #fff !important;">Jelajah Seminar</span>
          <v-icon style="vertical-align: middle;" dark>mdi-arrow-right</v-icon>
        </nuxt-link>
      </div>
    </div>
    <div class="step__">
      <div>
        <p class="title_step_">
          Bagaimana Cara Membeli Tiket Seminar di Gotraining?
        </p>
      </div>
      <div style="margin-top: 5%; text-align: center;">
        <v-layout row wrap class="layout_wrap_">
          <v-flex xs12 sm3 md3 style="z-index: 1">
            <span>
              <img
                :src="require('~/assets/landing/1.svg')"
                aspect-ratio="1"
                class="width_img"/>
              <br>
              <!-- hidden-sm-and-down -->
              <span class="text_step">
                Cari seminar pilihan mu
              </span>
            </span>
          </v-flex>
          <v-flex xs12 sm3 md3 style="z-index: 1">
            <span>
              <img
                :src="require('~/assets/landing/2.svg')"
                aspect-ratio="1"
                class=" width_img"/>
              <br>
              <span class="text_step">
                Lakukan pembelian tiket seminar
              </span>
            </span>
          </v-flex>
          <v-flex xs12 sm3 md3 style="z-index: 1">
            <span>
              <img
                :src="require('~/assets/landing/3.svg')"
                aspect-ratio="1"
                class=" width_img"/>
              <br>
              <span class="text_step">
                Dapatkan e-tiket via email
              </span>
            </span>
          </v-flex>
          <v-flex xs12 sm3 md3 style="z-index: 1">
            <span>
              <img
                :src="require('~/assets/landing/4.svg')"
                aspect-ratio="1"
                class=" width_img"/>
              <br>
              <span class="text_step">
                Hadiri seminar favoritmu
              </span>
            </span>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div class="text_category">
      <p>
        Temukan Seminar yang kamu cari disini
      </p>
    </div>
    <div class="body_">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 order-md1 order-sm2 v-for="(item, index) in itemcat" :key="index">
          <v-card tile flat @click="marketCategory(item.link)">
            <v-card-text style="padding: 0px;">
              <img
                :src="item.img"
                aspect-ratio="1"
                style="width: 100%;"/>
            </v-card-text>
            <p class="text_title_category">
              {{item.name}}
            </p>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 order-md1 order-sm2 v-for="(item, index) in itemcat2" :key="index">
          <v-card tile flat @click="marketCategory(item.link)">
            <v-card-text style="padding: 0px;">
              <img
                :src="item.img"
                aspect-ratio="1"
                style="width: 100%;"/>
            </v-card-text>
            <p class="text_title_category">
              {{item.name}}
            </p>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div>
      <p class="text_partner">
        Bergabung Menjadi Mitra/Partner/Institusi
      </p>
      <p>
        Jalin kerjasama dengan kami sebagai institusi untuk berpartisipasi dalam memajukan sistem pendidikan di Indonesia serta menjangkau lebih banyak siswa.
      </p>
      <div class="text_center mb-4">
        <a class="link_foo" href="https://myinstitusi.gotraining.co.id/pendaftaran-institusi" target="_blank">
          <v-btn rounded class="btn_partner_">Daftar sebagai Partner</v-btn>
        </a>
      </div>
      <div>
        <v-layout row wrap>
          <v-flex xs12 sm6 md2 order-md1 order-sm2 v-for="(item, index) in mitra" :key="index">
            <v-card tile flat>
              <v-card-text style="padding: 5px;">
                <img
                  :src="item.img"
                  aspect-ratio="1"
                  class="partner_img_style"/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div class="step__2 hidden-sm-and-down" style="margin-top: 7%;">
      <div>
        <p style="color: #fff; text-align: center; font-size: 30px; font-weight: bold;">
          Kenapa memilih seminar di Gotraining?
        </p>
      </div>
      <div style="margin-top: 5%; text-align: center;">
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 v-for="(i, index) in seminar" :key="index">
            <img
              :src="i.img"
              aspect-ratio="1"/>
            <div style="margin-top: 2%">
              <p class="text_title_seminar">
                {{i.name}}
              </p>
            </div>
            <div style="width: 72%; margin: auto;">
              <p style="color: #fff; font-size: 17px;">
                {{i.summary}}
              </p>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div style="margin-top: 12%; margin-bottom: 12%;">
      <div class="step__3 hidden-sm-and-down" style="width: 60%;">
        <p class="text_android" style="margin-bottom: 20px;">
          Aplikasi Seminar Gotraining Telah Tersedia Di Google Playstore
        </p>
        <p class="text_android" style="font-weight: 100; margin-bottom: 60px;">
          Dapatkan seminar terlengkap di Gotraining.co.id.
        </p>
        <div style="color: #fff; font-size: 16px">
          Download aplikasinya sekarang
        </div>
        <a href="https://play.google.com/store/apps/details?id=ntci.co.id.gotraining">
          <img
            :src="require('~/assets/icon/playstore.png')"
            aspect-ratio="1"
            style="margin-left: -18px; margin-top: -10px; width: 50%"/>
        </a>
        <img
          :src="require('~/assets/icon/android.png')"
          aspect-ratio="1"
          class="img_android"/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    middleware: 'public',
    data() {
      return {
        e2: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' },
        ],
        states: [],
        itemcat: [
          {
            name: 'Seminar Motivasi',
            img: require('~/assets/category/Motivasi.png'),
            summary: 'konten',
            link: 1
          },
          {
            name: 'Seminar Education',
            img: require('~/assets/category/Edukasi.png'),
            summary: 'konten',
            link: 6
          },
          {
            name: 'Seminar Inspirasi',
            img: require('~/assets/category/Inspirasi.png'),
            summary: 'konten',
            link: 2
          }
        ],
        itemcat2: [
          {
            name: 'Seminar Bisnis',
            img: require('~/assets/category/Bisnis.png'),
            summary: 'konten',
            link: 3
          },
          {
            name: 'Seminar Teknologi',
            img: require('~/assets/category/Teknologi.png'),
            summary: 'konten',
            link: 4
          },
          {
            name: 'Seminar Beasiswa',
            img: require('~/assets/category/Beasiswa.png'),
            summary: 'konten',
            link: 5
          }
        ],
        mitra: [
          {
            img: require('~/assets/mitra/teras.png'),
            link: 'teknologi'
          },
          {
            img: require('~/assets/mitra/LOGO 1.png'),
            link: 'teknologi'
          }
        ],
        seminar: [
          {
            name: 'Lengkap',
            img: require('~/assets/icon/Lengkap.svg'),
            summary: 'Gotraining menyediakan berbagai seminar dan webinar yang enggarakan di seluruh Indonesia.',
            link: 'bisnis'
          },
          {
            name: 'Informasi',
            img: require('~/assets/icon/Informasi.svg'),
            summary: 'Gotraining memberikan kemudahan dalam hal akses detail informasi seminar dan webinar yang diselenggarakan di seluruh Indonesia.',
            link: 'teknologi'
          },
          {
            name: 'Pendaftaran',
            img: require('~/assets/icon/Pendaftaran.svg'),
            summary: 'Gotraining memberikan kemudahan dalam pendaftaran seminar dan webinar, dimana pendaftaran dapat dilakukan secara online melalui web maupun app Gotraining.',
            link: 'beasiswa'
          }
        ],
        img_benner:[],
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },
    mounted(){
      this.fetchCity()
    },
    methods: {
      fetchDataLanding: function () {
        var self = this
        // this.loaderdata = false;
        axios.get(`${process.env.API}landing-page/banner`, {
          headers: {
            'X-Authorization': `${process.env.AUTH_PUBLIC}`,
            'Authorization' : 'Bearer ' + this.$store.state.auth.token,
            'Accept' : 'application/json'
          }
        })
        .then(res => {
          if (res.status == 200) {
            self.img_benner = res.data.result
          } else {
            self.img_benner = []
          }
          // self.loaderdata = true;
        })
        .catch(function (err) {
          // self.img_benner = [];
        })
      },
      fetchCity: function (id) {
        var self = this
        axios.get(`${process.env.API}sys-public/city`, {
          headers: {
            'X-Authorization': `${process.env.AUTH_PUBLIC}`
          }
        })
        .then(res => {
          if (res.status == 200) {
            for (let i in res.data.result) {
              this.states.push(res.data.result[i].sys_city_city_name);
            }
          } else {
            self.items = []
          }
        })
        .catch(function (err) {
          // self.dataSeminar = []
        })
      },
      toMarket() {
        window.location = `/marketplace?city=${this.e2.split(' ').join('-')}&category=`
      },
      marketCategory(items) {
        window.location = `/marketplace?category=${items}&city=`
      }
    },
    head () {
      return {
        title: 'Jadwal & Jual Tiket Seminar Pendidikan di Indonesia | Gotraining.co.id',
        meta: [
          { hid: 'description', name: 'description', content: 'Bagaimana cara menjadi siswa di seminar online Gotraining?, bagaimana cara membeli tiket online di seminar Gotraining?' },
          { hid: 'og:title', property: 'og:title', content: 'Jadwal & Jual Tiket Seminar Pendidikan di Indonesia | Gotraining.co.id' },
          { hid: 'og:description', property: 'og:description', content: 'Bagaimana cara menjadi siswa di seminar online Gotraining?, bagaimana cara membeli tiket online di seminar Gotraining?' },
          // { hid: 'og:url', property: 'og:url', content: 'http://m.gotraining.co.id/bantuan' }
        ]
      }
    }
  }
</script>


<style>
@media screen and (min-width: 1000px) {
  .banner_size_img {
    flex-basis: 89.333333% !important;
    max-width: 89.333333% !important;
  }
}
@media screen and (max-width: 1000px) {
  .application {
    margin-left: -7px;
  }
  .layout_wrap_ {
    flex-wrap: nowrap !important;
  }
  .hr_- {
    border: 3px solid rgb(255, 255, 255) !important;
    width: 60%;
    margin-left: 10%;
    /* margin-right: auto; */
    position: absolute;
    z-index: 0;
    margin-top: 23px !important;
  }
  .title_step_ {
    color: #fff;
    text-align: center;
    font-size: 14px !important;
    font-weight: bold;
  }
  .text_category {
    margin: 6% 0 4%;
    text-align: center;
    font-size: 14px !important;
    font-weight: bold;
  }
  .text_partner {
    margin-bottom: 1%;
    text-align: left;
    font-size: 20px !important;
    font-weight: bold;
  }
  .descript_style_ {
    padding: 0px;
    font-size: 12px !important;
  }
  .btn_partner_ {
    width: 75%;
    color: #fff !important;
    background-color: #159f86 !important;
    text-transform: capitalize !important;
    font-size: 13px !important;
    height: 28px !important;
  }
  .banner_style_ {
    flex-wrap: nowrap !important;
    /* width: 88%; */
    margin-left: 10px;
  }
  .img_banner_style_ {
    padding-right: 4px;
    width : 100% !important;
    height: 180px !important;
  }
  .banner_size_img {
    flex-basis: 100% !important;
    max-width: 100% !important;
  }
  .partner_img_style {
    width: 35% !important;
  }
}
  .partner_img_style {
    width: 80%;
  }
  .img_banner_style_ {
    padding-right: 4px;
    width : 600px !important;
    height: 350px
  }
  .descript_style_ {
    padding: 0px;
    font-size: 16px;
  }
  .title_step_ {
    color: #fff;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
  .layout_wrap_ {
    flex-wrap: nowrap;
  }
  .img:after {
    content: "";
    width: 15%;
    height: 5px;
    background-color: #fff;
    position: absolute;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
    margin-top: -100px;
    margin-left: -34px;
    display: flex;
  }
  .img2:after {
    content: "";
    width: 14%;
    height: 5px;
    background-color: #fff;
    position: absolute;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
    margin-top: -125px;
    margin-left: -20px;
    display: flex;
  }
  .padding-img {
    margin-left: 165px;
  }
  .text_category {
    margin: 6% 0 4%;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }
  .text_title_category {
    text-align: center;
    margin-top: -60px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  .text_partner {
    margin-bottom: 1%;
    text-align: left;
    font-size: 28px;
    font-weight: bold;
  }
  .btn_partner_ {
    width: 75%;
    color: #fff !important;
    background-color: #159f86 !important;
    text-transform: capitalize !important;
    font-size: 18px;
  }
  .step__ {
    height: 415px;
    background: #27626a;
    padding: 5% 10%;
  }
  .step__2 {
    background: #27626a;
    padding: 5% 10%;
  }
  .step__3 {
    height: 500px;
    background: #27626a;
    padding: 5% 10%;
  }
  .text_title_seminar {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 5px;
  }
  .img_android {
    margin-left: 110%;
    margin-top: -97%;
    width: 60%;
  }
  .text_android {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    width: 75%;
  }
  .slick-arrow {
    display: none !important;
  }
  a {
    text-decoration: none !important;
  }
  .hr_- {
    border: 5px solid rgb(255, 255, 255);
    width: 60%;
    margin-left: 10%;
    /* margin-right: auto; */
    position: absolute;
    z-index: 0;
    margin-top: 60px;
  }
  .width_img {
      width: 45%;
    }
  @media only screen and (max-width: 1300px) {
    .img:after {
      content: "";
      width: 10%;
      height: 5px;
      background-color: #fff;
      position: absolute;
      transform: translate(0,-50%);
      margin-top: 65px;
    }
    .padding-img {
      margin-left: 9%;
    }
    .step__ {
      height: 400px;
      background: #27626a;
      padding: 5% 10%;
    }
  }
  @media only screen and (max-width: 950px) {
    .img:after {
      content: "";
      width: 8%;
      height: 5px;
      background-color: #fff;
      position: absolute;
      transform: translate(0,-50%);
      margin-top: 60px;
    }
    .padding-img {
      margin-left: 7%;
    }
    .width_img {
      width: 80%;
    }
    .step__ {
      height: 220px;
      background: #27626a;
      padding: 5% 10%;
    }
  }
  .benner_index {
    display: flex;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 225px;
  }
  .vertical-align-content {
    padding: 4% 0%;
    align-items:center;
    /* Uncomment next line to get horizontal align also */
  }
  .text_title_benner {
    font-size: 13px;
    font-weight: 700;
    color: #696969;
    text-align: center;
  }
  .link_to {
    text-align: center;
    margin-top: -20px;
    background-color: #27626ac2;
    padding: 8px;
    border-bottom: 0;
    border-radius: 8px;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    font-weight: 700;
    color: #fff !important;
  }
  .aaa.v-input__control {
    min-height: 42px !important;
    padding: 0;
  }
  #bennerSeminar {
    background: url('~assets/image/Banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .v-input__slot {
    box-shadow: none !important;
  }
</style>