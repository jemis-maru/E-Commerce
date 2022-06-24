<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-3">
      <q-header elevated class="bg-secondary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Seller panel</q-toolbar-title>
          <q-btn-dropdown flat color="white" label="seller">
            <q-list>
              <q-item clickable to="sellerProfile" v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label >Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable to="logout" v-close-popup @click="onlogout">
                <q-item-section>
                  <q-item-label>logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://images.squarespace-cdn.com/content/v1/5446f93de4b0a3452dfaf5b0/1626904421257-T6I5V5IQ4GI2SJ8EU82M/Above+Avalon+Neil+Cybart" />
            </q-avatar>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                :to='"/seller/"+menuItem.path'
                :active="menuItem.label === 'Outbox'"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

const menuList = [
  
  {
    icon: "inventory_2",
    label: "Product",
    separator: true,
    path: "product",
  },
  {
    icon: "check_circle",
    label: "Order",
    separator: true,
    path: "order",
  }
];

export default {
  data() {
    return {
      
      drawer: true,
      menuList,
    };
  },
  methods:{
    onlogout(){
      this.$store.dispatch('user/logout')
      .then(res=>{
        this.$router.push('/')
      })
      
    }
  }
};
</script>
