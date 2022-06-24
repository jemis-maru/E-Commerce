<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Complaint Form</h1>
        <div class="q-pa-md">
          <q-form @submit="postComplaint" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="title"
              label="title *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              v-model="complaintmessage"
              filled
              type="textarea"
              label="message *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
              autogrow=""
            >
            </q-input>

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
          </q-form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { addComplaint } from "../api/complaint.js";

export default {
  data: () => ({
    title: null,
    complaintmessage: null,
  }),

  methods: {
    onSubmit() {
      this.complaint = {
        title: this.title,
        message: this.complaintmessage,
      };
    },

  
    postComplaint() {
      const complaint = {
        title: this.title,
        complaintMsg: this.complaintmessage,
      };
     
      addComplaint(complaint)
        .then((res) => {
          this.$q.notify({
            type: "positive",
            icon: "done",
            message: "Complaint Submitted Successfully",
          });
        })
        .catch((err) => {
        
          this.$q.notify({
            type: "nagative",
            message: "Complaint Not Submitted",
          });
        });

    
    },
    onReset() {
      this.title = null;
      this.complaintmessage = null;
    },
  },
  
};
</script>
