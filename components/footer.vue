<template>
  <v-card>
    <!-- null token -->
    <v-bottom-navigation
      v-show="!check_token"
      :v-model="bottomNav"
      :value="true"
      :color="color"
      fixed
      shift>
      <v-btn to="/">
        <span>Beranda</span>
        <v-icon class="icons">mdi-home</v-icon>
      </v-btn>
      <v-btn to="/marketplace">
        <span>Seminar</span>
        <v-icon class="icons">mdi-store</v-icon>
      </v-btn>
      <v-btn to="/masuk-seminar">
        <span>Masuk</span>
        <v-icon class="icons">mdi-login</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- not null token -->
    <v-bottom-navigation
      v-show="check_token"
      :v-model="bottomNav"
      :value="true"
      :color="color"
      fixed
      shift>
      <v-btn to="/marketplace">
        <span>Seminar</span>
        <v-icon class="icons">mdi-home</v-icon>
      </v-btn>

      <v-btn to="/history">
        <span>History</span>
        <v-icon class="icons">mdi-history</v-icon>
      </v-btn>

      <v-btn to="/collection">
        <span>Tiket Saya</span>
        <v-icon class="icons">mdi-ticket</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 2
      }
    },

    computed: {
      check_token () {
        return this.$store.state.auth.token
      },
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return '#16A086'
          case 3: return 'indigo'
        }
      }
    }
  }
</script>

<style>
.icons {
  align-items: center;
  display: inline-flex;
  font-feature-settings: "liga";
  font-size: 24px !important;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  text-indent: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>