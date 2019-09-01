<template>
  <div class="body_">
    <v-stepper v-model="$nuxt.$route.name.split('-')[1]" style="box-shadow: none">
      <v-stepper-header>
        <v-stepper-step
          color="teal darken-2"
          v-for="(l, index) in menu.data"
          :key="index"
          :complete="$nuxt.$route.name.split('-')[1] >= l.title"
          :step="l.id">
          {{ l.name }}
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items style="margin-top: 3%;">
        <nuxt-child></nuxt-child>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        menu: {
          selected: 1,
          data: [
            {
              id: 1,
              title: 'person',
              name: 'Isi Data'
            },
            {
              id: 2,
              title: 'preview',
              name: 'Pembayaran'
            },
            {
              id: 3,
              title: 'ticket',
              name: 'Selesai'
            }
          ]
        }
      }
    }
  }
</script>