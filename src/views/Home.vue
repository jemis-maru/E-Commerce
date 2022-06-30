<template>
  <div>
    <BaseHeader @show-sidebar="handleSidebar" />
    <div class="marginClass">
      <landing-page v-if="isHomeRoute" />
      <router-view :key="$route.fullPath" />
    </div>
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
.marginClass{
  margin-top: 7%;
}

@media all and (max-width: 900px) {
  .marginClass{
    margin-top: 12%;
  }
}

@media all and (max-width: 700px) {
  .marginClass{
    margin-top: 15%;
  }
}

@media all and (max-width: 480px) {
  .marginClass{
    margin-top: 25%;
  }
}
</style>