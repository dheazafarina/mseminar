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

    <!-- detail ticket -->
    <v-container fluid class="elevation-3" v-if="!process && Object.keys(p_ticket).length > 0">
      <v-layout row>
        <v-flex xs8>
          <v-card tile flat>
            <div>
              <div class="text_center">
                <img
                :src="p_ticket.seminar_ticket_url_cover"
                aspect-ratio="1"
                class="cover_img_ticket"/>
              </div>
              <div class="title_ text_center">
                {{ p_ticket.seminar_title }}
              </div>
              <div class="text_center color_sub mb15">
                Dipublikasikan oleh {{ p_ticket.member_name }}
              </div>
              <div class="row">
                <div class="column">
                  <div>
                    <b>Tanggal dan Waktu</b><br>
                    <v-icon style="float: left">mdi-calendar-month</v-icon>
                    <div style="margin-left: 15px;">{{ p_ticket.seminar_start_date | date }} - <br>
                          {{ p_ticket.seminar_end_date | date }}
                    </div>
                    <v-icon style="float: left">mdi-clock-outline</v-icon>
                    <div style="margin-left: 15px;">{{ p_ticket.seminar_start_time.slice(0,5) }} - 
                          {{ p_ticket.seminar_end_time.slice(0,5) }} WIB
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div>
                    <b>Lokasi</b><br>
                    <div>
                      <v-icon>mdi-map-marker</v-icon>
                      <span>{{ p_ticket.seminar_location_name }}</span><br>
                      <div class="address_">
                        {{ p_ticket.seminar_address }}, {{ p_ticket.seminar_subdistrict }}, {{ p_ticket.seminar_city }}, {{ p_ticket.seminar_province }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row_">
                <div class="column_member">
                  <div>
                    <b>Peserta seminar</b><br>
                    <v-icon>mdi-account</v-icon>
                    <span>{{ p_ticket.seminar_collection.seminar_collection_member_name }}</span>
                  </div>
                  <div>
                    <v-icon>mdi-email-outline</v-icon>
                    <span>{{ p_ticket.seminar_collection.seminar_collection_member_email }}</span>
                  </div>
                </div>
                <div class="column_seat">
                  <div>
                    <b>Jenis kursi</b>
                  </div>
                  <div class="lbl_ticket_p uppercase">
                    <b>{{ p_ticket.seminar_collection.seminar_collection_type_seat }}</b>
                  </div>
                </div>
                <div class="column_ text_center">
                  <img
                    :src="p_ticket.seminar_qrcode"
                    aspect-ratio="1"
                    class="width_code_qr"/>
                  <p class="code__">{{ p_ticket.seminar_ticket_code }}</p>
                </div>
              </div>
            </div>
          </v-card>
        </v-flex>

        <v-flex xs4 class="row_2" style="font-size: 10px;">
          <v-card tile flat>
            <div class="title_">
              {{ p_ticket.seminar_title }}
            </div>
            <div class="color_sub mb15">
              Dipublikasikan oleh {{ p_ticket.member_name }}
            </div>
            <div>
              <b>Tanggal dan Waktu</b><br>
              <v-icon style="float: left">mdi-calendar-month</v-icon>
              <div style="margin-left: 20px;">{{ p_ticket.seminar_start_date | date }} - <br>
                    {{ p_ticket.seminar_end_date | date }}
              </div>
              <v-icon style="float: left">mdi-clock-outline</v-icon>
              <div style="margin-left: 20px;">{{ p_ticket.seminar_start_time.slice(0,5) }} - 
                    {{ p_ticket.seminar_end_time.slice(0,5) }} WIB
              </div>
            </div>
            <div>
              <b>Lokasi</b><br>
              <div>
                <v-icon>mdi-map-marker</v-icon>
                <span>{{ p_ticket.seminar_location_name }}</span><br>
                <div class="address_">
                  {{ p_ticket.seminar_address }}, {{ p_ticket.seminar_subdistrict }}, {{ p_ticket.seminar_city }}, {{ p_ticket.seminar_province }}
                </div>
              </div>
            </div>
            <div>
              <b>Peserta seminar</b><br>
              <v-icon>mdi-account</v-icon>
              <span>{{ p_ticket.seminar_collection.seminar_collection_member_name }}</span>
            </div>
            <div>
              <v-icon>mdi-email-outline</v-icon>
              <span>{{ p_ticket.seminar_collection.seminar_collection_member_email }}</span>
            </div>
            <div>
              <b>Jenis kursi</b>
            </div>
            <div class="text_color uppercase">
              <b>{{ p_ticket.seminar_collection.seminar_collection_type_seat }}</b>
            </div>
            <div class="text_center">
              <img
                :src="p_ticket.seminar_qrcode"
                aspect-ratio="1"
                class="width_code_qr"/>
              <p class="code__">{{ p_ticket.seminar_ticket_code }}</p>
            </div>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
		p_ticket() {
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

<style>
.row_2 {
  border-left-style: dashed;
  border-left-color: #c0c0c0;
  border-width: 2px;
}
.cover_img_ticket {
  width: 94%;
  height: 130px;
}
/* Create two equal columns that floats next to each other */
.column {
  float: left;
  width: 50%;
  padding: 10px;
  font-size: 11px;
}
.column_ {
  width: 29%;
  font-size: 11px;
}
.column_seat {
  width: 26%;
  margin-left: 2px;
  font-size: 11px;
}
.column_member {
  width: 43%;
  font-size: 11px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
.row_ {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.lbl_ticket_p {
  background: rgb(22, 160, 134);
  color: rgb(255, 255, 255);
  border-radius: 4px;
  text-align: center;
  width: 90%;
  font-size: 11px;
}
.width_code_qr {
  width: 85%
}
.address_ {
  margin-left: 4px;
}
</style>