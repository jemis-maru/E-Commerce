<template>
  <div class="q-pa-md">
    <q-table title="Orders" :rows="rows" :columns="columns">
     <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
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
           
          <q-td auto-width>
                  <q-select style="width:150px" map-options emit-value square outlined label="Change Status" @update:model-value="changeStatus(props.row.productId,props.row.orderId,props.row.id)" v-model="status[props.row.id]" :options="options" />
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
  {
    name: "action",
    align: "center",
    label: "Change Status",
    field: "trackingStatus",
    sortable: true,
  },
];

import { getAllOrders, changeOrderStatus } from "../../api/orders";
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
      options: ['Confirmed', 'Shipped', 'OutForDelivery', 'Delivered', 'Cancel'],
      columns,
      status:{}
    };
  },
  methods: {
    changeStatus(productId,orderId,id){
     
      const payload = {
        trackingStatus:this.status[id],
        productId:productId,
        orderId:orderId
      }
     
      changeOrderStatus(payload)
      .then((res) =>{
        this.$q.notify({
          type:'positive',
          message:'Order Status Changed!'
        })
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
      })
      .catch((err) =>{
        this.$q.notify({
          type:'negative',
          message:'Something Went Wrong!'
        })
      })
    }
  }
};
</script>

<style>
.product-expand-list {
  display: flex;
  margin: 8px;
}
.q-table th{
  border: none;
}
</style>
