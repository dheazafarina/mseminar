<template>
  <div class="body_">
    <div class="font_bold">
      Harga
    </div>

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

    <div v-if="!process">
      <table class="table_price">
        <tr style="color: #606060;height: 40px;">
          <th class="th_price"
            v-for="(header, index) in headers"
            :key="index">
              {{ header.text }}
          </th>
        </tr>
        <tr v-for="(cat, index) in ticket_config.config_seat" :key="index">
          <td class="td_price capitalize">{{ cat.seminar_config_ticket_type_seat }}</td>
          <td class="td_price">{{ cat.seminar_config_ticket_available }} Kursi</td>
          <td class="td_price text_color font_bold">
            {{ cat.seminar_config_ticket_price | price }}
          </td>
          <td>
            <v-radio-group
              v-on:click="cek = props"
              v-model="selecting" class="radio_btn">
              <v-radio color="#16a086" :value="cat"></v-radio>
            </v-radio-group>
          </td>
        </tr>
      </table>

      <!-- <v-data-table
        v-model="cek"
        :headers="headers"
        :items="items"
        item-key="name"
        hide-actions=true>
      <template slot="items" slot-scope="props">
        <tr @click="selected == props.item.seminar_config_ticket_id">
          <td style="font-size: 12px;" class="text-xs-left">{{ props.item.seminar_config_ticket_type_seat }}</td>
          <td style="font-size: 12px;" class="text-xs-left">
            <b v-if="props.item.seminar_config_ticket_price !== 0">{{ props.item.seminar_config_ticket_price | price }}</b>
            <b v-if="props.item.seminar_config_ticket_price === 0">Gratis</b>
          </td>
          <td style="padding-top: 12px;">
            <v-radio-group
              v-on:click="cek = props"
              v-model="selected"
              name="rowSelector">
              <v-radio :value="props.item.seminar_config_ticket_id"/>
            </v-radio-group>
          </td>
        </tr>
      </template>
      </v-data-table> -->

      <div class="text_center"
        style="margin: 15px">
        <v-btn color="#16a086"
          :disabled="selecting.length === 0"
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
    // middleware: 'auth',
    data () {
      return {
        headers: [
          { text: 'Kategori Tiket', value: 'cat' },
          { text: 'Jumlah Kursi', value: 'total' },
          { text: 'Harga per tiket', value: 'price' },
          { text: '', value: 'radio' }
        ],
        selecting: [
          { value: '',
            price: '' }
        ],
        selected:[],
        cek: [],
        items: [],
        selected:[],
        config_seat: [],
        process: false,
        seminar_title: ''
      }
    },
    computed: {
      ticket_config () {
        return this.$store.state.transaction.purchase.tconfig
      }
    },
    mounted() {
      this.fetchTicketConfig()
      this.seminar_title = this.$route.query.seminar
    },
    methods: {
      async fetchTicketConfig () {
        this.process = true;
        await this.$store.dispatch('transaction/purchase/GET_TICKET_CONFIG', {
          seminar_id: this.$route.params.id
        })
        .then(res => {
          this.config_seat = res.result.config_seat
        })
        this.process = false;
      },
      async toPerson () {
        await this.$store.dispatch('transaction/purchase/POST_TICKET_CONFIG', {
          seminar_id: this.$route.params.id,
          product_seat : this.selecting.seminar_config_ticket_type_seat,
          price_ticket : this.selecting.seminar_config_ticket_price
        })
        .then((res) => {
          window.location = `/transaction/person/${this.$route.params.id}?ticket=${this.$route.params.id}&seminar=${this.seminar_title}`
        })
      }
    }
  }
</script>

<style>
.radio_btn {
  margin-left: 10px;
  margin-right: -13px;
}
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}
.v-messages {
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 0px;
  min-width: 1px;
  position: relative;
}
</style>