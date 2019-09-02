<template>
  <div class="body_">
    <div class="text_center">
      <v-btn-toggle v-model="active" style="box-shadow: none">
        <v-btn
          small
          @click="changePage('publish')"
          style="text-transform: capitalize; font-size: 12px;"
          :class="{
            'active_': active === 0
          }">
          Seminar Berjalan
        </v-btn>
        <v-btn
          small
          @click="changePage('expired')"
          style="text-transform: capitalize; font-size: 12px;"
          :class="{
            'active_': active === 1
          }">
          Seminar Berakhir
        </v-btn>
      </v-btn-toggle>
    </div>

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

    <!-- list my ticket -->
    <div v-if="!process && active === 0 && Object.keys(my_ticket).length > 0">
      <div v-for="(l, index) in my_ticket"
          :key="index"
          class="card_list">
        <nuxt-link :to="'/collection/'+l.seminar_id" class="links">
          <div>
            <div>
              <img
                :src="l.seminar_url_cover"
                aspect-ratio="1"
                class="cover_img"/>
            </div>
            <div>
              <div class="font_bold text_justify text_center">
                {{ l.seminar_title }}
              </div>
              <div class="text_sub color_sub text_center mb15">
                Dipublikasikan oleh {{ l.member_name }}
              </div>
              <div>
                <v-icon>mdi-calendar-month</v-icon>
                <span>{{ l.seminar_start_date }} - {{ l.seminar_end_date }}</span>
              </div>
              <div>
                <v-icon>mdi-clock-outline</v-icon>
                <span>{{ l.seminar_start_time }} - {{ l.seminar_end_time }} WIB</span>
              </div>
              <div>
                <v-icon>mdi-map-marker</v-icon>
                <span>{{ l.seminar_location_name }}</span><br>
                <div class="address">
                  {{ l.seminar_address }}, {{ l.seminar_subdistrict }}, {{ l.seminar_city }}, {{ l.seminar_province }}
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div v-if="!process && active === 1 && Object.keys(my_ticket).length > 0">
      <div v-for="(l, index) in my_ticket"
          :key="index"
          class="card_list">
        <nuxt-link :to="'/collection/'+l.seminar_id" class="links">
          <div>
            <div>
              <img
                :src="l.seminar_url_cover"
                aspect-ratio="1"
                class="cover_img"/>
            </div>
            <div>
              <div class="font_bold text_justify text_center">
                {{ l.seminar_title }}
              </div>
              <div class="text_sub color_sub text_center mb15">
                Dipublikasikan oleh {{ l.member_name }}
              </div>
              <div>
                <v-icon>mdi-calendar-month</v-icon>
                <span>{{ l.seminar_start_date }} - {{ l.seminar_end_date }}</span>
              </div>
              <div>
                <v-icon>mdi-clock-outline</v-icon>
                <span>{{ l.seminar_start_time }} - {{ l.seminar_end_time }} WIB</span>
              </div>
              <div>
                <v-icon>mdi-map-marker</v-icon>
                <span>{{ l.seminar_location_name }}</span><br>
                <div class="address">
                  {{ l.seminar_address }}, {{ l.seminar_subdistrict }}, {{ l.seminar_city }}, {{ l.seminar_province }}
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- no data -->
    <div v-if="!process && active === 1 && Object.keys(my_ticket).length === 0"
      class="card_list">
      <div class="text_center">
        <img
          :src="require('~/assets/image/Seminar_not_found.png')"
          aspect-ratio="1"
          class="not_found_img"/>
        <p>Maaf Anda Belum Memiliki Seminar</p>
      </div>
    </div>

    <div v-if="!process && active === 0 && Object.keys(my_ticket).length === 0"
      class="card_list">
      <div class="text_center">
        <img
          :src="require('~/assets/image/Seminar_not_found.png')"
          aspect-ratio="1"
          class="not_found_img"/>
        <p>Maaf Anda Belum Memiliki Seminar</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      process: false,
      status: 'publish',
      seminar_ongoing: [],
      seminar_expired: []
    }
  },
  computed: {
    my_ticket() {
      return this.$store.state.collection.myticket.list
    }
  },
  mounted() {
    this.fetchTicket()
  },
  methods: {
    async changePage (page) {
      this.status = page
      this.fetchTicket()
    },
    async fetchTicket () {
      this.process = true
      await this.$store.dispatch('collection/myticket/GET_MY_TICKET', {
        seminar_status: this.status
      })
      .then((res) => {
        if (this.status === 'expired') {
          this.seminar_expired = res.result
          this.process= true
        } else {
          this.seminar_ongoing = res.result
          this.process= true
        }
      })
      this.process = false
    }
  }
}
</script>

<style>
.active_ {
  background-color: #16A086 !important;
  color: #fff !important;
}
.btn_qr {
  border-radius: 50px !important;
}
.not_found_img {
  width: 35%;
}
</style>