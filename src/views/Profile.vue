<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">User Profile</h1>
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
                    :disable="disabled"
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
                v-model="cnumber"
                label="contact number *"
                type="number"
                :disable="disabled"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <p class="form__label">Address :</p>
              <q-input
                filled
                v-model="housenumber"
                label="House Number / Name *"
                :disable="disabled"
                lazy-rules
                class="q-mb-lg"
              />

              <q-input
                filled
                v-model="landmark"
                label="Landmark *"
                :disable="disabled"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="city"
                label="City *"
                :disable="disabled"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="state"
                label="State *"
                :disable="disabled"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="country"
                label="Country *"
                :disable="disabled"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="pincode"
                label="Pincode *"
                :disable="disabled"
                type="number"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                  (val) => val.length < 7 || 'Please type right pincode',
                ]"
              />

              <q-btn
                label="Add Address"
                color="primary"
                class="q-mb-md"
                @click="addaddress()"
              />

              <div v-if="flag">
                <div class="row">
                  <q-btn
                    label="reset"
                    class="q-mb-lg q-mr-lg"
                    color="green"
                    @click="resetaddress()"
                  />
                  <q-btn
                    label="Remove Address"
                    class="q-mb-lg"
                    color="green"
                    @click="removeaddress()"
                  />
                </div>
                <q-input
                  filled
                  v-model="housenumber2"
                  label="House Number / Name *"
                  :disable="disabled"
                  class="q-mb-lg"
                />

                <q-input
                  filled
                  v-model="landmark2"
                  label="Landmark *"
                  :disable="disabled"
                  class="q-mb-lg"
                />

                <q-input
                  filled
                  v-model="city2"
                  label="City *"
                  :disable="disabled"
                  class="q-mb-lg"
                />

                <q-input
                  filled
                  v-model="state2"
                  label="State *"
                  :disable="disabled"
                  class="q-mb-lg"
                />

                <q-input
                  filled
                  v-model="country2"
                  label="Country *"
                  :disable="disabled"
                  class="q-mb-lg"
                />

                <q-input
                  filled
                  v-model="pincode2"
                  label="Pincode *"
                  type="number"
                  :disable="disabled"
                  lazy-rules
                  :rules="[
                    (val) => val.length < 7 || 'Please type right pincode',
                  ]"
                />
              </div>

              <div>
                <q-btn
                  label="Edit data"
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
import { getUser, updateUser } from "../api/user/user.js";
import {
  getAllAddress,
  getAddress,
  updateAddress,
} from "../api/address/address.js";

export default {
  created() {
    this.displayUser();
  },
  data: () => ({
    image: null,
    imageUrl: "",
    fname: "",
    lname: "",
    email: "",
    cnumber: "",
    housenumber: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    housenumber2: "",
    landmark2: "",
    city2: "",
    state2: "",
    country2: "",
    pincode2: "",
    flag: false,
    disabled: true,
    details: [],
    userData: {},
    addressId: [],
  }),
  methods: {
    updatePhoto() {
   
      this.imageUrl = URL.createObjectURL(this.image);
     
    },

    onSubmit() {
      const id = this.$store.state.user.user.id;

      const fileData = new FormData();

      fileData.append("avatar", this.image);
      fileData.append("firstName", this.fname);
      fileData.append("lastName", this.lname);
      fileData.append("contactNo", this.cnumber);

      
      
      updateUser(fileData, id)
        .then((res) => {
       
          this.$q.notify({
            type: "positive",
            icon: "done",
            message: "User data updated Successfully",
          });
        })
        .catch((err) => {
      
          this.$q.notify({
            type: "nagative",
            message: "User data not updated",
          });
        });

      if (this.flag === true) {
        const payload_user_address = {
          houseNo: this.housenumber,
          landmark: this.landmark,
          city: this.city,
          state: this.state,
          country: this.country,
          pincode: this.pincode,
        };
        

        updateAddress(payload_user_address, this.addressId[0])
          .then((res) => {
       
            this.$q.notify({
              type: "positive",
              icon: "done",
              message: "Address Updated Successfully",
            });
          })
          .catch((err) => {
            
            this.$q.notify({
              type: "nagative",
              message: "Address not updated",
            });
          });

        const payload_user_address_multi = {
          houseNo: this.housenumber2,
          landmark: this.landmark2,
          city: this.city2,
          state: this.state2,
          country: this.country2,
          pincode: this.pincode2,
        };
       

        updateAddress(payload_user_address_multi, this.addressId[1])
          .then((res) => {
           
            this.$q.notify({
              type: "positive",
              icon: "done",
              message: "Address Updated Successfully",
            });
          })
          .catch((err) => {
     
            this.$q.notify({
              type: "nagative",
              message: "Address not updated",
            });
          });
      } else {
        const payload_user_address = {
          houseNo: this.housenumber,
          landmark: this.landmark,
          city: this.city,
          state: this.state,
          country: this.country,
          pincode: this.pincode,
        };
       

        updateAddress(payload_user_address, this.addressId[0])
          .then((res) => {
           
            this.$q.notify({
              type: "positive",
              icon: "done",
              message: "Address Updated Successfully",
            });
          })
          .catch((err) => {
          
            this.$q.notify({
              type: "nagative",
              message: "Address not updated",
            });
          });
      }

      this.displayUser();
    },
    resetaddress() {
      this.housenumber2 = null;
      this.landmark2 = null;
      this.city2 = null;
      this.state2 = null;
      this.country2 = null;
      this.pincode2 = null;
    },

    removeaddress() {
      this.housenumber2 = null;
      this.landmark2 = null;
      this.city2 = null;
      this.state2 = null;
      this.country2 = null;
      this.pincode2 = null;

      this.flag = false;
    },

    addaddress() {
      this.flag = true;
    },

    editform() {
      this.disabled = false;
    },
    onReset() {
      this.fname = null;
      this.lname = null;
      this.email = null;
      this.cnumber = null;
      this.housenumber = null;
      this.landmark = null;
      this.city = null;
      this.state = null;
      this.country = null;
      this.pincode = null;
      this.housenumber2 = null;
      this.landmark2 = null;
      this.city2 = null;
      this.state2 = null;
      this.country2 = null;
      this.pincode2 = null;
    },

    displayUser() {
      const id = this.$store.state.user.user.id;
      getUser(id)
        .then((res) => {
          this.userData = res.data.data;
         
          this.imageUrl = this.userData.avatar;
          this.fname = this.userData.firstName;
          this.lname = this.userData.lastName;
          this.email = this.userData.email;
          this.cnumber = this.userData.contactNo;

          this.$q.notify({
            type: "positive",
            icon: "done",
            message: "User data fetched Successfully",
          });
        })
        .catch((err) => {
       
          this.$q.notify({
            type: "nagative",
            message: "User data not fetched",
          });
        });

      getAllAddress()
        .then((res) => {
          const data = res.data.data.data;

          data.forEach((element) => {
       
            this.addressId.push(element.id);
         
          });

          for (let i = 0; i <= this.addressId.length; i++) {
            if (i === 0) {
             
              getAddress(this.addressId[i])
                .then((res) => {
                  const addressOfUser = res.data.data;
                  

                  this.housenumber = addressOfUser.houseNo;
                  this.landmark = addressOfUser.landmark;
                  this.city = addressOfUser.city;
                  this.state = addressOfUser.state;
                  this.country = addressOfUser.country;
                  this.pincode = addressOfUser.pincode;
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (i == 1) {
              getAddress(this.addressId[i])
                .then((res) => {
                  const addressOfUser = res.data.data;
                 

                  this.addaddress();

                  this.housenumber2 = addressOfUser.houseNo;
                  this.landmark2 = addressOfUser.landmark;
                  this.city2 = addressOfUser.city;
                  this.state2 = addressOfUser.state;
                  this.country2 = addressOfUser.country;
                  this.pincode2 = addressOfUser.pincode;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
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

.form_field {
  width: 60%;
  display: inline-block;
}
</style>
