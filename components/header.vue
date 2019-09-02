<template>
		<!-- <v-app-bar app dense fixed> -->
      <!-- null token -->
      <!-- <div class="text_center header_" v-if="check_token === null">
        <img
          :src="require('~/assets/logo/logo_go.png')"
          aspect-ratio="1"
          class="header_img"/>
      </div> -->

      <!-- not null token -->
      <!-- <div class="text_center header_" v-if="check_token !== null">
        <img
          :src="require('~/assets/logo/logo_go.png')"
          aspect-ratio="1"
          class="header_img"/>
      </div> -->
      <!-- <v-spacer></v-spacer> -->
    <!-- </v-app-bar> -->

  <div>
    <div v-if="check_token === null">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app>
        <v-list style="margin: 17px">
          <v-list-item>
            <a href="https://gotraining.co.id/timeline"
              class="links" target="_blank">
              <v-list-item-content>
                <v-list-item-title>
                  Gotask
                </v-list-item-title>
              </v-list-item-content>
            </a>
          </v-list-item>

          <v-list-group style="margin-bottom: -5px;">
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content class="links">
                  <v-list-item-title>Produk</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              style="margin-left: 25px;"
              v-for="products in product"
              :key="products.title">
              <v-list-item-content>
                <v-list-item-title>
                  <a :href="products.href"
                    style="color: black" target="_blank">
                    {{ products.title }}
                  </a>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item>
            <a href="https://gotraining.co.id/fasilitas"
              class="links" target="_blank">
              <v-list-item-content>
                <v-list-item-title>
                  Fasilitas
                </v-list-item-title>
              </v-list-item-content>
            </a>
          </v-list-item>

          <v-list-group style="margin-bottom: -5px;">
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content class="links">
                  <v-list-item-title>Marketplace</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              style="margin-left: 25px;"
              v-for="markets in market"
              :key="markets.img">
              <v-list-item-content>
                <a :href="markets.href" target="_blank">
                  <img :src="markets.img">
                </a>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item>
            <a href="https://gotraining.co.id/tentang"
              class="links" target="_blank">
              <v-list-item-content>
                <v-list-item-title>
                  Tentang Kami
                </v-list-item-title>
              </v-list-item-content>
            </a>
          </v-list-item>

          <v-list-item>
            <a href="https://myinstitusi.gotraining.co.id/pendaftaran-institusi"
              class="links" target="_blank">
              <v-list-item-content>
                <v-list-item-title>
                  Menjadi Mitra
                </v-list-item-title>
              </v-list-item-content>
            </a>
          </v-list-item>

          <v-list-item>
            <a href="https://gotraining.co.id/"
              class="links" target="_blank">
              <v-list-item-content>
                <v-list-item-title>
                  Go To Gotraining
                </v-list-item-title>
              </v-list-item-content>
            </a>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <div class="text_center header_">
          <img
            :src="require('~/assets/logo/logo_go.png')"
            aspect-ratio="1"
            class="header_img"/>
        </div>
      </v-app-bar>
    </div>

    <div v-if="check_token !== null">
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app>
        <v-list class="pa-1 color_label"
          style="margin-left: 0px"
          v-if="check_token !== null">
          <v-list-item class="ml-2">
            <v-list-item-avatar>
              <img :src="member.member_profile_pic">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="name_label">
                {{ member.member_name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list style="margin: 9px">
          <v-list-item>
            <nuxt-link to="/payment">
              <v-list-item-content>
                <v-list-item-title>
                  <img
                    :src="require('~/assets/logo/payment.png')"
                    aspect-ratio="1"
                    style="width: 90px;" />
                </v-list-item-title>
              </v-list-item-content>
            </nuxt-link>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content class="links">
                  <v-list-item-title>Marketplace</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              style="margin-left: 25px;"
              v-for="markets in market"
              :key="markets.img">
              <v-list-item-content>
                <a :href="markets.href" target="_blank">
                  <img :src="markets.img">
                </a>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item>
            <a href="https://gotraining.co.id/"
              class="links" target="_blank">
              <v-list-item-content>
                <v-list-item-title>
                  Go To Gotraining
                </v-list-item-title>
              </v-list-item-content>
            </a>
          </v-list-item>
        </v-list>
        <div>
          <v-btn rounded small
            @click="logout"
            color="#16A086"
            class="btn_logout">
            <v-icon>mdi-logout</v-icon>
            <span class="txt_logout">
              Keluar
            </span>
          </v-btn>
        </div>
      </v-navigation-drawer>
      <v-app-bar
        :clipped-left="clipped"
        fixed
        app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <v-icon v-if="showArrow">mdi-arrow-left</v-icon>
        <div class="text_center header_">
          <img
            :src="require('~/assets/logo/logo_go.png')"
            aspect-ratio="1"
            class="header_img"/>
        </div>
      </v-app-bar>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import date from '~/plugins/convert.js'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      product: [
        {
          title: 'Bimbel',
          href: 'https://bimbel.gotraining.co.id/'
        },
        {
          title: 'Sekolah',
          href: 'https://gotraining.co.id/sekolah'
        },
        {
          title: 'Perguruan Tinggi',
          href: 'https://gotraining.co.id/universitas'
        },
        {
          title: 'Spesialis',
          href: 'https://gotraining.co.id/spesialis'
        },
        {
          title: 'Profesional',
          href: 'https://gotraining.co.id/profesional'
        },
        {
          title: 'Sertifikasi',
          href: 'https://gotraining.co.id/sertifikat'
        },
        {
          title: 'Kompetensi',
          href: 'https://gotraining.co.id/kompetensi'
        },
        {
          title: 'Seminar',
          href: 'https://gotraining.co.id/seminar'
        }
      ],
      market: [
        {
          img: require('~/assets/logo/class.svg'),
          href: 'https://gotraining.co.id/ruang-kelas'
        },
        {
          img: require('~/assets/logo/library.svg'),
          href: 'https://gotraining.co.id/library'
        },
        {
          img: require('~/assets/logo/exam.svg'),
          href: 'https://gotraining.co.id/exam'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      showArrow: false,
      name: ''
    }
  },
  computed: {
    check_token () {
      return this.$store.state.auth.token
    },
    payment() {
      return this.$store.state.payment.status
    },
    member() {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    this.name = this.$route.name
    // if (this.name === marketplace || history) {
    //   this.showArrow = true
    // }
    if (this.$store.state.auth.token !== null) {
      this.checkPayment()
    }
  },
  methods: {
    async checkPayment () {
      await this.$store.dispatch('payment/GET_CHECK', { })
    },
    logout () {
      Cookie.remove('token')
      Cookie.remove('user')
      window.location = '/marketplace'
    }
  }
}
</script>

<style>
.color_label {
  background: #16a086 !important
}
.name_label {
  color: #fff;
  font-size: 14px;
  font-weight: bold
}
.btn_logout {
  position: fixed !important;
  bottom: 20px !important;
  left: 28px !important;
  color: white !important;
  width: 75%;
  background-color: #ff5252 !important;
}
.txt_logout {
  text-transform: capitalize;
  font-size: 13px;
  margin-left: 7px;
}
.v-list-item {
  align-items: center;
  display: flex;
  flex: 1 1 100%;
  letter-spacing: normal;
  min-height: 48px;
  outline: none;
  padding: 0px;
  position: relative;
  text-decoration: none;
}
</style>
