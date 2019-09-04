<template>
  <v-app style="font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif; background: #fff;">
    <div class="body_color body_content">
      <header-menu />
        <nuxt class="body_color"/>
      <footer-menu />
    </div>
  </v-app>
</template>

<script>
import headerMenu from '~/components/header'
import footerMenu from '~/components/footer'
export default {
  components: {
    headerMenu,
    footerMenu
  }
}
</script>

<style>
@media screen and (min-width: 320px) {
  .body_content {
    padding: 15% 0% 18% 0%;
  }
}
@media screen and (min-width: 700px) {
  .body_color {
    background: #fff;
  }
  .body_content {
    padding: 5% 20% 5% 20%;
  }
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 12px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
