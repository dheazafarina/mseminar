<template>
  <div class="body_ payment_form">
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

    <div v-if="!process">
      <div class="gotpay_">
        <span>Support by</span>
        <img
          :src="require('~/assets/logo/payment.png')"
          aspect-ratio="1"
          style="width: 30%"/>
      </div>
      <div
        v-if="Object.keys(payment_profile).length > 0"
        style="text-align: center">
        <img
          :src="member.member_profile_pic"
          height="100px"
          contain>
      </div>
      <v-expansion-panels
        v-if="Object.keys(payment_profile).length > 0"
        focusable 
        class="mt-5 mb-3 b-1"
        style="border: 1px solid rgba(0, 0, 0, 0.12);">
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate>
            Payment
            <template v-slot:actions>
              <v-icon>mdi-paypal</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list two-line>
              <v-list-item class="pa-0">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ member.member_name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>Nama</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="pa-0">
                <v-list-item-icon>
                  <v-icon>mdi-cash</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-if="!scalar(payment_profile)">
                      {{ payment_profile.saldo | price }}
                    </span>
                    <span v-else>
                      Rp. xxx.xxx
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Saldo</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="pa-0">
                <v-list-item-icon>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-if="!scalar(payment_profile)">
                      {{ payment_profile.member_mobile_phone_number | phone }}
                    </span>
                    <span v-else>
                      xxxx-xxxx-xxxx
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Telepon</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="pa-0">
                <v-list-item-icon>
                  <v-icon>mdi-mail</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span v-if="!scalar(payment_profile)">
                      {{ payment_profile.member_email | email }}
                    </span>
                    <span v-else>
                      xxxx@xxxxx.xxx
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle>Email</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- payment list -->
      <div v-if="payment_list.length > 0">
        <v-card
          class="mx-auto mb-3"
          outlined
          v-for="(l, index) in payment_list"
          :key="index">
          <v-list-item two-line
            style="margin: 5px;">
            <v-list-item-content>          
              <v-list-item-title>
                {{ l.member_deposit_detail_desc }}
              </v-list-item-title>
              <v-list-item-subtitle class="font10 mt10">
                {{ l.member_deposit_detail_created_at | date }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-subtitle class="text_color font_bold text_right">
                {{ parseInt(l.member_deposit_detail_nominal_outcome) | price }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate
                style="padding: 16px 10px">
                Lihat Detail
                <template v-slot:actions>
                  <v-icon>mdi-chevron-down</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item two-line>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ l.member_deposit_detail_invoice_number }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Transaction Invoice</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ l.member_deposit_detail_payment_invoice_number }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Payment Invoice</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ l.member_deposit_detail_created_at | date }}
                      </v-list-item-title>
                      <v-list-item-subtitle>Tanggal Transaksi</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title class="capitalize"
                        v-if="l.member_deposit_detail_type_payment !== ''">
                        {{ l.member_deposit_detail_type_payment }}
                      </v-list-item-title>
                      <v-list-item-title v-else>
                        -
                      </v-list-item-title>
                      <v-list-item-subtitle>Metode Pembayaran</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item class="pa-0">
                    <v-list-item-content>
                      <v-list-item-title class="capitalize">
                        <span v-if="l.member_deposit_detail_status_payment === 'ok'">Complete</span>
                        <span v-if="l.member_deposit_detail_status_payment === 'pending'">Pending</span>
                        <span v-if="l.member_deposit_detail_status_payment === 'confirmed'">Confirmed</span>
                        <span v-if="l.member_deposit_detail_status_payment === 'canceled'">Closed</span>
                        <span v-if="l.member_deposit_detail_status_payment === 'failed'">Failed</span>
                      </v-list-item-title>
                      <v-list-item-subtitle>Status Pembayaran</v-list-item-subtitle>
                    </v-list-item-content>
                    <!-- <v-list-item-content>
                      <v-list-item-title v-if="l.member_deposit_detail_type_payment !== ''">
                        -
                      </v-list-item-title>
                      <v-list-item-title v-else>
                        -
                      </v-list-item-title>
                      <v-list-item-subtitle>Bank Transfer</v-list-item-subtitle>
                    </v-list-item-content> -->
                  </v-list-item>
                </v-list-item>

              <div class="text_center"
                v-if="l.member_deposit_detail_status_payment === 'pending'">
                <v-btn rounded dark
                  small
                  color="#7842ff"
                  style="width: 50%"
                  class="capitalize font12">
                  Confirm Now
                </v-btn>
              </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-card>
      </div>

      <!-- no data -->
      <div v-if="payment_list.length === 0">
        <div class="text_center">
          <img :src="require('~/assets/image/Seminar_not_found.png')"
            class="img_no_data">
          <p class="font12">
            Belum Terdapat Riwayat Transaksi
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        process: false,
        dialog: false,
        show: false,
        dataPayment: {}
      }
    },
    computed: {
      member() {
        return this.$store.state.auth.user
      },
      payment() {
        this.dataPayment = this.$store.state.payment.status
        if (this.dataPayment.scalar === false ||
            this.dataPayment.member_status === "not_verified" ||
            this.dataPayment.member_status !== "approved") {
          this.dialog = true
        } else {
          this.dialog = false
        }
        return this.$store.state.payment.status
      },
      payment_profile() {
        return this.$store.state.payment.detail
      },
      payment_list() {
        return this.$store.state.payment.list
      }
    },
    mounted() {
      this.process = true
      this.fetchDataPayment()
      this.fetchOutcome()
    },
    methods: {
      scalar (value) {
        return Object.prototype.hasOwnProperty.call(value, 'scalar')
      },
      async fetchDataPayment () {
        this.process = true
        await this.$store.dispatch('payment/GET_PROFILE', { })
        this.process = false
      },
      async fetchOutcome () {
        this.process = true
        await this.$store.dispatch('payment/GET_PAYMENT', { })
        this.process = false
      },
      async activation () {
        window.location = `/payment/activation?cb=${window.location.href}`
      }
    }
  }
</script>

<style>
.gotpay_ {
  text-align: center;
  margin-bottom: 25px;
}
.v-expansion-panel::before {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2),
              0px 0px 0px 0px rgba(0, 0, 0, 0.14),
              0px 0px 0px 0px rgba(0, 0, 0, 0.12);;
}
.v-expansion-panel-content__wrap {
  padding: 0 10px 16px;
  flex: 1 1 auto;
  max-width: 100%;
}
</style>