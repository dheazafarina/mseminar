<template>
  <div style="background: #fff;" class="body_">
    <div style="margin-bottom: 85%">
      <div class="text_center">
        <img
          :src="require('~/assets/image/Banner.jpg')"
          aspect-ratio="1" 
          class="img_banner" />
        <div class="search_box">
          <div>
            Temukan seminar di kotamu
          </div>

          <!-- <div>
            <v-select
              style="position: absolute"
              label="Kota"
              solo></v-select>
            <span><v-btn depressed small>Normal</v-btn></span>
          </div> -->

        </div>
      </div>

      <div class="body_ howto">
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
                <span class="hidden-sm-and-down" style="text-align: left; color: #fff; font-size: 18px; margin-left: -18px; margin-top: 5%;">
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
                <span class="hidden-sm-and-down" style="text-align: center; color: rgb(255, 255, 255); font-size: 18px;">
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
                <span class="hidden-sm-and-down" style="text-align: center; color: rgb(255, 255, 255); font-size: 18px;">
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
                <span class="hidden-sm-and-down" style="text-align: center; color: rgb(255, 255, 255); font-size: 18px;">
                  Hadiri seminar favoritmu
                </span>
              </span>
            </v-flex>
          </v-layout>
        </div>
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
          <v-card tile flat>
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
          <v-card tile flat>
            <a :href="`/marketplace?category=${item.link}`">
              <v-card-text style="padding: 0px;">
                <img
                  :src="item.img"
                  aspect-ratio="1"
                  style="width: 100%;"/>
              </v-card-text>
              <p class="text_title_category">
                {{item.name}}
              </p>
            </a>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div style="margin: 5% 5% ;">
      <p class="text_partner">
        Bergabung Menjadi Mitra/Partner/Institusi
      </p>
      <v-layout row wrap style="margin-bottom: 1%;">
        <v-flex xs12 sm6 md7 order-md1 order-sm1>
          <v-card tile flat>
            <v-card-text class="descript_style_">
              Jalin kerjasama dengan kami sebagai institusi untuk berpartisipasi dalam memajukan sistem pendidikan di Indonesia serta menjangkau lebih banyak siswa.
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md5 order-md2 order-sm2>
          <v-card tile flat>
            <v-card-text style="padding: 0px;">
              <div class="text_center mt-2">
                <a class="link_foo" href="https://myinstitusi.gotraining.co.id/pendaftaran-institusi" target="_blank">
                  <v-btn rounded class="btn_partner_">Daftar sebagai Partner</v-btn>
                </a>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <div two-line>
        <img
          :src="require('~/assets/mitra/teras.png')"
          aspect-ratio="1"
          class="partner_img_style"/>
        <img
          :src="require('~/assets/mitra/LOGO 1.png')"
          aspect-ratio="1"
          class="partner_img_style"/>
      </div>
    </div>
    <div class="step__ hidden-sm-and-down" style="margin-top: 7%;">
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
    <div style="margin-top: 18%; margin-bottom: 12%;">
      <div class="step__ hidden-sm-and-down" style="width: 60%;">
        <p class="text_android" style="margin-bottom: 20px;">
          Aplikasi Seminar Gotraining Telah Tersedia Di Google Playstore
        </p>
        <p class="text_android" style="font-weight: 100; margin-bottom: 60px;">
          Dapatkan seminar terlengkap di Gotraining.co.id.
        </p>
        <div style="color: #fff; font-size: 18px">
          Download aplikasinya sekarang
        </div>
        <a href="https://play.google.com/store/apps/details?id=ntci.co.id.gotraining">
          <img
            :src="require('~/assets/icon/playstore.png')"
            aspect-ratio="1"
            style="margin-left: -18px; margin-top: -10px;"/>
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
    middleware: 'unauth',
    data() {
      return {
        process: false,
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
        id: '',
        isEditing: false,
        model: null,
        states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia']
      }
    },
    computed: {
      market_list () {
        return this.$store.state.product.marketplace.list
      }
    },
    mounted(){
      this.fetchDataLanding()
    },
    methods: {
      fetchDataLanding: function () {
        var self = this
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
        })
        .catch(function (err) {
          // self.img_benner = [];
        })
      },
      category(id) {
        console.log(id)
        this.id = id
        this.fetchSeminarPublic()
      },
      async fetchSeminarPublic (pagenum) {
        if (!pagenum) { pagenum = 1 }
        this.process = true
        await this.$store.dispatch('product/marketplace/GET_MARKET_PUBLIC', {
            pagenum: pagenum,
            limit: 5,
            title: '',
            city: '',
            schedule: '',
            category: this.id
        })
        .then ((res) => {
          // window.location = '/marketplace'
          console.log(res)
        })
        this.process = false
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
.howto {
  margin-top: -18%;
  position: absolute;
  margin-left: 0;
  margin-right: 200px;
  height: 400px;
  background-image: linear-gradient(#16A086, #009FA5);
  padding: 5% 10%;
}
.search_box {
  float: none;
  margin-top: -37%;
  margin-bottom: 35%;
  font-size: 13px;
  font-weight: bold;
  color: slategrey;
}
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
    font-size: 12px !important;
    font-weight: bold;
  }
  .text_category {
    margin: 6% 0 4%;
    text-align: center;
    font-size: 18px !important;
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
    margin-right: 20px;
    margin-top: 15px;
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
    font-size: 27px;
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
    height: 500px;
    background-image: linear-gradient(#16A086, #009FA5);
    margin-top: 15px;
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
    font-size: 27px;
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
      background-image: linear-gradient(#16A086, #009FA5);
      margin-top: 15px;
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
      width: 60%;
    }
    .step__ {
      height: 170px;
      background-image: linear-gradient(#16A086, #009FA5);
      margin-top: 15px;
      padding: 5% 10%;
    }
    .howto {
      margin-top: -40px;
      position: absolute;
      margin-left: 0;
      background-image: linear-gradient(#16A086, #009FA5);
      padding: 5% 10%;
      margin-right: 12px;
      height: 200px;
    }
    .v-text-field.v-text-field--solo .v-input__control {
      min-height: 0px;
    }
  }
</style>
