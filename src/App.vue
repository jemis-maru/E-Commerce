<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  
  data: () => ({
    isShowSideBar: false,
  }),


  methods: {
    handleSidebar(showSideBar) {
      this.isShowSideBar = showSideBar;
    },
  },

};
</script>

<style></style>
