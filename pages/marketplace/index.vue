<template>
	<div class="body_">
    <div v-if="page === 'filter'">
      <!-- <div style="font-size: 14px; margin-top: 10px">
        Jenis Seminar
      </div>
      <v-select
        :items="items"
        item-text="title"
        item-value="id"
        class="select__slot"
        label="Pilih Jenis Seminar"
        v-model="sorting.id"
        solo></v-select>
      <div style="margin: 15px"></div> -->

      <div style="font-size: 14px">
        Kategori
      </div>
      <v-select
        :items="itemCategory"
        item-text="title"
        item-value="id"
        class="select__slot"
        label="Pilih Kategori"
        v-model="sorting.category_id"
        solo></v-select>
      <div style="margin: 15px"></div>

      <div style="font-size: 14px">
        Kota
      </div>
      <v-select
        :items="itemCity"
        item-text="title"
        item-value="title"
        class="select__slot"
        label="Pilih Kota"
        v-model="sorting.city"
        solo></v-select>
      <div style="margin: 15px"></div>

      <div style="font-size: 14px">
        Jadwal
      </div>
      <v-dialog
        ref="dialog"
        v-model="sorting.schedule"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field
            solo
            v-model="date"
            label="Pilih Jadwal"
            v-on="on"></v-text-field>
        </template>
        <v-date-picker
          full-width
          color="#16A086"
          v-model="date"
          :min="picker"
          @input="sorting.schedule = false"></v-date-picker>
      </v-dialog>
      <div style="margin: 15px"></div>

      <div class="text-xs-center">
        <v-layout row>
          <v-flex xs6>
            <v-btn
              @click="changePage('list')"
              class="btn_round_1"
              color="#16a086" dark>
              Batal
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn
              dark
              @click="filter"
              class="btn_round_2"
              color="#16a086">
              Cari
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </div>

    <div v-if="page === 'list'">
      <div>
        <input 
          type="text"
          placeholder="Cari Seminar" 
          class="search"
          v-model="sorting.keyword" 
          @keyup="search" 
          @keydown="search">
      </div>
      <div class="txt_filter">
        <span @click="changePage('filter')">Filter
        <v-icon class="icon_filter">mdi-filter-variant</v-icon>
        </span>
      </div>

      <!-- loading -->
      <div class="centered_img">
        <v-layout
          justify-center
          align-center
          v-if="process">
          <v-progress-circular
            indeterminate
            color="#16A086" />
        </v-layout>
      </div>

      <!-- LIST MARKETPLACE -->
      <div v-if="!process && market_list.length > 0">
        <div
          v-for="(l, index) in market_list"
          :key="index"
          class="card_list">
          <nuxt-link
            :to="'/marketplace/main/info/'+`${l.seminar_ticket_id}`+'/'+l.seminar_title.split(' ').join('-')"
            class="links">
            <div>
              <img
                :src="l.seminar_url_cover"
                aspect-ratio="1"
                class="cover_img"/>
            </div>
            <div>
              <div class="font_bold text_justify text_center capitalize">
                {{ l.seminar_title }}
              </div>
              <div class="text_sub color_sub text_center mb15">
                Dipublikasikan oleh {{ l.member_name }}
              </div>
              <div>
                <v-icon>mdi-calendar-month</v-icon>
                <span>{{ l.seminar_start_date | date }} - {{ l.seminar_end_date | date }}</span>
              </div>
              <div>
                <v-icon>mdi-clock-outline</v-icon>
                <span>{{ l.seminar_start_time }} - {{ l.seminar_end_time }} WIB</span>
              </div>
              <div>
                <v-icon>mdi-map-marker</v-icon>
                <span class="capitalize">{{ l.seminar_location_name }}</span><br>
                <div class="address capitalize">
                  {{l.seminar_address}}, {{l.seminar_subdistrict}}, {{l.seminar_city}}, {{l.seminar_province}}
                </div>
              </div>
              <div
                v-if="l.seminar_category_ticket_title === 'Free'"
                style="margin-top: 15px;">
                <div class="text_color text_price">
                  GRATIS
                </div>
              </div>

              <div
                v-if="l.seminar_category_ticket_title === 'Paid'"
                style="margin-top: 15px;">
                <div v-for="(p, index) in l.ticket_config" :key="index">
                  <div v-if="index === 0">
                    <div class="text_color text_price">
                      {{ p.seminar_config_ticket_price | price}}
                    </div>
                    <div v-if="p.is_presale == 'yes'"
                      class="price_presale text_price">
                      {{ p.seminar_config_ticket_price_original | price}}
                    </div>
                    <div v-if="p.is_presale == 'yes'"
                      class="color_sub">
                      <span class="capitalize">{{ p.seminar_config_ticket_type_seat }} - </span>
                      tersedia {{ p.seminar_config_ticket_total }} kursi
                    </div>
                    <div v-if="p.is_presale == 'no'"
                      class="color_sub">
                      <span class="capitalize">{{ p.seminar_config_ticket_type_seat }} - </span>
                      tersedia {{ p.seminar_config_ticket_total }} kursi
                    </div>
                  </div>

                  <div v-if="index > 0">
                    <div class="text_color text_price_sub">
                      {{ p.seminar_config_ticket_price | price}}
                    </div>
                    <div class="color_sub_price">
                      <span class="capitalize">{{ p.seminar_config_ticket_type_seat }} - </span>
                      tersedia {{ p.seminar_config_ticket_total }} kursi
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </nuxt-link>
        </div>

        <div class="text_center">
          <v-btn
            small
            class="btn_pagin"
            color="#16A086"
            v-if="market_pagination.next > 0" 
            @click="fetchSeminarPublic(market_pagination.current+1)">
            Selanjutnya
          </v-btn>
          <v-btn
            small
            class="btn_pagin"
            color="#16A086"
            v-if="market_pagination.next < 0" 
            @click="fetchSeminarPublic(market_pagination.current-1)">
            Sebelumnya
          </v-btn>
        </div>
      </div>

      <!-- no data -->
      <div class="text_center"
        v-if="!process && market_list.length === 0">
        <div class="centered_img">
          <img :src="require('~/assets/image/Seminar_not_found.png')"
            class="img_no_data">
          <p class="font12"
            v-if="not_found">
            Maaf Seminar Belum Tersedia
          </p>
          <p class="font12"
            v-if="not_found_search">
            Seminar yang Kamu Cari Tidak Ditemukan
          </p>
        </div>
      </div>

      <!-- infinite-loading pagin -->
      <!-- <div>
        <p v-for="(item, index) in list" :key="index">
          Line:
          <span v-text="item"></span>
        </p>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </div>
      <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="infiniteHandler">
         <div slot="spinner">Loading...</div>
      </infinite-loading> -->
    </div>
	</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data () {
    return {
      page: 'list',
      process: false,
      sorting: {
        id : 0,
        keyword:'',
        city: '',
        category_id: '',
        schedule: ''
      },
      items: ['Berbayar', 'Donasi', 'Gratis'],
      itemCategory: [],
      itemCity: [],
      date: '',
      modal: false,
      not_found: false,
      not_found_search: false,
      picker: new Date().toISOString().substr(0, 10),
      data: '',
      data_split: ''
    }
  },
  computed: {
    member() {
      return this.$store.state.auth.user
    },
    payment() {
      return this.$store.state.payment.status
    },
    market_list () {
      return this.$store.state.product.marketplace.list
    },
    market_pagination () {
      return this.$store.state.product.marketplace.pagination
    },
    market_detail () {
      return this.$store.state.product.marketplace.detail
    },
    filter_category () {
      return this.$store.state.sys.category
    },
    filter_city () {
      return this.$store.state.sys.city
    }
  },
  mounted () {
    this.data = this.$route.query.city
    if (this.data !== undefined) {
      this.data_split = this.data.split('-').join(' ')
      this.sorting.city = this.data_split
    } else {
      this.sorting.city = ''
    }
    this.checkToken()
  },
  methods: {
    infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        $state.loaded();
      }, 1000);
    },
    checkToken() {
      if (this.$store.state.auth.token === null) {
        this.fetchSeminarPublic()
        this.fetchCategoryPublic()
        this.fetchCityPublic()
      } else {
        this.fetchSeminar()
        this.fetchCategory()
        this.fetchCity()
        this.checkPayment()
      }
    },
    changePage (page) {
      this.page = page
      if (page === 'list') {
        this.date = ''
      }
    },
    close () {
      this.date = this.date
      this.modal = false
    },
    search: function () {
      if (this.$store.state.auth.token === null) {
        this.process = true
        this.fetchSeminarPublic()
      } else {
        this.process = true
        this.fetchSeminar()
      }
    },
    filter: function () {
      if (this.$store.state.auth.token === null) {
        this.process = true
        this.fetchSeminarPublic()
        this.page = 'list'
      } else {
        this.process = true
        this.fetchSeminar()
        this.page = 'list'
      }
    },
    //PUBLIC
    async fetchSeminarPublic (pagenum) {
      if (!pagenum) { pagenum = 1 }
      this.process = true
      await this.$store.dispatch('product/marketplace/GET_MARKET_PUBLIC', {
          pagenum: pagenum,
          limit: 1,
          title: this.sorting.keyword,
          city: this.sorting.city,
          schedule: this.date,
          category: this.sorting.category_id
      })
      if (this.market_list.length === 0) {
        this.not_found_search= true
      }
      this.process = false
    },
    async fetchCategoryPublic () {
      await this.$store.dispatch('sys/category/GET_CATEGORY_PUBLIC', {})
      .then((res) => {
        for (let i in res.result) {
          this.itemCategory.push(
            {
              id: res.result[i].seminar_category_id,
              title: res.result[i].seminar_category_title
            }
          )
        }
      })
    },
    async fetchCityPublic () {
      await this.$store.dispatch('sys/city/GET_CITY_PUBLIC', {})
      .then((res) => {
        for (let i in res.result) {
          this.itemCity.push(
            {
              id: res.result[i].sys_city_id,
              title: res.result[i].sys_city_city_name
            }
          )
        }
      })
    },
    //BUKAN PUBLIC
    async fetchSeminar (pagenum) {
      if (!pagenum) { pagenum = 1 }
      this.process = true
      await this.$store.dispatch('product/marketplace/GET_MARKET', {
          pagenum: pagenum,
          limit: 5,
          title: this.sorting.keyword,
          city: this.sorting.city,
          schedule: this.date,
          category: this.sorting.category_id
      })
      if (this.market_list.length === 0) {
        this.not_found_search= true
      }
      this.process = false
    },
    async fetchCategory () {
      await this.$store.dispatch('sys/category/GET_CATEGORY', {})
      .then((res) => {
        for (let i in res.result) {
          this.itemCategory.push(
            {
              id: res.result[i].seminar_category_id,
              title: res.result[i].seminar_category_title
            }
          )
        }
      })
    },
    async fetchCity () {
      await this.$store.dispatch('sys/city/GET_CITY', {})
      .then((res) => {
        for (let i in res.result) {
          this.itemCity.push(
            {
              id: res.result[i].sys_city_id,
              title: res.result[i].sys_city_city_name
            }
          )
        }
      })
    },
    async checkPayment () {
      await this.$store.dispatch('payment/GET_CHECK', { })
    }
  }
}
</script>

<style>
.text_peice {
  font-size: 14px; 
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
              0px 0px 0px 0px rgba(0, 0, 0, 0.14),
              0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 35px;
  padding: 0;
  font-size: 13px;
}
.v-label {
  font-size: 13px
}
.v-list {
  margin-left: 10px;
}
</style>