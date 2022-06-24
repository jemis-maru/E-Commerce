<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-black">
        Complaints
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      
      <table>
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>Complaint By</th>
            <th>Email</th>
            <th>Title</th>
            <th>View</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(complaint) in complaintList" :key="complaint.id">
            <td>{{ complaint.id }}</td>
            <td>{{ complaint.user.firstName}}{{ complaint.user.lastName }}</td>
            <td>{{ complaint.user.email }}</td>
            <td>{{ complaint.title }}</td>
            <td><q-btn flat label="View" color="blue" @click="showdialog[complaint.id] = true"/></td>
            <q-dialog v-model="showdialog[complaint.id]">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Complaint</div>
                  <q-space />
                  {{ complaint.complaintMsg }}
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
              </q-card>
            </q-dialog>
            <td>
              <q-btn color="green" @click="deleteAComplaint(complaint.id)" label="Resolve" />
            </td>
          </tr>
        </tbody>    
      </table>
    </q-card-section>
  </q-card>
</template>

<script>
import { getAllComplaints , deleteComplaint } from '../../api/admin/complaint.js';
export default {
  name: "TableActions",
  created(){
    this.getComplaints()
  },
  data() {
    return {
      complaintList: [],
      showdialog: [],
    }
  },
  methods:{

    openModal(id){
      this.selected_row = row;
      this.icon=true;
    },
    
    deleteAComplaint(id){
      deleteComplaint(id)
      .then(res => {
         this.$q.notify({
          type: 'info',
          message: 'Complaint Resolved Successfully'
         })
      })
      .catch(err => {
        this.$q.notify({
          type: 'negative',
          message: 'Error in resolving complaint'
         })
      })
    },
    getComplaints(){
      getAllComplaints().then(res => {
        
        this.complaintList = res.data.data.data;
    
      });
    }
  }
}
</script>

<style scoped>
</style>

