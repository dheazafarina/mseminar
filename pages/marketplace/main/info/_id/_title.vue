<template>
  <div class="body_ body_detail">
    <!-- <v-layout justify-center align-center>
      <v-progress-circular
        indeterminate
        color="#16A086"
        class="loader_"/>
    </v-layout> -->

    <v-layout>
      <v-flex xs6>
        <v-card tile flat>
          <div class="font_bold">
            Penjualan tiket dimulai
          </div>
          <div>
            <v-icon>mdi-calendar-month</v-icon>
            <span>{{ info_detail.seminar_ticket.seminar_ticket_start_date | date}}</span>
          </div>
          <div>
            <v-icon>mdi-clock-outline</v-icon>
            <span>{{ info_detail.seminar_ticket.seminar_ticket_start_time }} WIB</span>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card tile flat>
          <div class="font_bold">
            Penjualan tiket berakhir
          </div>
          <div>
            <v-icon>mdi-calendar-month</v-icon>
            <span>{{ info_detail.seminar_ticket.seminar_ticket_end_date | date}}</span>
          </div>
          <div>
            <v-icon>mdi-clock-outline</v-icon>
            <span>{{ info_detail.seminar_ticket.seminar_ticket_end_time }} WIB</span>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    <div class="background_ divider_">
      <div class="font_bold">
        Tanggal dan Waktu Seminar
      </div>
      <div>
        <v-icon>mdi-calendar-month</v-icon>
        <span>
          {{ info_detail.seminar_start_date | date }} - 
          {{ info_detail.seminar_end_date | date }}
        </span>
      </div>
      <div>
        <v-icon>mdi-clock-outline</v-icon>
        <span>
          {{ info_detail.seminar_start_time }} - 
          {{ info_detail.seminar_start_time }} WIB
        </span>
      </div>
    </div>
    
    <div class="divider_">
      <div class="font_bold">
        Lokasi
      </div>
      <div>
        <v-icon>mdi-map-marker</v-icon>
        <span>{{ info_detail.seminar_location_name }}</span><br>
        <div class="address">
          {{ info_detail.seminar_address }}, 
          {{ info_detail.seminar_subdistrict }} , 
          {{ info_detail.seminar_city }} , 
          {{ info_detail.seminar_province }}
        </div>
      </div>
    </div>
    <v-divider class="divider_"></v-divider>

    <div class="font_bold">
      Harga
    </div>

    <div
      class="text_color font_bold"
      v-if="info_detail.seminar_ticket.seminar_ticket_category_ticket_id === 1">
      Gratis
    </div>

    <div v-if="info_detail.seminar_ticket.seminar_ticket_category_ticket_id === 2">
      <table class="table_price">
        <tr style="color: #606060;">
          <th class="th_price"
            v-for="(header, index) in headers"
            :key="index">
              {{ header.text }}
          </th>
        </tr>
        <tr v-for="(t, index) in info_detail.seminar_ticket.config_ticket"
          :key="index">
          <td class="td_price capitalize">{{ t.seminar_config_ticket_type_seat }}</td>
          <td class="td_price">{{ t.seminar_config_ticket_total }}</td>
          <td class="td_price text_color col_price">{{ t.seminar_config_ticket_price | price}}</td>
          <td v-if="t.seminar_config_ticket_price_presale === 0" class="text_center">-</td>
          <td v-if="t.seminar_config_ticket_price_presale === 0" class="text_center">-</td>
          <td v-if="t.seminar_config_ticket_price_presale !== 0" class="td_price">
            {{ t.seminar_config_ticket_total_presale }}
          </td>
          <td v-if="t.seminar_config_ticket_price_presale !== 0" class="td_price">
            {{ t.seminar_config_ticket_price_presale }}
          </td>
        </tr>
      </table>
    </div>
    <v-divider class="divider_"></v-divider>

    <div v-if="info_detail.seminar_ticket.seminar_ticket_category_ticket_id === 2 &&
               info_detail.seminar_ticket.seminar_ticket_remaind === 'yes'">
      <div class="font_bold">
        Sisa Tiket
      </div>
      <table class="table_price">
        <tr style="color: #606060;">
          <th class="th_price"
            v-for="(title, index) in titles"
            :key="index">
              {{ title.text }}
          </th>
        </tr>
        <tr v-for="(t, index) in info_detail.seminar_ticket.config_ticket"
          :key="index">
          <td class="td_ticket capitalize">{{ t.seminar_config_ticket_type_seat }}</td>
          <td class="td_ticket">{{ t.seminar_config_ticket_available }} Kursi</td>
        </tr>
      </table>
      <v-divider class="divider_"></v-divider>
    </div>

    <div class="font_bold">
      Deskripsi
    </div>
    <div class="text_justify" v-html="info_detail.seminar_desc" />
    <v-divider class="divider_"></v-divider>

    <div class="font_bold">
      Rundown Acara
    </div>
    <div
      class="text_justify"
      v-if="info_detail.seminar_roundown_desc !== null"
      v-html="info_detail.seminar_roundown_desc" />
    <div v-if="info_detail.seminar_roundown_desc === null"> - </div>

  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    data () {
      return {
        process: {
          run: true
        },
        headers: [
          { text: 'Kategori Tiket', value: 'cat' },
          { text: 'Jumlah Kursi', value: 'total' },
          { text: 'Harga per tiket', value: 'price' },
          { text: 'Jumlah Kursi Presale', value: 'total_presale' },
          { text: 'Harga per tiket Presale', value: 'price_presale' }
        ],
        titles: [
          { text: 'Kategori Tiket', value: 'cat' },
          { text: 'Jumlah Kursi', value: 'total' }
        ]
      }
    },
    computed: {
      info_detail () {
        return this.$store.state.product.marketplace.detail
      },
      check_token () {
        return this.$store.state.auth.token
      }
    },
    mounted() {
      this.checkToken()
    },
    methods: {
      checkToken() {
        if (this.$store.state.auth.token === null) {
          this.fetchSeminarPublic()
        } else {
          this.fetchSeminar()
        }
      },
      async fetchSeminarPublic (pagenum) {
        if (!pagenum) { pagenum = 1 }
        this.process = true
        await this.$store.dispatch('product/marketplace/GET_MARKET_DETAIL_PUBLIC', {
          seminar_id: this.$route.params.id
        })
        this.process = false
      },
      async fetchSeminar (pagenum) {
        if (!pagenum) { pagenum = 1 }
        this.process = true
        await this.$store.dispatch('product/marketplace/GET_MARKET_DETAIL', {
          seminar_id: this.$route.params.id
        })
        this.process = false
      }
    }
  }
</script>

<style>
.col_price {
  width: 22%;
}
</style>