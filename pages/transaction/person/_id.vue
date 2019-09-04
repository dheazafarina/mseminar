<template>
  <div class="body_">
    <!-- loading -->
    <div class="centered_img">
      <v-layout
        justify-center
        align-center
        v-if="!process">
        <v-progress-circular
          indeterminate
          color="#16A086" />
      </v-layout>
    </div>

    <div v-if="process == true">
      <div>
        <table class="table_price">
          <tr style="color: #606060;">
            <th class="th_step">Kategori Tiket</th>
            <th class="th_step">Harga per tiket</th>
            <th class="th_step">Jumlah Tiket</th>
            <th class="th_step">Total Harga</th>
          </tr>
          <tr>
            <td class="td_price capitalize">{{data_bill.seminar_temporary_cart_type_seat}}</td>
            <td class="td_price"><b>{{data_bill.seminar_temporary_cart_ticket_price | price}}</b></td>
            <td class="td_price width2">{{data_bill.seminar_temporary_cart_total_ticket}} Kursi</td>
            <td class="td_price width1"><b>{{data_bill.seminar_temporary_cart_ticket_price | price}}</b></td>
          </tr>
        </table>

        <div class="txt_total">
          Total pembelian <span class="text_color font_bold">{{ data_bill.seminar_temporary_cart_total_price | price }}</span>
        </div>

        <v-divider class="divider_"></v-divider>

        <div style="border: 1px solid #ddd;">
          <div class="radio_">
            <v-radio-group
              class="radio_group"
              v-model="column" 
              column>
              <v-radio 
                label="Gunakan Profile Gotraining" 
                value="gotraining" 
                class="font_bold">
              </v-radio>
              <v-radio
                label="Data Pemesan"
                value="pesan"
                class="font_bold">
              </v-radio>
            </v-radio-group>
          </div>

          <div class="padding_"
            v-if="column === 'pesan'">
            <div v-if="dataPersonEdit.length === 0">
              <div>
                <p class="title_field">
                  Nama Lengkap
                </p>
                <input v-model="name" type="text" class="name_input">
                <div
                  class="error_message"
                  v-if="hasOwnProp(error, 'name') == true && 
                                    error.name.length > 0"
                  style="margin-top: 2%;">
                  {{error.name[0].message}}
                </div>
              </div>
              <div style="margin-top: 2%">
                <p class="title_field">
                  Email
                </p>
                <input v-model="email" type="text" class="name_input">
                <div
                  class="error_message"
                  v-if="hasOwnProp(error, 'email') == true && 
                                    error.email.length > 0"
                  style="margin-top: 2%;">
                  {{error.email[0].message}}
                </div>
              </div>
              <div>
                <p class="title_field">
                  No Handphone
                </p>
                <input v-model="phone" type="number" class="name_input">
                <div
                  class="error_message"
                  v-if="hasOwnProp(error, 'phone') == true && 
                                    error.phone.length > 0"
                  style="margin-top: 2%;">
                  {{error.phone[0].message}}
                </div>
              </div>
              <div style="margin-top: 2%;">
                <small>E-tiket akan dikirim ke emailmu</small>
              </div>
            </div>

            <div v-if="dataPersonEdit.length !== 0">
              <div>
                <p class="title_field">
                  Nama Lengkap
                </p>
                <input v-model="dataPersonEdit.seminar_temporary_transaction_member_name" type="text" class="name_input">
                <div
                  class="error_message"
                  v-if="hasOwnProp(error, 'name') == true && 
                                    error.name.length > 0"
                  style="margin-top: 2%;">
                  {{error.name[0].message}}
                </div>
              </div>
              <div style="margin-top: 2%">
                <p class="title_field">
                  Email
                </p>
                <input v-model="dataPersonEdit.seminar_temporary_transaction_member_email" type="text" class="name_input">
                <div
                  class="error_message"
                  v-if="hasOwnProp(error, 'email') == true && 
                                    error.email.length > 0"
                  style="margin-top: 2%;">
                  {{error.email[0].message}}
                </div>
              </div>
              <div>
                <p class="title_field">
                  No Handphone
                </p>
                <input v-model="dataPersonEdit.seminar_temporary_transaction_phone" type="number" class="name_input">
                <div
                  class="error_message"
                  v-if="hasOwnProp(error, 'phone') == true && 
                                    error.phone.length > 0"
                  style="margin-top: 2%;">
                  {{error.phone[0].message}}
                </div>
              </div>
              <div style="margin-top: 2%;">
                <small>E-tiket akan dikirim ke emailmu</small>
              </div>
            </div>
          </div>
          <div class="padding_"
            v-if="column === 'gotraining'">
            <div>
              <table class="table_step_">
                <tr style="color: #606060;">
                  <th class="th_step_">Nama Lengkap</th>
                  <th class="th_step_">Email</th>
                  <th class="th_step_">No Handphone</th>
                </tr>
                <tr>
                  <td class="td_step_">{{dataUser.member_name}}</td>
                  <td class="td_step_">{{dataUser.member_email}}</td>
                  <td class="td_step_">{{dataUser.member_mobile_phone_number}}</td>
                </tr>
              </table>
            </div>
            <div style="margin-top: 2%; margin-left: 15px;">
              <small>E-tiket akan dikirim ke emailmu</small>
            </div>
          </div>
        </div>

        <div class="text_center"
          style="margin: 15px"
          v-if="dataPersonEdit.length === 0">
          <v-btn
            color="#16a086"
            class="capitalize font12 btn_color"
            v-if="saveform === false"
            @click="fetchDataUser">
            Lanjutkan
          </v-btn>
          <v-btn
            color="#16a086"
            class="capitalize font12 btn_color"
            v-if="saveform === true" 
            type="button"
            loading>
            Lanjutkan
          </v-btn>
          <div v-if="error.message.length !== 0" style="color: red">
            {{error.message}}
          </div>
        </div>

        <div class="text_center"
          style="margin: 15px"
          v-if="dataPersonEdit.length !== 0">
          <v-btn
            color="#16a086"
            class="capitalize font12 btn_color"
            v-if="saveform === false"
            @click="fetchDataUserUpdete">
            Lanjutkan
          </v-btn>
          <v-btn
            color="#16a086"
            class="capitalize font12 btn_color"
            v-if="saveform === true" 
            type="button"
            loading>
            Lanjutkan
          </v-btn>
          <div v-if="error.message.length !== 0" style="color: red">
            {{error.message}}
          </div>
        </div>
      </div>
    </div>
    <!-- <v-dialog
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
    </v-dialog> -->
  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'student',
    data: () => ({
      e1: 0,
      column: 'pesan',
      dialog: false,
      dataUser: [],
      ticket: [],
      saveform: false,
      name: '',
      email: '',
      phone: '',
      pay:[],
      error: {
        name: [],
        email: [],
        phone: [],
        message:'',
        errorLength: false
      },
      saveform_pay: false,
      cart:'',
      form: {
        invoice: null
      },
      check_purchase:null,
      dataMember: [],
      process: false,
      dataPersonEdit:[],
      id_tem: '',
      type_chair_dialog : false,
      date_end_dialog : false
    }),
    mounted () {
      this.dataUser = this.$store.state.auth.user
      this.fetchTemporary()
      this.fetchTicketBill()
    },
    computed: {
      Id_Temporary_Edit () {
        return this.$store.state.transaction.person.id_edit_temporary
      },
      data_bill () {
        return this.$store.state.transaction.person.bill
      },
      check_step() {
        return this.$store.state.transaction.person.step
      },
    },
    methods: {
      validation: function () {
          var error = {
            message: '',
            name: [
              { message: '' }
            ],
            email: [
              { message: '' }
            ],
            phone: [
              { message: '' }
            ]
          }

          error.errorLength = false

          if (this.name.length < 1) {
            error.name[0].message = 'Masukkan nama anda'
            error.errorLength = true
          } else if (this.name.length > 0 && this.name.length > 50) {
            error.name[0].message = 'Minimal nama 50 karakter'
            error.errorLength = true
          } else {
            error.name = []
          }

          if (this.email.length < 1) {
            error.email[0].message = 'Masukkan email anda'
            error.errorLength = true
          } else if (this.email.length > 0 && !this.validationEmail(this.email)) {
            error.email[0].message = 'Email tidak valid'
            error.errorLength = true
          } else {
            error.email = []
          }

          if (this.phone.length < 1) {
            error.phone[0].message = 'Masukkan nomor telepon aktif';
            error.errorLength = true;
          } else if (this.phone.length < 10) {
            error.phone[0].message = 'Minimal nomor handphone 10 karakter';
            error.errorLength = true;
          } else if (this.phone.length > 13) {
            error.phone[0].message = 'Maksimal nomor handphone 13 karakter';
            error.errorLength = true;
          } else if (this.phone.length > 0 && !this.validationPhone(this.phone)) {
            error.phone[0].message = 'Nomor telepon tidak valid'
            error.errorLength = true
          } else {
            error.phone = [];
          }

        return error;
      },
      validationUpdete: function () {
          var error = {
            message: '',
            name: [
              { message: '' }
            ],
            email: [
              { message: '' }
            ],
            phone: [
              { message: '' }
            ]
          }

          error.errorLength = false

          if (this.dataPersonEdit.seminar_temporary_transaction_member_name.length < 1) {
            error.name[0].message = 'Masukkan Nama anda'
            error.errorLength = true
          } else if (this.dataPersonEdit.seminar_temporary_transaction_member_name.length > 0 && this.dataPersonEdit.seminar_temporary_transaction_member_name.length > 50) {
            error.name[0].message = 'Minimal Nama 50 karakter'
            error.errorLength = true
          } else {
            error.name = []
          }

          if (this.dataPersonEdit.seminar_temporary_transaction_member_email.length < 1) {
            error.email[0].message = 'Masukkan email anda'
            error.errorLength = true
          } else if (this.dataPersonEdit.seminar_temporary_transaction_member_email.length > 0 && !this.validationEmail(this.dataPersonEdit.seminar_temporary_transaction_member_email)) {
            error.email[0].message = 'Email tidak valid'
            error.errorLength = true
          } else {
            error.email = []
          }

          if (this.dataPersonEdit.seminar_temporary_transaction_phone.length < 1) {
            error.phone[0].message = 'Masukkan nomor telepon aktif';
            error.errorLength = true;
          } else if (this.dataPersonEdit.seminar_temporary_transaction_phone.length < 10) {
            error.phone[0].message = 'Minimal nomor handphone 10 Karakter';
            error.errorLength = true;
          } else if (this.dataPersonEdit.seminar_temporary_transaction_phone.length > 13) {
            error.phone[0].message = 'Maksimal nomor handphone 13 Karakter';
            error.errorLength = true;
          } else if (this.dataPersonEdit.seminar_temporary_transaction_phone.length > 0 && !this.validationPhone(this.dataPersonEdit.seminar_temporary_transaction_phone)) {
            error.phone[0].message = 'Nomor telepon tidak valid'
            error.errorLength = true
          } else {
            error.phone = []
          }

        return error;
      },
      validationEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
      },
      validationPhone: function (phone) {
        var re = /^\d{10}|\d{2}$/
        return re.test(phone)
      },
      hasOwnProp: function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
      },
      fetchDataUser: function () {
        this.saveform = true;
        if (this.column == 'pesan') {
          this.error = this.validation()
          if (this.error.errorLength == false) {
            this.createDataUser()
          } else {
            this.saveform = false
          }
        } else {
          this.sendDataUser()
        }
      },
      async createDataUser(){
        await this.$store.dispatch('transaction/person/CREATE_DATA_PERSON', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : this.name,
          email : this.email,
          phone : this.phone,
          product_id : this.$route.params.id
        })
        .then(res => {
          var self = this
          if (res.status_code == 201) {
            this.id_tem = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 409) {
            this.error.message = res.message
            this.saveform = false
          } else if (res.status_code == 404) {
            this.error.message = res.message
            this.saveform = false
            setTimeout(function () {
              self.toMainDetail()
            }, 2000)
          } else {
            this.saveform = false
          }
        })
      },
      async sendDataUser() {
        this.name = ''
        this.email = ''
        this.phone = ''
        await this.$store.dispatch('transaction/person/SEND_DATA_PERSON', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : "",
          email : "",
          phone : "",
          product_id : this.$route.params.id
        })
        .then(res => {
          var self = this
          if (res.status_code == 201) {
            this.id_tem = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart();
            }
          }  else if (res.status_code == 409) {
            this.error.message = res.message
            this.saveform = false
          } else if (res.status_code == 404) {
            this.error.message = res.message
            this.saveform = false
            setTimeout(function () {
              self.toMainDetail()
            }, 2000)
          } else {
            this.saveform = false
          }
        })
      },
      async toCart () {
        await this.$store.dispatch('transaction/person/ADD_CART', {
          product_type : "seminar",
          product_id : this.$route.params.id
        })
        .then(res => {
          if (res.status_code == 201) {
            window.location=`/transaction/preview/${this.$route.params.id}?temporary=${this.id_tem}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
          }
        })
      },
      async fetchCheck () {
        await this.$store.dispatch('transaction/person/GET_CHECK_PURCHASE', {
          seminar_id: this.$route.params.id,
          type_seat : this.data_bill.seminar_temporary_cart_type_seat

        })
        .then(res => {
          var self = this
          this.check_purchase = res.result
          if (res.status_code == 404) {
            window.location=`/purchase/${this.$route.query.ticket}?seminar=${this.$route.query.seminar}`
          } else if (res.status_code == 204) {
            this.type_chair_dialog = true
            setTimeout(function () {
              self.toMainDetail()
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
          this.process = true
        })
      },
      async toMainDetail(){
        window.location="/marketplace/main/info/" + this.$route.params.id +'/'+this.$route.query.seminar
      },
      async toMarketplace(){
        window.location="/marketplace"
      },
      async fetchTemporary () {
        await this.$store.dispatch('transaction/person/GET_CHECK_TEMPORARY', {
          seminar_id: this.$route.params.id
        })
        .then ((res) => {
          console.log(res)
          if (res.status == 200) {
            if (res.data.status_code == 200) {
              this.dataPersonEdit = res.data.result
            } else {
              this.dataPersonEdit = []
            }
          }
        })
      },
      async fetchTicketBill() {
        await this.$store.dispatch('transaction/person/GET_TICKET_BILL', {
          seminar_id: this.$route.params.id
        })
        this.fetchCheck()
        this.process = true
      },
      fetchDataUserUpdete: function (){
        this.saveform = true
        if (this.column == 'pesan') {
          this.error = this.validationUpdete();
          if (this.error.errorLength == false) {
            this.createDataUserUpdate()
          } else {
            this.saveform = false;
          }
        } else {
          this.sendDataUserUpdate()
        }
      },
      async createDataUserUpdate(){
        await this.$store.dispatch('transaction/person/CREATE_DATA_PERSON_UPDATE', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : this.dataPersonEdit.seminar_temporary_transaction_member_name,
          email : this.dataPersonEdit.seminar_temporary_transaction_member_email,
          phone : this.dataPersonEdit.seminar_temporary_transaction_phone,
          product_id : this.$route.params.id
        })
        .then(res => {
          var self = this
          if (res.status_code == 201) {
            this.id_tem = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 409) {
            this.error.message = res.message
            this.saveform = false
          } else if (res.status_code == 404) {
            this.error.message = res.message
            this.saveform = false
            setTimeout(function () {
              self.toMainDetail()
            }, 2000)
          } else {
            this.saveform = false
          }
        })
      },
      async sendDataUserUpdate() {
        await this.$store.dispatch('transaction/person/SEND_DATA_PERSON_UPDATE', {
          product_type : "seminar",
          product_type_ticket : this.data_bill.seminar_temporary_cart_type_seat,
          name : "",
          email : "",
          phone : "",
          product_id : this.$route.params.id
        })
        .then(res => {
          var self = this
          if (res.status_code == 201) {
            this.id_tem = res.last_id
            if (this.data_bill.seminar_temporary_cart_ticket_price == 0) {
              window.location=`/transaction/preview/${this.$route.params.id}?temporary=${res.last_id}&seminar=${this.$route.query.seminar}&ticket=${this.$route.query.ticket}`
            } else {
              this.toCart()
            }
          } else if (res.status_code == 409) {
            this.error.message = res.message
            this.saveform = false
          } else if (res.status_code == 404) {
            this.error.message = res.message
            this.saveform = false
            setTimeout(function () {
              self.toMainDetail()
            }, 2000)
          }
          this.saveform = false
        })
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
  .th_step_ {
    text-align: left;
    padding: 0px 15px;
  }
  .td_step_ {
    text-align: left;
    padding: 5px 15px;
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
  }
  .name_input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bbb;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .step_1_data {
    margin-top: 5%;
    border: 1px solid #ddd;
    border-radius: 4px;
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
  .primary {
    background-color: #009688 !important;
    border-color: #009688 !important;
  }
  .theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
    color: #009688 !important;
    text-shadow: #009688 !important;
  }
  .mess {
    text-align: center;
    padding: 2%;
    font-size: 20px;
    background: antiquewhite;
    color: #636363;
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
  .img_border {
    border: 1px solid #ddd;
    padding: 15px
  }
  .text_ticket {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .type_chair {
    background: rgb(22, 160, 134);
    color: rgb(255, 255, 255);
    width: 60%;
    border-radius: 4px;
    text-align: center;
    padding: 7px;
  }
  .error_message {
    font-size: 13px;
    color: red;
    margin-top: -10px;
    margin-bottom: 5px;
    font-family: Lato;
  }
  .padding_step_1 {
    top: 0;
    padding: 24px 24px 16px 24px;
    flex: 1 0 auto;
    width: 100%;
  }
  .table_out {
    padding: 0px 20px; 
    margin-bottom: 7%;
  }
  @media screen and (max-width: 767px) {
    .padding_step_1 {
      top: 0;
      padding: 10px 0px;
      flex: 1 0 auto;
      width: 100%;
    }
    .table_out {
      padding: 0px 0px; 
      margin-bottom: 7%;
    }
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
  .padding_button_transaction {
    text-align: center; 
    margin-top: 3%;
  }
  .text_popup_transaction {
    padding:20px; 
    text-align: center; 
    font-weight: bold;
  }
  .padding_height {
    height: inherit !important; 
    padding: 16rem !important;
  }
</style>