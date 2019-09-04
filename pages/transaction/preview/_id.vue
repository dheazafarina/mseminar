<template>
  <div class="body_">
    <!-- loading -->
    <div class="centered_img">
      <v-layout
        justify-center
        align-center
        v-if="!loaderdata">
        <v-progress-circular
          indeterminate
          color="#16A086" />
      </v-layout>
    </div>

    <div v-if="loaderdata == true">
      <div class="check_msg">
        <b>Silahkan Cek Kembali Pesanan Anda</b>
      </div>
      
      <table style="margin-top: 20px;" class="table_price font12">
        <tr style="color: #606060;">
          <th class="th_left">Data Pemesan</th>
          <th class="th_right">
            <nuxt-link :to="`/transaction/person/${this.$route.params.id}?ticket=${this.$route.query.ticket}&seminar=${this.$route.query.seminar}`" style="text-decoration: none; color: #606060">
              Edit
            </nuxt-link>
          </th>
        </tr>
        <tr>
          <td class="font_bold padding_">
            {{ ticket_list.seminar_temporary_transaction_member_name }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td class="padding_">Email
            <p class="font_bold">
              {{ ticket_list.seminar_temporary_transaction_member_email }}
            </p>
          </td>
          <td class="padding_">No. Handphone
            <p class="font_bold">
              {{ ticket_list.seminar_temporary_transaction_phone }}
            </p>
          </td>
        </tr>
      </table>

      <table class="table_step" style="margin-top: 5%">
        <tr style="color: #606060;">
          <th class="th_step">Kategori Tiket</th>
          <th class="th_step">Harga per tiket</th>
          <th class="th_step">Jumlah Tiket</th>
          <th class="th_step">Total Harga</th>
        </tr>
        <tr>
          <td class="td_step">{{ticket_list.seminar_temporary_transaction_type_seat}}</td>
          <td class="td_step">
            <b>{{ticket_list.seminar_temporary_transaction_total_price | price}}</b>
          </td>
          <td class="td_step">{{ticket_list.seminar_temporary_transaction_total_ticket}} Kursi</td>
          <td class="td_step">
            <b>{{ticket_list.seminar_temporary_transaction_total_price | price}}</b>
          </td>
        </tr>
        <tr>
          <td class="td_step"></td>
          <td class="td_step" style="color: #16A086;"><b></b></td>
          <td class="td_step"><b>Total Pembeliaan</b></td>
          <td class="td_step" style="color: #16A086;"><b>{{ticket_list.seminar_temporary_transaction_total_price | price}}</b></td>
        </tr>
      </table>

      <table class="table_step" style="margin-top: 5%">
        <tr style="color: #606060;">
          <th class="th_step">Kursi</th>
          <th class="th_step"></th>
          <th class="th_step" style="text-align: right;">
            <nuxt-link :to="`/purchase/${this.$route.query.ticket}?seminar=${this.$route.query.seminar}`" style="text-decoration: none; color: #606060">
              Edit
            </nuxt-link>
          </th>
        </tr>
        <tr>
          <td class="td_step">{{ticket_list.seminar_temporary_transaction_type_seat}}</td>
          <td class="td_step"></td>
          <td class="td_step"></td>
        </tr>
      </table>

      <!-- <div class="text_center"
        style="margin: 15px;">
        <v-dialog
          v-model="dialog"
          width="400">
          <template v-slot:activator="{ on }">
            <v-btn
              color="#16a086"
              class="capitalize font12 btn_color"
              v-on="on">
              Lanjutkan
            </v-btn>
          </template>
          <v-card>
            <v-card-text style="padding:20px;">
              <v-layout row wrap>
                <v-flex sx7>
                  <p class="text_dialog">
                    <b>Apakah Pesanan anda sudah benar?</b>
                  </p>
                  <p style="color: #777;">
                    Anda tidak dapat mengubah pesanan setelah beralih ke halaman selanjutnya.
                  </p>
                  <p style="color: #777;">
                    Tetap lanjutkan?
                  </p>
                </v-flex>
                <v-flex xs5 style="text-align: right;">
                  <img
                    :src="require('~/assets/image/Ilustrasi.png')"
                    aspect-ratio="1"
                    width="70%"/>
                </v-flex>
              </v-layout>
              <div>
                <v-layout row wrap>
                  <v-flex sm6 md6>
                    <v-btn
                      small
                      class="button_back_dialog"
                      @click="dialog = false">
                      Periksa Kembali
                    </v-btn>
                  </v-flex>
                  <v-flex sm6 md6 style="margin-left: auto">
                    <v-btn small
                      class="button_next_dialog"
                      v-if="saveform_pay === false"
                      @click="fetchSendInvoice">
                      Lanjutkan
                    </v-btn>
                    <v-btn small
                      v-if="saveform_pay === true"
                      type="button"
                      class="button_next_dialog"
                      loading>
                      Lanjutkan
                    </v-btn>
                  </v-flex>
                </v-layout>
                <div v-if="error.message.length > 0" class="error_preview">
                  {{error.message}}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div> -->

      <div class="text_center"
        style="margin: 15px;">
        <v-dialog
          v-model="dialog"
          width="400">
          <template v-slot:activator="{ on }">
            <v-btn
              color="#16a086"
              class="capitalize font12 btn_color"
              v-on="on">
              Lanjutkan
            </v-btn>
          </template>
          <v-card>
            <v-card-text style="padding:20px;">
              <v-layout row wrap>
                <v-flex xs7>
                  <p class="text_dialog">
                    <b>Apakah pesanan anda sudah benar?</b>
                  </p>
                  <p style="color: #777;">
                    Anda tidak dapat mengubah pesanan setelah beralih ke halaman selanjutnya.
                  </p>
                  <p style="color: #777;">
                    Tetap lanjutkan?
                  </p>
                </v-flex>
                <v-flex xs5 style="text-align: right;">
                  <img
                    :src="require('~/assets/image/Ilustrasi.png')"
                    aspect-ratio="1"
                    width="70%"/>
                </v-flex>
              </v-layout>
              <div>
                <v-layout row wrap>
                  <v-flex sm6 md6>
                    <v-btn
                      small
                      class="button_back_dialog"
                      @click="dialog = false">
                      Periksa Kembali
                    </v-btn>
                  </v-flex>
                  <v-flex sm6 md6 style="margin-left: auto">
                    <v-btn small
                      class="button_next_dialog"
                      v-if="saveform_pay === false"
                      @click="fetchSendInvoice">
                      Lanjutkan
                    </v-btn>
                    <v-btn small
                      v-if="saveform_pay === true"
                      type="button"
                      class="button_next_dialog"
                      loading>
                      Lanjutkan
                    </v-btn>
                  </v-flex>
                </v-layout>
                <div v-if="error.message.length > 0" class="error_preview">
                  {{error.message}}
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>

    </div>
    <v-dialog
      v-model="type_chair_dialog"
      width="500"
      persistent>
      <v-card>
        <v-card-text class="text_popup_transaction">
          <div>
            Maaf kursi yang Anda pilih sudah habis
          </div>
          2 detik akan dialihkan
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="date_end_dialog"
      width="500"
      persistent>
      <v-card>
        <v-card-text class="text_popup_transaction">
          <div>
            Maaf penjualan tiket seminar ini telah habis
          </div>
          2 detik akan dialihkan
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'student',
    data: () => ({
      saveform_pay: false,
      invoice:[],
      dataUser: [],
      ticket: [],
      name:[],
      dialog: false,
      loaderdata: false,
      error: {
        message: ''
      },
      type_chair_dialog : false,
      date_end_dialog : false
    }),
    mounted () {
      this.dataUser = this.$store.state.auth.user
      this.fetchList()
    },
    computed: {
      check_step() {
        return this.$store.state.transaction.person.step
      },
      ticket_list() {
        return this.$store.state.transaction.preview.list
      }
    },
    methods: {
      async fetchSendInvoice () {
        this.saveform_pay = true
        await this.$store.dispatch('transaction/preview/CREATE_INVOICE', {
          product_type : "seminar",
          product_type_ticket : this.ticket_list.seminar_temporary_transaction_type_seat,
          name : this.ticket_list.seminar_temporary_transaction_member_name,
          email : this.ticket_list.seminar_temporary_transaction_member_email,
          phone : this.ticket_list.seminar_temporary_transaction_phone,
          product_id : this.$route.params.id
        })
        .then ((res) => {
          var self = this
          if (res.status_code == 201) {
            var invoice = res.result.invoice_number
            var type = res.result.redirect_payment
            this.invoice = res.result
            if (invoice !== undefined) {
              if (type === 'yes') {
                this.generateKey()
              } else {
                window.location="/collection/" + this.$route.params.id
              }
            }
          } else if (res.status_code == 409) {
            this.saveform_pay = false
            this.error.message = res.message
          } else if (res.status_code == 404) {
            this.saveform_pay = false
            setTimeout(function () {
              self.toMain()
            }, 2000)
            this.error.message = 'Maaf tiket yang Anda pilih habis'
          } else {
            this.saveform_pay = false
          }
        })
      },
      toMain(){
        window.location="/marketplace/main/info/" + this.$route.params.id +'/'+this.$route.query.seminar
      },
      async toMarketplace(){
        window.location="/marketplace"
      },
      async generateKey () {
        await this.$store.dispatch('transaction/preview/GENERATE_KEY', {
          email: this.dataUser.member_email,
          client_id: 'gtr',
          type: 'transaction'
        })
        .then ((res) => {
          if (res.status_code == 201) {
            window.location = `${process.env.URL_PAYMENT}` + 'transaction?' + 'key=' + res.result + '&inv=' + this.invoice.invoice_number + '&cb=' + window.location.href
          } else if (res.status_code == 409) {
            this.saveform_pay = false
            this.error.message = res.message
          } else {
            this.saveform_pay = false
          }
        })
      },
      async fetchCheck () {
        await this.$store.dispatch('transaction/person/GET_CHECK_PURCHASE', {
          seminar_id: this.$route.params.id,
          type_seat : this.ticket_list.seminar_temporary_transaction_type_seat
        })
        .then(res => {
          var self = this
          if (res.status_code == 404) {
            window.location=`/purchase/${this.$route.query.ticket}?seminar=${this.$route.query.seminar}`
          } else if (res.status_code == 204) {
            this.type_chair_dialog = true
            setTimeout(function () {
              self.toMain()
            }, 2000)
          } else if (res.status_code == 205) {
            this.date_end_dialog = true
            setTimeout(function () {
              self.toMarketplace()
            }, 2000)
          } else {
            if (res.result.status_page === 2) {
              window.location=`/transaction/ticket/${this.$route.params.id}?seminar=${this.$route.query.seminar}`
            } else if (res.result.status_page === 3) {
              window.location="/collection/" + this.$route.params.id
            } 
          }
          this.loaderdata = true
        })
      },
      async fetchList () {
        await this.$store.dispatch('transaction/preview/GET_PREVIEW', {
          temporary: this.$route.query.temporary
        })
        this.fetchCheck()
      }
    }
  }
</script>

<style>
  .table_step {
    border-collapse: collapse;
    border: 1px solid #dddddd;
    width: 100%;
    font-size: 1.15em;
    margin-top: 15px;
  }
  .th_step {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 25px;
    background: #f3f3f3;
  }
  .td_step {
    text-align: left;
    padding: 25px;
    border-bottom: 1px solid #dddddd;
  }
  .table_step_ {
    border-collapse: collapse;
    width: 100%;
    font-size: 1.15em;
    margin-top: 15px;
  }
  .step_card {
    transition: 0.3s;
    width: 100%;
    border: 1px solid #ddd;
    padding: 3% 8%;
  }
  .v-stepper__wrapper {
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12) !important;
  }
  .radio_ {
    background: #f3f3f3;
    padding: 15px 25px;
  }
  .form_ {
    margin-bottom: 10px;
    font-size: 16px;
  }
  .button_next {
    background-color: #16A086 !important;
    color: #fff !important;
    text-transform: capitalize !important;
    font-size: 16px !important;
    font-weight: bold !important;
    width: 30% !important;
  }
  .theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
    color: #009688 !important;
    text-shadow: #009688 !important;
  }
  .text_dialog {
    font-size: 20px;
    color: #666;
  }
  .button_next_dialog {
    background-color: #16A086 !important;
    color: #fff !important;
    border: 1px solid #16A086 !important;
    text-transform: capitalize !important;
    font-size: 16px !important;
    font-weight: bold !important;
    width: 85% !important;
    border-radius: 6px !important;
  }
  .button_back_dialog {
    background-color: #fff !important;
    border: 1px solid #16A086 !important;
    color: #16A086 !important;
    text-transform: capitalize !important;
    font-size: 16px !important;
    font-weight: bold !important;
    width: 85% !important;
    border-radius: 6px !important;
  }
  .type_chair {
    background: rgb(22, 160, 134);
    color: rgb(255, 255, 255);
    width: 60%;
    border-radius: 4px;
    text-align: center;
    padding: 7px;
  }
  @media screen and (max-width: 767px) {
    .step_card {
      transition: 0.3s;
      width: 100%;
      border: 1px solid #ddd;
      padding: 0% 0%;
    }
    .table_step_ {
      border-collapse: collapse;
      width: 100%;
      font-size: 9px;
      margin-top: 15px;
    }
    .th_step {
      border-bottom: 1px solid #dddddd;
      text-align: left;
      padding: 5px;
      background: #f3f3f3;
    }
    .table_step {
      border-collapse: collapse;
      border: 1px solid #dddddd;
      width: 100%;
      font-size: 9px;
      margin-top: 15px;
    }
    .td_step {
      text-align: left;
      padding: 15px 5px;
      border-bottom: 1px solid #dddddd;
    }
    .form_ {
      margin-bottom: 10px;
      font-size: 9px;
    }
    .radio_ {
      font-size: 10px
    }
  }
  .text_popup_transaction {
    padding:20px; 
    text-align: center; 
    font-weight: bold;
  }
  .error_preview {
    text-align: center; 
    color: red; 
    padding-top: 5px;
  }
</style>
  