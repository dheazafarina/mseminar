<template>
  <div class="body_ body_detail">
    <div v-if="showLocked">
      <div class="text_center m20">
        <img
          :src="require('~/assets/icon/Locked.png')"
          aspect-ratio="1"
          class="img_locked" />
          <p class="capitalize">
            untuk melihat komentar harap login terlebih dahulu
          </p>
      </div>
    </div>

    <div v-if="$store.state.auth.user !== null">
      <!-- input comentar -->
      <div class="container_res">
        <v-layout row>
          <v-flex xs2>
            <v-flex
              xs12
              sm6
              md8
              align-center
              justify-center
              layout
              text-xs-center>
              <v-avatar
                :tile="false"
                size="50"
                color="grey lighten-4">
                <img :src="member.member_profile_pic"
                      aspect-ratio="1">
              </v-avatar>
            </v-flex>
          </v-flex>
          <v-flex xs10 sm6 md10>
            <span class="triangle"></span>
            <div class="ml-textarea">
              <div class="v-input v-textarea v-text-field v-text-field--single-line v-text-field--solo v-text-field--enclosed theme--light">
                <div class="v-input__control border_text">
                  <div class="v-input__slot" style="box-shadow: none;">
                    <div class="v-text-field__slot">
                      <textarea
                        class="textarea_"
                        v-model="discussion"
                        name="input-7-4" rows="3"></textarea>
                    </div>
                  </div>
                  <div
                    v-if="hasOwnProp(error, 'discussion') == true && 
                          error.discussion.length > 0"
                    class="_error_txt">
                    {{error.discussion[0].message}}
                  </div>
                  <div class="v-text-field__details">
                    <div class="v-messages theme--light"></div>
                  </div>
                  <div class="mt10">
                    <p class="text_send" @click="sendDiscuss">
                      Komentari
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <v-divider class="divider_"></v-divider>

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

      <!-- list comentar -->
      <div v-if="!process && getDiscussion.length > 0">
        <div v-for="(l, index) in getDiscussion"
          :key="index">
          <v-layout row>
            <v-flex xs2>
              <v-flex
                xs12
                sm6
                md8
                align-center
                justify-center
                layout
                text-xs-center>
                <v-avatar
                  :tile="false"
                  size="35"
                  color="grey lighten-4">
                  <img :src="l.url_image"
                        aspect-ratio="1">
                </v-avatar>
              </v-flex>
            </v-flex>
            <v-flex xs10 sm6 md10>
              <div class="name_disc">
                {{ l.member_name }}
              </div>
              <div>
                <v-icon>mdi-clock-outline</v-icon>
                <span class="text_sub color_sub">
                  {{ l.seminar_comment_created_at | datetime }}
                </span>
              </div>
              <div class="desc_disc"
                v-html="l.seminar_comment_desc">
              </div>
            </v-flex>
          </v-layout>
          <v-divider class="divider_"></v-divider>
        </div>
      </div>

      <!-- no data -->
      <div class="text_center" v-if="!process && getDiscussion.length === 0">
        <div>
          <img :src="require('~/assets/image/Seminar_not_found.png')"
            class="img_no_data">
          <p class="font12">
            Belum Tersedia Diskusi
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
        discussion: '',
        showLocked: false,
        error: {
          discussion: [],
          errorLength: false
        }
      }
    },
    computed: {
      member () {
        return this.$store.state.auth.user
      },
      getDiscussion () {
        return this.$store.state.product.question.list
      }
    },
    mounted() {
      this.process = true;
      if (this.$store.state.auth.user !==  null) {
        this.fetchDiscuss()
      } else {
        this.showLocked = true
      }
    },
    methods: {
      hasOwnProp: function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      },
      validation () {
        var error = {
          discussion: [
            { message: '' }
          ]
        }

        error.errorLength = false

        if (this.discussion.length < 1) {
          error.discussion[0].message = 'Pertanyaan wajib diisi';
          error.errorLength = true;
        } else if (this.validationWhiteSpace(this.discussion)) {
          error.discussion[0].message = 'Pertanyaan wajib diisi';
          error.errorLength = true;
        } else {
          error.discussion = [];
        }

        return error;
      },
      validationWhiteSpace (spaces) {
        var re = /^\s+$/;
        return re.test(spaces);
      },
      async fetchDiscuss () {
        this.process = true;
        await this.$store.dispatch('product/question/GET_QUESTION_LIST', {
          seminar_id: this.$route.params.id,
        })
        this.process = false;
      },
      async sendDiscuss () {
        this.error = this.validation();        
        if (this.error.errorLength == false) {
          this.process = true;
          await this.$store.dispatch('product/question/POST_QUESTION', {
            seminar_comment_seminar_id : this.$route.params.id,
            seminar_comment_desc : this.discussion
          })
          this.process = false;
          this.fetchDiscuss();
          this.discussion = '';
        }
      }
    }
  }
</script>

<style>
.ml-textarea {
  margin-left: 1%;
}
.img_locked {
  width: 55px;
}
</style>