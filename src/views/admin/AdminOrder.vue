<template>
  <div class="q-pa-md">
    <q-table title="Orders" :rows="rows" :columns="columns">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="primary"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'expand_less' : 'expand_more'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">Order Summary :</div>
            <div>
              <div class="product-expand-list">
                <img
                  :src="props.row.Products.productImage[0]"
                  alt="product"
                  width="100"
                  height="100"
                />
                <div style="margin: 0 15px">
                  <div>
                    Product :<span class="text-bold">{{
                      props.row.Products.productName
                    }}</span>
                  </div>
                  <div>
                    Product ID:
                    <span class="text-bold">{{
                      props.row.Products.productId
                    }}</span>
                  </div>
                  <div>
                    Quantity:
                    <span class="text-bold">{{
                      props.row.Products.quantity
                    }}</span>
                  </div>
                  <div>
                    Price :<span class="text-bold">{{
                      props.row.Products.price
                    }}</span>
                  </div>
                </div>

                <div
                  style="white-space: pre-line; margin-left: 15px; width: 20%"
                >
                  <span class="text-bold">Shipping Address :</span>
                  {{ props.row.OrderProduct.Address.houseNo }}
                  {{ props.row.OrderProduct.Address.landmark }}
                  {{ props.row.OrderProduct.Address.city }}
                  {{ props.row.OrderProduct.Address.country }}
                  {{ props.row.OrderProduct.Address.state }}
                  {{ props.row.OrderProduct.Address.pincode }}
                </div>
              </div>
              <q-separator />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
const columns = [
  {
    name: "orderId",
    label: "OrderID",
    align: "left",
    field: "orderId",
    sortable: true,
  },
  {
    name: "status",
    label: "Order Status",
    align: "left",
    field: "trackingStatus",
    sortable: true,
  },
  {
    name: "orderValue",
    align: "center",
    label: "OrderValue ₹",
    format: (row) => `${row}₹`,
    field: "price",
    sortable: true,
  },
  {
    name: "Payment",
    align: "center",
    label: "Payment Method",
    field: (row) => `${row.OrderProduct.paymentType}`,
    sortable: true,
  },
  {
    name: "Seller",
    align: "center",
    label: "Seller",
    field: (row, value) => `${row.Sellers.firstName}${row.Sellers.lastName}`,
    sortable: true,
  },
  {
    name: "Contact",
    align: "center",
    label: "Seller Contact",
    field: (row, value) => `${row.Sellers.contactNo}`,
    sortable: true,
  },
];

import { getAllOrders } from "../../api/admin/orders";
export default {
  created() {
    getAllOrders()
      .then((res) => {
       
        this.rows = res.data.data;
      })
      .catch((err) => {
        this.$q.notify({
          type: "negative",
          message: "Error while fetching",
        });
      });
  },
  data() {
    return {
      rows: [],
      columns,
    };
  },
};
</script>

<style>
.product-expand-list {
  display: flex;
  margin: 8px;
}
</style>
