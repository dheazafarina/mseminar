<template>
  <div class="body_">
    <!-- loading -->
    <v-layout
      justify-center
      align-center
      v-if="process">
      <v-progress-circular
        indeterminate
        color="#16A086"
        class="loader_"/>
    </v-layout>

    <!-- main -->
    <div v-if="!process && Object.keys(info_detail).length > 0">
      <div class="title_ text_center capitalize">
        {{ info_detail.seminar_title }}
      </div>
      <div class="text_center color_sub">
        Dipublikasikan oleh {{ info_detail.member_name }}
      </div>
      <div class="head_detail" style="height: 0%;">
        <v-layout style="margin: 10px;">
          <div style="width: -webkit-fill-available;">
            <img
              :src="info_detail.seminar_url_cover"
              aspect-ratio="1"
              class="cover_img"/>
          </div>
        </v-layout>
        <v-layout style="margin: 10px">
          <v-flex xs6
            v-for="(i, index) in menu" :key="index">
            <v-card tile flat>
              <nuxt-link
                :data-tab="i.id"
                :to="'/marketplace/main/'+i.id+'/'+info_detail.seminar_id+'/'+info_detail.seminar_title.split(' ').join('-')"
                class="links">
                <div v-if="i.id === $nuxt.$route.name.split('-')[2]">
                  <p style="margin-bottom: 5px;" 
                    :class="{
                      'text_color font_bold': i.id === $nuxt.$route.name.split('-')[2]
                    }"> 
                    {{i.title}}  
                  </p>
                  <hr 
                    :class="{
                      'hr_active': i.id === $nuxt.$route.name.split('-')[2]
                    }">
                </div>
                <div v-if="i.id !== $nuxt.$route.name.split('-')[2]">
                  <p
                    :class="{
                      'non': i.id !== $nuxt.$route.name.split('-')[2]
                    }"> 
                    {{i.title}}  
                  </p>
                </div>
              </nuxt-link>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

      <nuxt-child></nuxt-child>
      
      <div v-if="$nuxt.$route.name.split('-')[2] === 'info' &&
                info_detail.length !== 0"
        class="text_center"
        style="margin: 15px">
        <div
          class="tag_info"
          v-if="info_detail.seminar_ticket.seminar_ticket_total === 0">
          Maaf Tiket Telah Habis
        </div>
        <div v-if="info_detail.seminar_ticket.seminar_ticket_total !== 0">
          <div v-if="info_detail.seminar_status_purchase == 'ok'">
            <div class="tag_info">
              Anda Telah Membeli Produk Ini <br>
              Untuk Melihat Silahkan klik <nuxt-link to="/collection"><b>Tiket Saya</b></nuxt-link>
            </div>
          </div>
          <div v-if="info_detail.seminar_status_purchase == 'pending'">
            <div class="tag_info">
              Pembelian Seminar Telah di Proses <br>
              Lakukan Pemeriksaan di <nuxt-link to="/payment"><b>Payment</b></nuxt-link>
            </div>
          </div>
          <div v-if="$store.state.auth.token === null">
            <v-dialog
              v-model="dialog2"
              width="500">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="capitalize font12 btn_color"
                  color="#16a086"
                  v-on="on">
                  Pilih Seminar
                </v-btn>
              </template>
              <v-card>
                <div class="text_center m20">
                  <img
                    :src="require('~/assets/icon/Locked.png')"
                    aspect-ratio="1"
                    class="img_locked mt15" />
                </div>
                <v-card-text class="text_center capitalize">
                  untuk membeli seminar ini harap masuk atau daftar terlebih dahulu
                </v-card-text>
                <v-card-actions class="text_center">
                  <v-spacer></v-spacer>
                    <v-btn
                      class="btn_to_registr"
                      color="#16a086"
                      to="/pendaftaran-siswa">
                      Daftar
                    </v-btn>
                    <v-btn
                      class="btn_to_login"
                      color="#16a086"
                      to="/masuk-seminar">
                      Masuk
                    </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <v-btn color="#16a086"
            @click="buySeminar"
            v-if="info_detail.seminar_temporay_cart_status == 'no' &&
                  info_detail.seminar_status_purchase == null"
            class="capitalize font12 btn_color">
              Pilih Seminar
          </v-btn>
          <v-btn color="#16a086"
            @click="nextStep"
            v-if="info_detail.seminar_temporay_cart_status == 'yes' &&
                  info_detail.seminar_status_purchase == null"
            class="capitalize font12 btn_color">
              Selesaikan Pembelian
          </v-btn>
        </div>
      </div>

      <!-- aktivasi payment -->
      <div v-show="scalar(payment) || payment.member_status !== 'approved'">
        <v-dialog
          persistent
          v-model="dialog"
          max-width="290">
          <v-card>
            <v-card-title class="headline">
              <img
                :src="require('~/assets/logo/payment.png')"
                aspect-ratio="1"
                class="gotpay_img"/>
            </v-card-title>
            <v-card-text class="font12">
              Akun payment anda belum aktif, segera aktifkan sekarang ?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="rgb(120, 66, 255)"
                @click="activation"
                class="capitalize font12 btn_color">
                Aktikan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        process: true,
        menu: [
        {
          id: 'info',
          title: 'Informasi',
        },
        {
          id: 'question',
          title: 'Komentar',
        }
      ],
      seminar_title: '',
      dialog: false,
      dialog2: false,
      check: false,
      dataPayment: {}
      }
    },
    computed: {
      info_detail () {
        return this.$store.state.product.marketplace.detail
      },
      payment() {
        this.dataPayment = this.$store.state.payment.status
        if (this.dataPayment.scalar === false) {
          this.dialog = true
        } else {
          this.dialog = false
        }
        return this.$store.state.payment.status
      }
    },
    mounted() {
      this.process = true
      this.checkToken()
    },
    methods: {
      checkToken() {
        if (this.$store.state.auth.token === null) {
          this.fetchDetailPublic()
        } else {
          this.fetchDetail()
        }
      },
      async fetchDetail () {
        this.process = true
        await this.$store.dispatch('product/marketplace/GET_MARKET_DETAIL', {
          seminar_id: this.$route.params.id
        })
        this.process = false
      },
      async fetchDetailPublic () {
        this.process = true
        await this.$store.dispatch('product/marketplace/GET_MARKET_DETAIL_PUBLIC', {
          seminar_id: this.$route.params.id
        })
        this.process = false
      },
      scalar (value) {
        return Object.prototype.hasOwnProperty.call(value, 'scalar')
      },
      async buySeminar() {
        window.location = `/purchase/${this.$route.params.id}?seminar=${this.seminar_title}`
      },
      async activation () {
        window.location = `/payment/activation?cb=${window.location.href}`
      },
      async nextStep () {
        if (this.info_detail.seminar_temporay_status == 'no') {
          window.location = `/transaction/person/${this.$route.params.id}?ticket=${this.info_detail.seminar_ticket.seminar_ticket_id}&seminar=${this.seminar_title}`
        } else {
          window.location = `/transaction/preview/${this.$route.params.id}?ticket=${this.info_detail.seminar_ticket.seminar_ticket_id}&seminar=${this.seminar_title}`
        }
      },
      async fetchCheck () {
        await this.$store.dispatch('payment/FETCH_CHECK', {
          id: this.$route.params.id
        })
        .then ((res) => {
          console.log(res)
          if (res.status == 200) {
            this.check = true
          } else {
            this.check = false
          }
        })
      }
    }
  }
</script>

<style>
.btn_to_registr {
  background-color: #fff !important;
  border: 1px solid #16A086 !important;
  color: #16A086 !important;
  text-transform: capitalize !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.btn_to_login {
  background-color: #16A086 !important;
  border: 1px solid #16A086 !important;
  color: #fff !important;
  text-transform: capitalize !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
</style>