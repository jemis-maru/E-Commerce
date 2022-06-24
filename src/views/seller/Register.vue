<template>
  <main class="main">
    <div class="account">
      <div v-show="displayForm" class="container">
        <h1 class="account__title">Seller Registration</h1>
        <div class="q-pa-md">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="container justify-center" style="width: 60%">
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4 q-mb-md">
                  <div>
                    <p class="form__label">Photo :</p>
                  </div>
                  <div class="user_photo">
                    <q-img
                      :src="imageUrl"
                      spinner-color="black"
                      style="height: 150px; width: 150px"
                    />
                  </div>
                </div>

                <div class="self-end col-xs-12 col-sm-6 col-md-4">
                  <q-file
                    dense
                    v-model="image"
                    label="Pick You Photo"
                    accept="image/*"
                    outlined
                    counter
                    class="q-ma-sm"
                    max-file-size="1048576"
                    style="max-width: 200px"
                    @update:model-value="updatePhoto()"
                    
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
              </div>

              <q-input
                filled
                v-model="fname"
                label="First name *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="lname"
                label="last name *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="email"
                label="email *"
                type="email"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="password"
                label="password *"
                type="password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="cpassword"
                label="confirm password *"
                type="password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="cnumber"
                label="contact number *"
                type="number"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="gstnumber"
                label="GST number *"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
      <div v-show="!displayForm">
        <div class="otp-container">
          <p class="otp-title">Enter otp to verify your email.</p>
          <q-input outlined v-model="otp" label="OTP" />
          <div class="btn-container">
            <div class="q-btn-container">
              <q-btn
                size="md"
                :disable="disableVerify"
                @click="verifyOtp"
                class="bg-green text-white text-weight-bold"
                label="Verify"
              />
            </div>
            <div class="q-btn-container">
              <q-btn
                size="md"
                :disable="disableSendAgail"
                @click="sendOtpAgain"
                label="Send again"
                class="bg-red text-white text-weight-bold"
              />
            </div>
          </div>
          <p class="time-msg">{{ timeRemainingMessage }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { addSeller } from "../../api/seller/seller.js";
import { verifyUser } from "../../api/user/user.js";
import { resendOtp } from "../../api/user/user.js";

export default {
  data: () => ({
    image: null,
    imageUrl: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    cnumber: "",
    gstnumber: "",
    details: [],
    userData: {},
    addressId: [],
    displayForm: true,
    disableVerify: false,
    disableSendAgail: true,
    otp: "",
    timeRemainingMessage: "",
    timeInterval: null,
  }),

  methods: {
    updatePhoto() {
      this.imageUrl = URL.createObjectURL(this.image);
    },

    onReset() {
      this.image = null;
      this.imageUrl = null;
      this.fname = null;
      this.lname = null;
      this.email = null;
      this.password = null;
      this.cpassword = null;
      this.cnumber = null;
      this.gstnumber = null;
    },

    verifyOtp() {
      clearInterval(this.timeInterval);
      this.timeRemainingMessage = "";

      let verificationData = {
        otp: this.otp,
        email: this.email,
      };

     

      verifyUser(verificationData)
        .then((res) => {
         
          this.$q.notify({
            type: "positive",
            message: "Email verified Successfully",
          });
          this.$router.push("/login");
        })
        .catch((err) => {
          
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },

    sendOtpAgain() {
      let userData = {
        email: this.email,
      };

      

      resendOtp(userData)
        .then((res) => {
        
          this.$q.notify({
            type: "positive",
            message: "Resend otp successfully",
          });
          this.disableVerify = false;
          this.disableSendAgail = true;
          this.otpTimer();
        })
        .catch((err) => {
       
          this.$q.notify({
            type: "negative",
            message: "Something went wrong|Please Try Again",
          });
        });
    },

    otpTimer() {
      // for otp timer
      let countDownDate = new Date().getTime() + 120000;
      this.timeInterval = setInterval(() => {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.timeRemainingMessage =
          "Time remaining: " + minutes + "m " + seconds + "s ";
        if (distance < 0) {
          clearInterval(this.timeInterval);
          this.timeRemainingMessage =
            "Sorry your time has been expired! Click to Send again.";
          this.disableVerify = true;
          this.disableSendAgail = false;
        }
      }, 1000);
    },

    onSubmit() {
         

      const fileData = new FormData();

      fileData.append("avatar", this.image);
      fileData.append("firstName", this.fname);
      fileData.append("lastName", this.lname);
      fileData.append("email", this.email);
      fileData.append("password", this.password);
      fileData.append("contactNo", this.cnumber);
      fileData.append("role", "SELLER");
      fileData.append("GSTNo", this.gstnumber);


      addSeller(fileData)
      .then((res) => {
          this.$q.notify({
            type: "positive",
            message: "Seller Added Successfully",
          });
          this.displayForm = false;
          window.scrollTo(0, 0);
          this.otpTimer();
        })
        .catch((err) => {
         
          this.$q.notify({
            type: "negative",
            message: "Seller Not Added|Please Try Again",
          });
        });
    },
  },
};
</script>

<style scoped>
.user_photo {
  text-align: center;
  border: 1px solid black;
  margin: 0 20%;
}
.otp-container {
  padding: 0 100px;
}
.otp-title {
  font-size: 20px;
}
.btn-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.time-msg {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
  color: rgb(245, 61, 61);
}

@media all and (max-width: 680px) {
  .otp-container {
    padding: 0 50px;
  }
}
</style>
