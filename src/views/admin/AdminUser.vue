<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-black">
        Users
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        style="box-shadow: none"
        :rows="data"
        :columns="columns"
      >
        <template v-slot:body-cell-FirstName="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="props.row.avatar">
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

export default {
  name: "TableActions",
  data() {
    return {
      data: [],
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

