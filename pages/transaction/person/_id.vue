<template>
  <div class="body_" style="margin-top: 12px">
    <div class="font_bold">
      Harga
    </div>
    <table class="table_price">
      <tr style="color: #606060;">
        <th class="th_price"
          v-for="(header, index) in headers"
          :key="index">
            {{ header.text }}
        </th>
      </tr>
      <tr>
        <td class="td_price capitalize">{{ data_bill.seminar_temporary_cart_type_seat }}</td>
        <td class="td_price">{{ data_bill.seminar_temporary_cart_ticket_price | price}}</td>
        <td class="td_price width2">{{ data_bill.seminar_temporary_cart_total_ticket }}</td>
        <td class="td_price width1">{{ data_bill.seminar_temporary_cart_total_price | price}}</td>
      </tr>
    </table>

    <div class="txt_total">
      Total pembelian <span class="text_color font_bold">{{ data_bill.seminar_temporary_cart_total_price | price }}</span>
    </div>

    <v-divider class="divider_"></v-divider>
    
    <div style="border: 1px solid #ddd;">
    <div class="radio_">
      <v-radio-group class="radio_group" v-model="dataOrder" column>
        <v-radio label="Gunakan Profile Gotraining" value="gotraining" class="font_bold"></v-radio>
        <v-radio label="Data Pemesan" value="datapemesan" class="font_bold"></v-radio>
      </v-radio-group>
    </div>

    <div v-if="dataOrder === 'datapemesan'"  class="padding_">
      <div v-if="Object.keys(data_person).length === 0">
        <div>
          <p class="title_field">
            Nama Lengkap
          </p>
          <input v-model="form.name" type="text" class="name_input">
          <!-- <div
            class="error_message"
            v-if="hasOwnProp(error, 'name') == true && 
                              error.name.length > 0"
            style="margin-top: 2%;">
            {{error.name[0].message}}
          </div> -->
        </div>
        <div>
          <p class="title_field">
            Email
          </p>
          <input v-model="form.email"
            type="text"
            class="name_input"
            v-validate="'required|email'">
        </div>
        <div>
          <p class="title_field">
            Nomor Handphone
          </p>
          <input v-model="form.phone"
            type="number"
            class="name_input">
        </div>
        <div style="margin-top: 2%;">
          <small>*) E-tiket akan dikirim ke emailmu</small>
        </div>
      </div>
      <div v-if="Object.keys(data_person).length !== 0">
        <div>
          <p class="title_field">
            Nama Lengkap
          </p>
          <input v-model="data_person.seminar_temporary_transaction_member_name"
            type="text"
            class="name_input">
        </div>
        <div>
          <p class="title_field">
            Email
          </p>
          <input v-model="data_person.seminar_temporary_transaction_member_email"
            type="text"
            class="name_input"
            v-validate="'required|email'">
        </div>
        <div>
          <p class="title_field">
            Nomor Handphone
          </p>
          <input v-model="data_person.seminar_temporary_transaction_phone"
            type="number"
            class="name_input">
        </div>
        <div style="margin-top: 2%;">
          <small>*) E-tiket akan dikirim ke emailmu</small>
        </div>
      </div>
    </div>

    <div class="profil_desc" v-if="dataOrder === 'gotraining'">
      <div>
        <table class="table_step_">
          <tr style="color: #606060;">
            <th class="text_center font12 font_bold">Nama Lengkap</th>
            <th class="text_center font12 font_bold">Email</th>
            <th class="text_center font12 font_bold">No Handphone</th>
          </tr>
          <tr>
            <td class="text_center font12">{{ member.member_name }}</td>
            <td class="text_center font12">{{ member.member_email }}</td>
            <td class="text_center font12">{{ member.member_mobile_phone_number }}</td>
          </tr>
        </table>
      </div>
      <div style="margin-top: 5%; margin-left: 15px;">
        <small>*) E-tiket akan dikirim ke emailmu</small>
      </div>
    </div>
    </div>

    <v-dialog
      persistent
      v-model="dialog"
      max-width="290">
      <v-card>
        <v-card-title class="headline" />
        <v-card-text class="capitalize text_center">
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            small
            color="#16a086"
            class="capitalize font12 btn_color"
            @click="toPurchase">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
    <div class="text_center"
      style="margin: 15px">

      <v-btn color="#16a086"
        @click="toPreview"
        v-if="Object.keys(data_person).length === 0"
        class="capitalize font12 btn_color">
          Lanjutkan
      </v-btn>

      <v-btn color="#16a086"
        @click="toPreviewUpdate"
        v-if="Object.keys(data_person).length !== 0"
        class="capitalize font12 btn_color">
          Lanjutkan
      </v-btn>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Kategori Tiket', value: 'cat' },
          { text: 'Harga per tiket', value: 'price' },
          { text: 'Jumlah Tiket', value: 'ticket' },
          { text: 'Total Harga', value: 'total' }
        ],
        form: {
          name: '',
          email: '',
          phone: ''
        },
        dataOrder: 'datapemesan',
        seminar_title: '',
        last_id: '',
        product_type_ticket: '',
        type_seat: '',
        message: '',
        chart_id: '',
        dialog: false
      }
    },
    computed: {
      member() {
        return this.$store.state.auth.user
      },
      check_step() {
        return this.$store.state.transaction.person.step
      },
      data_person() {
        return this.$store.state.transaction.person.person
      },
      data_temporary() {
        return this.$store.state.transaction.person.temporary
      },
      data_bill() {
        return this.$store.state.transaction.person.bill
      }
    },
    mounted() {
      this.seminar_title = this.$route.query.seminar
      this.fetchStep()
      this.fetchPerson()
      this.fetchTemporary()
      this.fetchBill()
    },
    methods: {
      toPreview () {
        if (this.dataOrder == 'datapemesan') {
          this.createDataPerson()
        } else {
          this.sendDataPerson()
        }
      },
      async createDataPerson () {
        await this.$store.dispatch('transaction/person/CREATE_DATA_PERSON', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : this.form.name,
          email : this.form.email,
          phone : this.form.phone,
          product_id : this.$route.params.id
        })
        .then ((res) => {
          if (res.status_code == 201) {
            this.last_id = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 404) {
            this.message = res.message
            this.dialog = true
          }
        })
      },
      async sendDataPerson () {
        this.form.name = ''
        this.form.email = ''
        this.form.phone = ''
        await this.$store.dispatch('transaction/person/SEND_DATA_PERSON', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : this.member.member_name,
          email : this.member.member_email,
          phone : this.member.member_mobile_phone_number,
          product_id : this.$route.params.id
        })
        .then ((res) => {
          if (res.status_code == 201) {
            this.last_id = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 404) {
            this.message = res.message
            this.dialog = true
          }
        })
      },
      toPreviewUpdate () {
        if (this.dataOrder == 'datapemesan') {
          this.createDataPersonUpdate()
        } else {
          this.sendDataPersonUpdate()
        }
      },
      async createDataPersonUpdate () {
        await this.$store.dispatch('transaction/person/CREATE_DATA_PERSON_UPDATE', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : this.form.name,
          email : this.form.email,
          phone : this.form.phone,
          product_id : this.$route.params.id
        })
        .then ((res) => {
          if (res.status_code == 201) {
            this.last_id = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 404) {
            this.message = res.message
            this.dialog = true
          }
        })
      },
      async sendDataPersonUpdate () {
        await this.$store.dispatch('transaction/person/SEND_DATA_PERSON_UPDATE', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : this.member.member_name,
          email : this.member.member_email,
          phone : this.member.member_mobile_phone_number,
          product_id : this.$route.params.id
        })
        .then ((res) => {
          if (res.status_code == 201) {
            this.last_id = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 404) {
            this.message = res.message
            this.dialog = true
          }
        })
      },
      async toCart () {
        await this.$store.dispatch('transaction/person/ADD_CART', {
          product_type : "seminar",
          product_id : this.$route.params.id
        })
        .then ((res) => {
          if (res.status_code == 201) {
            window.location=`/transaction/preview/${this.$route.params.id}?temporary=${this.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
          }
        })
      },
      async fetchStep () {
        await this.$store.dispatch('transaction/person/GET_CHECK_PURCHASE', {
          seminar_id: this.$route.params.id,
          type_seat: this.type_seat
        })
        .then(res => {
          if (res.status_code == 200) {
            if (res.result.status_page === 2) {
              window.location="/marketplace/main/info/" + this.$route.params.id+'/'+this.$route.query.seminar
            } else if (res.result.status_page === 3) {
              window.location=`/transaction/ticket/${this.$route.params.id}`
            } else  {
              console.log('lalala')
            }
          }
        })
      },
      async fetchPerson () {
        await this.$store.dispatch('transaction/person/GET_DATA_PERSON', {
          seminar_id: this.$route.params.id
        })
      },
      async fetchTemporary () {
        await this.$store.dispatch('transaction/person/GET_DATA_TEMPORARY', {
          seminar_id: this.$route.params.id
        })
      },
      async fetchBill () {
        await this.$store.dispatch('transaction/person/GET_BILL', {
          seminar_id: this.$route.params.id
        })
        .then ((res) => {
          this.chart_id = res.result.seminar_temporary_cart_seminar_id
          this.type_seat = res.result.seminar_temporary_cart_type_seat
        })
      },
      toPurchase () {
        window.location = '/purchase/'+this.chart_id+'?seminar='+this.seminar_title
      }
    }
  }
</script>

<style>
.v-label {
  font-size: 14px !important;
}
</style>