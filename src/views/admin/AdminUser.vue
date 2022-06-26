<template>
  <q-card>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure to delete user?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="cancelDelete" color="primary" v-close-popup />
          <q-btn flat label="Delete" @click="confirmDelete" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card-section>
      <div class="text-h6 text-black">Users</div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table style="box-shadow: none" :rows="data" :columns="columns">
        <template v-slot:body-cell-FirstName="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.firstName }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn
              size="sm"
              icon="block"
              color="negative"
              label="Block"
              class="text-primary text-weight-bold"
              @click="blockMethod(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import { getAllUsers } from "../../api/user/user.js";
import { deleteUser } from "../../api/user/user.js";

export default {
  name: "TableActions",
  data() {
    return {
      data: [],
      confirm: false,
      userId: '',
      columns: [
        {
          name: "FirstName",
          label: "First Name",
          field: "name",
          sortable: true,
          align: "center",
        },
        {
          name: "Last Name",
          label: "Last Name",
          field: "lastName",
          sortable: true,
          align: "center",
        },
        {
          name: "Email",
          label: "Email",
          field: "email",
          sortable: true,
          align: "left",
        },
        {
          name: "Role",
          label: "Role",
          field: "role",
          sortable: true,
          align: "left",
        },
        {
          name: "Action",
          label: "Action",
          field: "Action",
          sortable: false,
          align: "center",
        },
      ],
    };
  },

  methods: {
    blockMethod(param) {
      this.userId = param;
      this.confirm = true;
    },
    confirmDelete(){
      deleteUser(this.userId)
        .then((response) => {
          this.$q.notify({
            type: "positive",
            icon: "done",
            message: "User deleted Successfully",
          });
          this.userId = '';
        })
        .catch((error) => {
          this.$q.notify({
            type: "nagative",
            message: "User does not deleted",
          });
          this.userId = '';
        });
    },
    cancelDelete(){
      this.userId = '';
    }
  },

  created() {
    return new Promise((resolve, reject) => {
      getAllUsers()
        .then((response) => {
          return response.data.data.data;
        })
        .then((data) => {
          this.data = data;
          resolve(data);
        })
        .catch((data, error) => {
          reject(error);
        });
    });
  },
};
</script>

<style scoped>
.q-td {
  max-width: 500px;
}
</style>

