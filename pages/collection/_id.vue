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
						<div class="mt15">
							Jenis kursi
						</div>
						<div class="lbl_ticket uppercase">
							<b>{{ ticket.seminar_collection.seminar_collection_type_seat }}</b>
						</div>
					</v-flex>
					<v-flex xs6 class="text_center">
						<img
							:src="ticket.seminar_qrcode"
							aspect-ratio="1"
							class="width_img_code_qr"/>
						<p class="code__">{{ ticket.seminar_ticket_code }}</p>
					</v-flex>
				</v-layout>
			</div>
			<div class="text_justify mt10">
				Cek email kamu (<i>{{ ticket.seminar_collection.seminar_collection_member_email }}</i>) untuk mendapatkan tiket yang kamu pesan atau <a :href="'/collection/pdf/'+ticket.seminar_id">lihat tiket</a> untuk langsung mencetak e-voucher.
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
			this.process = false
		}
	}
}
</script>