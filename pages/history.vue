<template>
  <div class="body_">
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

    <!-- list history -->
    <div v-if="!process && history_list.length > 0"
      class="cursor">
      <div v-for="(l, index) in history_list"
          :key="index">
        <div v-if="l.step !== 4"
          @click="goTransaction(l.seminar_id, l.seminar_title, l.seminar_ticket_id, l.seminar_temporay.seminar_temporary_transaction_id, l.step, l.seminar_type_seat)">
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
              Diselenggarakan oleh {{ l.member_name }}
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
          </div>
          <hr class="hr_list">
        </div>
      </div>
    </div>

    <!-- no data -->
     <div class="text_center centered_img" v-if="!process && history_list.length === 0">
      <div>
        <img :src="require('~/assets/image/Seminar_not_found.png')"
          class="img_no_data">
        <p class="font12">
          Maaf Anda Belum Memiliki Riwayat Pembelian
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Script } from 'vm';
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data () {
    return {
      process: false
    }
  },
  computed: {
    history_list() {
      return this.$store.state.history.list
    },
    history_pagination () {
      return this.$store.state.history.pagination
    }
  },
  mounted() {
    this.process = true
    this.getHistory()
  },
  methods: {
    async getHistory (pagenum) {
      this.process = true;
      await this.$store.dispatch('history/GET_HISTORY', {
        pagenum: pagenum,
        limit: 10
      })
      this.process = false;
    },
    goTransaction: function (id, title, ticId, transId, step, type) {
      if (step == 1) {
        window.location = `/transaction/person/${id}?ticket=${ticId}&seminar=${title.split(' ').join('-')}`
      } else if (step == 2) {
        window.location = `/transaction/preview/${id}?temporary=${transId}&seminar=${title.split(' ').join('-')}&ticket=${ticId}`
      } else {
        window.location=`/transaction/ticket/${id}?seminar=${title.split(' ').join('-')}&type=${type}`
      }
    }
  }
}
</script>

<style>
.hr_list {
  border: 1px solid rgb(221, 221, 221);
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>