<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Reset Password</h1>
        <div class="account__form" v-if="sendOTP">
          <form @submit.prevent="sendOtpRequest()">
            <input
              type="email"
              class="txt txt--left"
              placeholder="Enter email"
              required
              v-model="email"
            />
            <button type="submit" class="btn btn--brand btn--boxshadow w--100">
              Reset Password With OTP
            </button>
          
          </form>
        </div>

        <div class="account__form" v-if="verifyOTP">
          <form @submit.prevent="verifyOTPRequest()">
            <input
              type="number"
              v-model="otp"
              required
              class="txt txt--left"
              placeholder="Enter OTP"
            />
            <p v-if="isValid">Otp must be six digit long</p>
            <button type="submit" class="btn btn--brand btn--boxshadow w--100">
              Verify OTP
            </button>
  
            <button @click="sendOtpRequest()" class="btn btn--brand btn--boxshadow w--100">
              Resend OTP
            </button>
            
          </form>
        </div>

        <div class="account__form" v-if="resetPass">
          <form @submit.prevent="resetPassword()">
            <input
              type="text"
              class="txt txt--left"
              v-model="newPassword"
              required
              placeholder="Enter New Password"
            />
             <input
              type="password"
              required
              v-model="confirmPassword"
              class="txt txt--left"
              placeholder="Re Enter New Password"
            />
            <button type="submit" class="btn btn--brand btn--boxshadow w--100">
              Reset Password
            </button>
            
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { verifyUser,resendOtp,resetUserPassword } from '../api/user/user'
export default {
  data() {
    return {
      email: "",
      otp:"",
      sendOTP:true,
      verifyOTP:false,
      resetPass:false,
      isValid:false,
      confirmPassword:"",
      newPassword:"",
    }
  },
  methods: {
     sendOtpRequest(){
      const payload = {
        email:this.email
      }
      resendOtp(payload)
      .then((res)=>{
         this.sendOTP = false;
         this.verifyOTP = true;
      })
      .catch(err=>{
          this.$q.notify({
            type:"negative",
            message:"Otp Request failed! try again!"
         })
      })
     },
     verifyOTPRequest(){
      const payload = {
        otp:this.otp,
        email:this.email,
      }
      verifyUser(payload)
      .then((res)=>{
         this.verifyOTP = false;
         this.resetPass = true;
         this.$q.notify({
            type:"positive",
            message:"OTP verified! Reset Password"
         })
      })
      .catch(err=>{
          this.$q.notify({
            type:"negative",
            message:"Wrong OTP"
         })
      })
     },
     resetPassword(){
      if(this.newPassword === this.confirmPassword){
         const payload = {
          email:this.email,
          password:this.newPassword
         }
         
         resetUserPassword(payload)
         .then(res=>{
            this.$q.notify({
            type:"positive",
            message:"OTP verified!"
         })
          this.$router.push({ name : 'Home' })
         })
         .catch(err=>{
          this.$q.notify({
          type:"negative",
          message:"Something went wrong! try again!"
           })
         })
      }
      else{
        this.$q.notify({
          type:"negative",
          message:"Password must be same!"
        })
      }
     },

  }
}
</script>

<style scoped>
.btn{
  margin:5px;
}

</style>
