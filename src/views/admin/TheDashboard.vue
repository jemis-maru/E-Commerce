<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Admin Dashboard</q-toolbar-title>
          <q-btn-dropdown flat color="white" label="admin">
            <q-list>
              <!-- <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Profile</q-itesm-label>
                </q-item-section>
              </q-item> -->
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label>logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
            <template v-for="menuItem, index in menuList" :key="index">
              <q-item clickable :to="'/admin/'+menuItem.path" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
          <q-separator spaced />
          <q-list>
            <q-item clickable v-ripple to="/admin/categories">
              <q-item-section avatar>
                <q-icon name="inventory" />
              </q-item-section>
              <q-item-section> Categories/Sub Categories </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/admin/brands">
              <q-item-section avatar>
                <q-icon name="lists" />
              </q-item-section>
              <q-item-section> Brands </q-item-section>
            </q-item>
            <q-separator spaced />
            <q-item clickable @click="logout" class="text-red" v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <q-page padding>
          <router-view/>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
const menuList = [
  {
    icon: "dashboard",
    label: "Dashboard",
    path: "dashboard",
  },
  {
    icon: "person",
    label: "Users",
    path: "users",
  },
  {
    icon: "person",
    label: "Sellers",
    path: "sellers",
  },
  {
    icon: "local_mall",
    label: "Products",
    path: "products",
  },
  {
    icon: "local_shipping",
    label: "Orders",
    path: "orders",
  },
  {
    icon: "inventory",
    label: "Complaints",
    path: "complaints",
  },
];

export default {
  data() {
    return {
      drawer: true,
      menuList,
    };
  },
  methods:{
    
    logout(){
      this.$store.dispatch("user/logout")
      .then(response =>{
        this.$router.push({ name: "Home" });
      })
      
    }
  }
};
</script>

<style scoped>
.highlited-link {
  background-color: #f5f5f5;
  color: rgb(248, 18, 18);
}
</style>
