<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="verified" icon="verified" label="Verified Sellers" />
          <q-tab
            name="pending"
            icon="pending_actions"
            label="pending Seller Request"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="verified">
            <div class="text-h6">Sellers</div>
            <q-table
              style="box-shadow: none"
              flat
              :rows="approvedSellers"
              :columns="columns"
            >
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
                    @click="blockMethod(props.row.id)"
                    class="q-ml-sm text-weight-bold"
                  />
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="pending">
            <div class="text-h6">Pending Requests</div>
            <q-table
              style="box-shadow: none"
              flat
              :rows="pendingSellers"
              :columns="columns"
            >
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
                  <div class="q-btn-container">
                    <q-btn
                      icon="task_alt"
                      size="sm"
                      @click="approveSeller(props.row.id)"
                      class="bg-green text-white text-weight-bold"
                      label="Approve"
                    />
                  </div>
                  <div class="q-btn-container">
                    <q-btn
                      icon="delete"
                      size="sm"
                      @click="rejectSeller(props.row.id)"
                      label="Reject"
                      class="bg-red text-white text-weight-bold"
                    />
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { getApprovedSellers, getPendingSellers } from "../../api/sellers.js";

export default {
  name: "TableActions",
  data() {
    return {
      tab: "verified",
      approvedSellers: [],
      pendingSellers: [],
      columns: [
        {
          name: "FirstName",
          label: "First Name",
          field: "firstName",
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
    
  },
  created() {
    new Promise((resolve, reject) => {
      getApprovedSellers()
        .then((response) => {
          
          return response.data.data.data;
        })
        .then((data) => {
        
          this.approvedSellers = data;
          resolve(data);
        })
        .catch((data, error) => {
         
          reject(error);
        });
    });

    new Promise((resolve, reject) => {
      getPendingSellers()
        .then((response) => {
         
          return response.data.data.data;
        })
        .then((data) => {
         
          this.pendingSellers = data;
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
.q-btn-container {
  margin: 4px;
}
</style>