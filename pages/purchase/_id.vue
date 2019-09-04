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

    <div v-if="process">
      <div class="font_bold">
        Harga
      </div>
      
      <table class="table_price">
        <tr style="color: #606060;height: 40px;">
          <th class="th_price"
            v-for="(header, index) in headers"
            :key="index">
              {{ header.text }}
          </th>
        </tr>
        <tr v-for="(cat, index) in ticket_config.config_seat" :key="index">
          <td class="td_price capitalize" :class="{
          'disable_': cat.seminar_config_ticket_available === 0
          }">{{ cat.seminar_config_ticket_type_seat }}</td>
          <td class="td_price" :class="{
          'disable_': cat.seminar_config_ticket_available === 0
          }">{{ cat.seminar_config_ticket_available }} Kursi</td>
          <td :class="{
          'disable_price': cat.seminar_config_ticket_available === 0
          }" class="td_price text_color font_bold">
            {{ cat.seminar_config_ticket_price | price }}
          </td>
          <td>
            <v-radio-group
              :disabled="cat.seminar_config_ticket_available === 0"
              v-on:click="cek = props"
              v-model="typeSelecting" class="radio_btn">
              <v-radio color="#16a086" :value="cat"></v-radio>
            </v-radio-group>
          </td>
        </tr>
      </table>

      <div class="text_center mt-4">
        <v-btn color="#16a086"
          v-if="saveform === false" 
          :disabled="typeSelecting.length === 0"
          @click="toPerson"
          class="capitalize font12 btn_color">
            Lanjutkan
        </v-btn>
        <v-btn color="#16a086"
          loading
          v-if="saveform === true" 
          :disabled="typeSelecting.length === 0"
          @click="toPerson"
          class="capitalize font12 btn_color">
            Lanjutkan
        </v-btn>
      </div>

    </div>
  </div>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
  export default {
    middleware: 'student',
    data: () => ({
      row: null,
      selected:[],
      typeSelecting:[],
      headers: [
          {
            text: 'Kategori Tiket',
            value: 'Kategori',
            sortable: false,
          },
          { text: 'Jumlah Kursi',
            value: 'Harga',
            sortable: false, },
          { text: 'Harga per tiket',
            value: 'Harga',
            sortable: false, },
          { text: '',
            value: 'radio',
            sortable: false, }
        ],
        id:null,
        time_sem_start:null,
        time_sem_end:null,
        process:false,
        saveform: false
    }),
    mounted () {
      this.fetchDataInfo()
      this.id = this.$route.params.id
    },
    computed: {
      ticket_config () {
        return this.$store.state.transaction.purchase.tconfig
      },
      items () {
        return this.$store.state.transaction.purchase.seat
      },
      data_bill () {
        return this.$store.state.transaction.person.bill
      }
    },
    methods: {
      async fetchTicketBill() {
        await this.$store.dispatch('transaction/person/GET_TICKET_BILL', {
          seminar_id: this.ticket_config.seminar_id
        })
        this.selected = this.data_bill.seminar_config_ticket_id
        this.typeSelecting = {
          seminar_config_ticket_type_seat : this.data_bill.seminar_temporary_cart_type_seat,
          seminar_config_ticket_price : this.data_bill.seminar_temporary_cart_ticket_price
        }
        this.process = true
      },
      async fetchDataInfo () {
        await this.$store.dispatch('transaction/purchase/GET_TICKET_CONFIG', {
          ticket_id: this.$route.params.id
        })
        this.fetchTicketBill()
      },
      async toPerson () {
        this.saveform = true
        await this.$store.dispatch('transaction/purchase/POST_TICKET_CONFIG', {
          seminar_id : this.ticket_config.seminar_id,
          product_seat : this.typeSelecting.seminar_config_ticket_type_seat,
          price_ticket : this.typeSelecting.seminar_config_ticket_price
        })
        .then(res => {
          if (res.status == 201) {
            window.location = `/transaction/person/${this.ticket_config.seminar_id}?ticket=${this.id}&seminar=${this.$route.query.seminar}`
            this.saveform = false;
          } else {
            this.saveform = false
          }
        })
      },
    },
    head () {
      return {
        title: 'Pilih Seminar - ' + this.$route.query.seminar.replace(/-/g, " ")  + '| Gotraining.co.id ',
        meta: [
          { hid: 'description', name: 'description', content: 'Pilih tiket seminar Anda' },
          { hid: 'og:title', property: 'og:title', content: 'Pilih Seminar - ' + this.$route.query.seminar.replace(/-/g, " ")  + '| Gotraining.co.id ' },
          { hid: 'og:description', property: 'og:description', content: 'Pilih tiket seminar Anda' }
        ]
      }
    }
  }
</script>

<style>
  .card_list_selected {
    transition: 0.3s;
    width: 100%;
    border-radius: 4px;
    /* margin-bottom: 3%; */
    box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.2);
    padding: 25px;
    height: 220px;
    /* padding-bottom: 3px; */
  }
  .card_list_selected_ {
    transition: 0.3s;
    width: 100%;
    border-radius: 4px;
    /* margin-bottom: 3%; */
    /* box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.2); */
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 10px 25px;
    
    /* padding-bottom: 3px; */
  }
  .table_ {
    border-collapse: collapse;
    width: 45%;
    border: 1px solid #ebeef5;
    font-size: 1.15em;
    border-radius: 6px;
    position: relative;
    /* overflow: hidden; */
    box-sizing: border-box;
    flex: 1;
    width: 50%;
    max-width: 50%;
    background-color: #fff;
    font-size: 14px;
    color: #606266;
  }

  .th_ {
    padding: 18px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .td_ {
    padding: 13px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .table_in:hover {
    background: #ddd;
  }
  .tr_hea {
    background: #f3f3f3;
    font-weight: bold;
    font-size: 15px;
  }
  .v-input--selection-controls .v-input__control {
    flex-grow: 0;
    width: 100% !important;
  }
  .button_select {
    padding: 5px 16px;
    background-color: #16A086 !important;
    width: 20% !important;
    color: #fff !important;
    font-weight: bold !important;
    border-radius: 4px !important;
    font-size: 16px !important;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  }
  .text_categoty {
    margin-bottom: 4px;
    color: #fff;
    font-weight: bold;
    background: #16a086;
    width: fit-content;
    padding: 1px 15px;
    border-radius: 0px 50px 50px 0px;
    font-size: 12px;
  }
  table.v-table thead th {
    font-weight: 900 !important;
    font-size: 13px !important;
  }
  .disable {
    padding: 5px 16px;
    background-color: #ddd !important;
    cursor: not-allowed !important;
    width: 20% !important;
    color: #fff !important;
    font-weight: bold !important;
    border-radius: 4px !important;
    font-size: 17px !important;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  }
  .width_select {
    max-width: 21% !important;
  }
  .table_select {
    margin-top: 25px; 
    width: 55%;
  }
  @media screen and (max-width: 1000px) {
    .width_select {
      max-width: 100% !important;
    }
    .card_list_selected {
      -webkit-transition: 0.3s;
      transition: 0.3s;
      width: 100%;
      border-radius: 4px;
      /* margin-bottom: 3%; */
      box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.2);
      padding: 25px;
      height: auto;
      /* padding-bottom: 3px; */
    }
    .table_select {
      margin-top: 25px; 
      width: 100%;
    }
    .card_list_selected_ {
      transition: 0.3s;
      width: 100%;
      border-radius: 4px;
      /* margin-bottom: 3%; */
      /* box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.2); */
      border-bottom: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 10px 5px;
      
      /* padding-bottom: 3px; */
    }
    .button_select {
      padding: 5px 16px;
      background-color: #16A086 !important;
      width: 50% !important;
      color: #fff !important;
      font-weight: bold !important;
      border-radius: 4px !important;
      font-size: 16px !important;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    }
    .disable {
      padding: 5px 16px;
      background-color: #ddd !important;
      cursor: not-allowed !important;
      width: 20% !important;
      color: #fff !important;
      font-weight: bold !important;
      border-radius: 4px !important;
      font-size: 17px !important;
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    }
  }
  .padding_height {
    height: inherit !important; 
    padding: 16rem !important;
  }
  .flex_purchase {
    padding-top: 2px !important; 
    flex-basis: 8.333333% !important; 
    flex-grow: 0 !important; 
    max-width: 6.333333% !important;
  }
  .button_purchase__ {
    text-align: center; 
    padding-bottom: 3%; 
    padding-top: 5%
  }
  .text_title_purchase__ {
    font-size: 16px; 
    text-transform: capitalize; 
    margin-bottom: 5px;
  }
</style>
