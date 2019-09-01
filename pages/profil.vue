<template>
  <div class="body_">
    <div class="text_center"
      v-if="page == page">
      <v-avatar
      :tile="false"
      size="130"
      color="grey lighten-4">
        <img :src="member.member_profile_pic"
              aspect-ratio="1">
      </v-avatar>
    </div>

    <div class="mt10"
      style="border: 1px solid #c6c6c6;"
      v-if="page == 'view'">
      <v-list two-line style="padding-left: 20px;">
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ member.member_name }}
            </v-list-item-title>
            <v-list-item-subtitle>Nama</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-account-card-details-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ member.member_code }}
            </v-list-item-title>
            <v-list-item-subtitle>ID Akun</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ member.member_email }}
            </v-list-item-title>
            <v-list-item-subtitle>Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ member.member_mobile_phone_number }}
            </v-list-item-title>
            <v-list-item-subtitle>No.Telepon</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="member.member_birthdate !== ''">
              {{ member.member_birthdate }}
            </v-list-item-title>
            <v-list-item-title v-if="member.member_birthdate == ''">
              -
            </v-list-item-title>
            <v-list-item-subtitle>Tanggal Lahir</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="member.member_gender == 'male'">
              Laki-laki
            </v-list-item-title>
            <v-list-item-title v-if="member.member_gender == 'demale'">
              Perempuan
            </v-list-item-title>
            <v-list-item-subtitle>Jenis Kelamin</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="member.member_religion !== ''">
              {{ member.member_religion }}
            </v-list-item-title>
            <v-list-item-title v-if="member.member_religion == ''">
              -
            </v-list-item-title>
            <v-list-item-subtitle>Agama</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-speed-dial
        class="text_right"
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition">
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="#16A086"
            dark
            fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
          @click="changePage('edit')">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>

    <div class="mt10"
      style="border: 1px solid #c6c6c6;"
      v-if="page == 'edit'">
      <div style="padding: 20px">
        <v-text-field label="Nama"
          v-model="data.member_name"
          color="#16A086">
        </v-text-field>
        <v-text-field readonly
          label="ID Akun"
          v-model="member.member_code"
          color="#16A086">
          {{ member.member_code }}
        </v-text-field>
        <v-text-field readonly
          label="Email"
          v-model="member.member_email"
          color="#16A086">
        </v-text-field>
        <v-text-field readonly
          label="No.Telepon"
          v-model="member.member_mobile_phone_number"
          color="#16A086">
        </v-text-field>

        <!-- <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Picker without buttons"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu> -->

        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="data.member_birthdate"
              label="Tanggal Lahir"
              readonly
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="data.member_birthdate" @input="menu2 = false" no-title scrollable>
          </v-date-picker>
        </v-menu>
        <v-select
          :items="gender"
          item-text="name"
          item-value="id"
          class="select__slot"
          label="Jenis Kelamin"
          v-model="data.member_gender" />
        <v-select
          :items="religion.list"
          item-text="title"
          class="select__slot"
          label="Agama"
          v-model="data.member_religion" />
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
      menu: false,
        page: 'view',
        toEdit: false,
        data: {
          member_name: '',
          member_birthdate: '',
          member_gender: '',
          member_religion: ''
        },
        gender: [
          {
            id: 1,
            name: 'Laki-laki'
          },
          {
            id: 2,
            name: 'Perempuan'
          }
        ],
        religion: {
          other: {
            title: '',
            status: false
          },
          list: [
            {
              title: 'Islam'
            },
            {
              title: 'Hindu'
            },
            {
              title: 'Budha'
            },
            {
              title: 'Kristen Protestan'
            },
            {
              title: 'Katolik'
            },
            {
              title: 'Kong Hu Cu'
            },
            {
              title: 'Lainnya'
            }
          ]
        },
        direction: 'top',
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'slide-y-reverse-transition',
      }
    },
    computed: {
      member() {
        return this.$store.state.auth.user
      },
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'class': 'purple', icon: 'account_circle' }
          case 'two': return { 'class': 'red', icon: 'edit' }
          case 'three': return { 'class': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    },
    methods: {
      changePage(page) {
        this.page = page
      },
       editProfile (toEdit) {
        if (toEdit == 'yes') {
          this.changePage('edit')
          this.toEdit = true;
        } else {
          this.toEdit = false;
        }
      }
    }
  }
</script>

<style>
.v-icon {
  font-size: 20px !important;
}
#create .v-speed-dial {
  position: absolute;
}
#create .v-btn--floating {
  position: relative;
}
.v-speed-dial--direction-top .v-speed-dial__list {
  right: -141px !important;
  width: 100%;
  text-align: -webkit-right;
}
.v-label {
  font-size: 13px !important
}
</style>