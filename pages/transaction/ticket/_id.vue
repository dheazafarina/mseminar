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

    <!-- my ticket -->
    <div v-if="!process && Object.keys(ticket).length > 0">
      <div class="text_center">
        Terimakasih atas pemesanan tiket seminar di Gotraining.
      </div>
      <div class="head_detail body_detail" style="height: 0%;">
        <div>
          <img
            :src="ticket.seminar_ticket_url_cover"
            aspect-ratio="1"
            class="cover_img"/>
        </div>
        <div class="title_ text_center">
          {{ ticket.seminar_title }}
        </div>
        <div class="text_center color_sub mb15">
          Dipublikasikan oleh {{ ticket.member_name }}
        </div>
        <div>
          <v-icon>mdi-calendar-month</v-icon>
          <span>{{ ticket.seminar_start_date }} - {{ ticket.seminar_end_date }}</span>
        </div>
        <div>
          <v-icon>mdi-clock-outline</v-icon>
          <span>{{ ticket.seminar_start_time }} - {{ ticket.seminar_end_time }}</span>
        </div>
        <div>
          <v-icon>mdi-map-marker</v-icon>
          <span>{{ ticket.seminar_location_name }}</span><br>
          <div class="address">
            {{ ticket.seminar_address }}, {{ ticket.seminar_subdistrict }}, {{ ticket.seminar_city }}, {{ ticket.seminar_province }}
          </div>
        </div>
        <v-divider class="divider_"></v-divider>
        <v-layout  style="margin: 10px;">
        <v-flex xs6>
          <div>
            Peserta seminar
          </div>
          <div>
            <v-icon>mdi-account</v-icon>
            <span>{{ ticket.seminar_collection.seminar_collection_member_name }}</span>
          </div>
          <div>
            <v-icon>mdi-email-outline</v-icon>
            <span>{{ ticket.seminar_collection.seminar_collection_member_email }}</span>
          </div>
        </v-flex>
        <v-flex xs6 class="text_center">
          <div class="btn_label uppercase">
            <b>{{ ticket.seminar_collection.seminar_collection_type_seat }}</b>
          </div>
        </v-flex>
      </v-layout>
      <div class="mt10"
        v-if="ticket.seminar_collection.seminar_collection_invoice_status !== 'ok'">
        Status Pembayaran : 
        <span class="capitalize text_color">
          <b>Pending</b>
        </span>
      </div>
      </div>
      <div class="text_justify mt10"
        v-if="ticket.seminar_collection.seminar_collection_invoice_status === 'ok'">
        Cek email kamu (<i>{{ ticket.seminar_collection.seminar_collection_member_email }}</i>) untuk mendapatkan tiket yang kamu pesan atau lihat tiket untuk langsung mencetak e-voucher.
      </div>
      <div class="text_justify mt10"
        v-if="ticket.seminar_collection.seminar_collection_invoice_status !== 'ok'">
        Pembelian seminar telah di proses. Lakukan pemeriksaan di <a href="/payment"><b>Payment</b></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        process: false,
      }
    },
    computed: {
      check_step() {
        return this.$store.state.transaction.person.step
      },
      ticket() {
        return this.$store.state.transaction.ticket.detail
      }
    },
    mounted() {
      this.fetchTicket()
    },
    methods: {
      async fetchTicket () {
        this.process = true
        await this.$store.dispatch('transaction/ticket/GET_TICKET', {
          seminar_id: this.$route.params.id
        })
        .then ((res) => {
          console.log(res)
        })
        this.process = false
      }
    }
  }
</script>