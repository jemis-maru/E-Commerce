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

  created(){
    window.addEventListener('storage', (e) => {
      if(e.key == "vuex"){
        location.reload();
      }
    });
  }

};
</script>

<style></style>
