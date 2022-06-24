<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">User Profile</h1>
        <div class="q-pa-md">
          <q-form @submit="alluserUpdate" @reset="onReset" class="q-gutter-md">
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
                :disable="disabled"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />
              <q-input
                filled
                v-model="lname"
                label="last name *"
                :disable="disabled"
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
                disable
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="gstno"
                label="GSTno *"
                type="email"
                disable
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
                :disable="disabled"
              />
              <div>
                <q-btn
                  label="Edit"
                  class="q-mr-sm"
                  color="green"
                  @click="editform()"
                />
                <q-btn label="Submit" type="submit" color="primary" />
                
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useQuasar } from "quasar";
import { fetchSeller, changeDetailSeller } from "../../../api/sellerprofile.js";
export default {
  data() {
    return {
      
      image: null,
      imageUrl: "",
      fname: "",
      lname: "",
      email: "",
      gstno: "",
      cnumber: "",
      isPwd: true,
      disabled: true,
      details: [],
      sellerDetail: [],
      flag: false,
    };
  },
  methods: {
    updatePhoto() {
      
      this.imageUrl = URL.createObjectURL(this.image);
    
    },
    
    editform() {
      this.disabled = !this.disabled;
    },
    
    
    alluserGet() {
      const id = this.$store.state.user.user.id;
      fetchSeller(id)
        .then((res) => {
          this.sellerDetail = res.data.data;
          this.imageUrl = this.sellerDetail.avatar
          this.fname = this.sellerDetail.firstName
          this.lname = this.sellerDetail.lastName
          this.email = this.sellerDetail.email
          this.gstno = this.sellerDetail.GSTNo
          this.cnumber = this.sellerDetail.contactNo
        })
        .catch((err) => {
         
          this.$q.notify({
            type: "nagative",
            message: "User data not updated",
          });
        });
    },
    alluserUpdate() {
      const id = this.$store.state.user.user.id;
   

       const fileData = new FormData();
        fileData.append("avatar", this.image);
        fileData.append("firstName", this.fname);
        fileData.append("lastName", this.lname);
        fileData.append("GSTNo",this.gstno)
        fileData.append("contactNo", this.cnumber);
      changeDetailSeller(fileData, id)
          .then((res) => {
          
            this.$q.notify({
              type: "positive",
              icon: "done",
              message: "Seller data updated Successfully",
            });
          })
          .catch((err) => {
       
            this.$q.notify({
              type: "nagative",
              message: "Seller data not updated",
            });
          });
      
    },
  },
  created() {
    this.alluserGet();
  
  },
};
</script>

<style scoped>
.user_photo {
  text-align: center;
  border: 1px solid black;
}

.form_field {
  width: 60%;
  display: inline-block;
}
</style>
