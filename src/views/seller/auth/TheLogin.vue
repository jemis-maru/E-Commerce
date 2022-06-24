<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-black">Complaints</div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table
        style="box-shadow: none"
        :rows="data"
        :columns="columns"
        hide-bottom
      >
        <template v-slot:body-cell-Status="props">
          <q-td :props="props">
            <div>
              <q-badge :label="props.value" />
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-Content="props">
          <q-td :props="props">
            <q-btn label="View" flat color="primary" />
          </q-td>
          <q-dialog v-model="icon">
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Complaints</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                {{ selected_row }}
              </q-card-section>
            </q-card>
          </q-dialog>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <q-btn-dropdown color="primary" label="Change Status">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Packing</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>In Progress</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Delivered</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
const data = [
  {
    Orderid: 1,
    Productname: "Zara Clothing",
    quantity: "3",
    UserId: "736532",
    Price: "30$",
    status: "No",
  },
  {
    Orderid: 2,
    Productname: "Mara Clothing",
    quantity: "3",
    UserId: "736532",
    Price: "30$",
    status: "No",
  },
];
const columns = [
  {
    name: "ID",
    label: "OrderId",
    field: "Orderid",
    sortable: true,
    align: "left",
  },
  {
    name: "Email",
    label: "Productname",
    field: "Productname",
    sortable: true,
    align: "left",
  },
  {
    name: "Title",
    label: "quantity",
    field: "quantity",
    sortable: true,
    align: "left",
  },
  {
    name: "Status",
    label: "UserId",
    field: "UserId",
    sortable: true,
    align: "left",
  },
  {
    name: "Status",
    label: "Price",
    field: "Price",
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
  {
    name: "Status",
    label: "Is_return",
    field: "status",
    sortable: true,
    align: "left",
  },
];
export default {
  name: "TableActions",
  data() {
    return {
      data,
      columns,
      icon: false,
      selected_row: "hello",
    };
  },
  methods: {
    
  },
};
</script>

<style scoped></style>
