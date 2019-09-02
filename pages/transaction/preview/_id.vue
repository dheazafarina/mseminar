<template>
  <div>
    <div class="check_msg">
      <b>Silahkan Cek Kembali Pesanan Anda</b>
    </div>

    <table style="margin-top: 20px;" class="table_price font12">
      <tr style="color: #606060;">
        <th class="th_left">
          Data Pemesan
        </th>
        <!-- <nuxt-link :to="'/transaction/person/'22?temporary=12&seminar=seminar-free&ticket=20"> -->
          <th class="th_right"
            @click="toPerson">
            Edit
          </th>
        <!-- </nuxt-link> -->
      </tr>
      <tr>
        <td class="font_bold padding_">
          {{ get_preview.seminar_temporary_transaction_member_name }}
        </td>
        <td></td>
      </tr>
      <tr>
        <td class="padding_">Email
          <p class="font_bold">
            {{ get_preview.seminar_temporary_transaction_member_email }}
          </p>
        </td>

        <td class="padding_">No. Handphone
          <p class="font_bold">
            {{ get_preview.seminar_temporary_transaction_phone }}
          </p>
        </td>
      </tr>
    </table>

    <table style="margin-top: 20px;" class="table_price font12">
      <tr style="color: #606060;">
        <th class="th_price"
          v-for="(header, index) in headers"
          :key="index">
            {{ header.text }}
        </th>
      </tr>
      <tr>
        <td class="td_price capitalize">{{ get_preview.seminar_temporary_transaction_type_seat }}</td>
        <td class="td_price">{{ get_preview.seminar_temporary_transaction_total_price | price }}</td>
        <td class="td_price">{{ get_preview.seminar_temporary_transaction_total_ticket }} Kursi</td>
        <td class="td_price">{{ get_preview.seminar_temporary_transaction_total_price | price }}</td>
      </tr>
    </table>

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
                    @click="createInvoice"
                    class="button_next_dialog">
                    Lanjutkan
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Kategori Tiket', value: 'cat' },
          { text: 'Harga', value: 'price' },
          { text: 'Jumlah', value: 'ticket' },
          { text: 'Total', value: 'total' }
        ],
        process: {
          invoice: {
            run: false
          }
        },
        showConfirm: false,
        dialog: false,
        invoice: [],
        seminar_title: ''
      }
    },
    computed: {
      check_step() {
        return this.$store.state.transaction.person.step
      },
      get_preview() {
        return this.$store.state.transaction.preview.list
      }
    },
    mounted() {
      this.seminar_title = this.$route.query.seminar
      this.fetchList()
    },
    methods: {
      toConfirm () {
        this.showConfirm = true
      },
      toPerson () {
        window.location = `/transaction/person/${this.$route.params.id}?ticket=${this.$route.params.id}&seminar=${this.seminar_title}`
      },
      async fetchList () {
        await this.$store.dispatch('transaction/preview/GET_PREVIEW', {
          temporary: this.$route.query.temporary
        })
      },
      async createInvoice () {
        await this.$store.dispatch('transaction/preview/CREATE_INVOICE', {
          product_type : "seminar",
          product_type_ticket : this.get_preview.seminar_temporary_transaction_type_seat,
          name : this.get_preview.seminar_temporary_transaction_member_name,
          email : this.get_preview.seminar_temporary_transaction_member_email,
          phone : this.get_preview.seminar_temporary_transaction_phone,
          product_id : this.$route.params.id
        })
        .then ((res) => {
          if (res.status_code == 201) {
            var invoice = res.result.invoice_number
            var type = res.result.redirect_payment
            this.invoice = res.result
            if (invoice !== undefined) {
              if (type === 'yes') {
                this.generateKey()
              } else {
                window.location=`/transaction/ticket/${this.$route.params.id}?seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
              }
            }
          } else {
            this.process.invoice = false
          }
        })
      },
      async generateKey () {
        await this.$store.dispatch('transaction/preview/GENERATE_KEY', {
          email: this.$store.state.auth.user.member_email,
          client_id: `${process.env.client_payment}`,
          type: 'transaction'
        })
        .then ((res) => {
          if (res.status_code == 201) {
            window.location = `${process.env.URL_PAYMENT}` + 'transaction?' + 'key=' + res.result + '&inv=' + this.invoice.invoice_number + '&cb=' + window.location.href
          } else {
            this.process.invoice = false
          }
        })
      }
    }
  }
</script>
