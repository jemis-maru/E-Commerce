<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Login</h1>
        <div class="account__form">
          <form @submit.prevent="login">
            <input
              type="email"
              required
              class="txt txt--left" v-model="form.email"
              placeholder="Enter Email"
            />
            <input type="password" class="txt txt--left" placeholder="password" v-model="form.password" />
            
            <router-link
              :to="{ name: 'ResetPass' }"
              class="account__recoverpass"
              >Reset password</router-link
            >
            <button type="submit" class="btn btn--brand btn--boxshadow w--100">login</button>

            <div class="account__footer">
              <span>dont have an account?</span>
              <router-link :to="{ name: 'Register' }" class="account__router"
                >register page</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
 
  data(){
    return {
       form: {
        email: '',
        password: ''
        }
    }
  },
  methods:{
    login(){
        this.$store.dispatch('user/setLoginState',this.form)
        .then((data)=>{
          this.$q.notify({
          type: 'positive',
          message: 'Login Successfully'})
          this.$router.push({ name: 'Home' })
        })
        .then((res)=>{
          if(this.$store.state.user.role == 'ADMIN'){
            this.$router.push({ name: 'AdminUsers' })
          }
          if(this.$store.state.user.role == 'SELLER'){
             this.$router.push({ name: 'Product' })
          }
        })
        .catch(err=>{
         
          this.$q.notify({
          type: 'negative',
          message: 'Something went wrong!'})
        })
    }
  }
}
</script>

<style></style>
