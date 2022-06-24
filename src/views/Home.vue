<template>
  <div>
    <BaseHeader @show-sidebar="handleSidebar" />
      <landing-page v-if="isHomeRoute" />
      <router-view :key="$route.fullPath" />
    <BaseFooter :showSideBar="isShowSideBar" />
  </div>
</template>

<script>
import BaseHeader from "../components/BaseHeader.vue";
import BaseFooter from "../components/BaseFooter.vue";
import LandingPage from './LandingPage.vue';

export default {
  data: () => ({
    isShowSideBar: false,
  }),

  components: {
    BaseHeader,
    BaseFooter,
    LandingPage,
  },

  methods: {
    handleSidebar(showSideBar) {
      this.isShowSideBar = showSideBar;
    },
  },

  computed: {
    isHomeRoute(){
      if(this.$route.path == '/'){
        return true;
      }
      else{
        return false;
      }
    }
  },

  created() {},
};
</script>

<style scoped>
</style>