<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm">Are you sure to delete user?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                @click="cancelDelete"
                color="primary"
                v-close-popup
              />
              <q-btn
                flat
                label="Delete"
                @click="confirmDelete"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="verified">
            <div class="titleSeller text-h6">Sellers</div>
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
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { getApprovedSellers, getPendingSellers } from "../../api/sellers.js";
import { deleteUser } from "../../api/user/user.js";

export default {
  name: "TableActions",
  data() {
    return {
      tab: "verified",
      approvedSellers: [],
      pendingSellers: [],
      confirm: false,
      userId: '',
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
            message: "Seller deleted Successfully",
          });
          this.userId = '';
        })
        .catch((error) => {
          this.$q.notify({
            type: "nagative",
            message: "Seller does not deleted",
          });
          this.userId = '';
        });
    },
    cancelDelete(){
      this.userId = '';
    }
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
.titleSeller {
  margin-bottom: 30px;
}
</style>