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
          <q-tab
            name="peding"
            icon="pending_actions"
            label="pending Product Approval"
          />
          <q-tab name="verified" icon="verified" label="All Products" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="verified">
            <div class="text-h6">All Listed Products</div>
            <q-table
              style="box-shadow: none"
              row-key="productName"
              flat
              :rows="allProducts"
              :columns="approveColumn"
             
            >
              <template v-slot:body-cell-productImage="props">
                <q-td :props="props">
                  <q-item style="max-width: 420px">
                    <q-item-section avatar>
                     
                        <img width="100" height="100" alt="Image" :src="props.row.productImage" />
                     
                     </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ props.row.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <template v-slot:body-cell-productDesc="props">
                <q-td
                  :props="props"
                  style="width: 500px; white-space: pre-line"
                >
                  <q-item style="width: 250px; white-space: pre-line">
                    <q-item-section>
                      <q-item-label>{{ props.row.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <template v-slot:body-cell-categories="props">
                <q-td
                  :props="props"
                  style="width: 100px; white-space: pre-line"
                >
                  <q-item style="width: 100px; white-space: pre-line">
                    <q-item-section>
                      <q-item-label
                        >{{ props.row.brand.brandName }}
                        {{ props.row.subcategory.subCategoryName }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="peding">
            <div>
              <div class="text-h6" style="margin: 0 0 20px 0">
                Pending Product Requests
              </div>
            </div>
            <q-table
              style="box-shadow: none"
              row-key="productName"
              flat
              :rows="data"
              :columns="columns"
              
            >
              <template v-slot:body-cell-productImage="props">
                <q-td :props="props">
                  <q-item style="width: 100px">
                    <q-item-section avatar>

                        <img width="100" :src="props.row.productImage" alt="Image" />
                      </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <template v-slot:body-cell-commission="props">
                <q-td :props="props">
                  <q-item style="width: 130px">
                    <q-item-section>
                      <q-item-label><q-input type="number" max="50" min="0" outlined label="commission" v-model="props.row.commission"  ></q-input></q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <template v-slot:body-cell-productDesc="props">
                <q-td
                  :props="props"
                  style="width: 250px; white-space: pre-line"
                > 
                  <q-item style="width: 500px; white-space: pre-line">
                    <q-item-section>
                      <q-item-label>{{ props.row.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <template v-slot:body-cell-categories="props">
                <q-td
                  :props="props"
                  style="width: 100px; white-space: pre-line"
                >
                  <q-item style="width: 100px; white-space: pre-line">
                    <q-item-section>
                      <q-item-label
                        >{{ props.row.brand.brandName }}
                        {{ props.row.subcategory.subCategoryName }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-td>
              </template>
              <template v-slot:body-cell-Action="props">
                <q-td :props="props">
                  <q-btn
                    icon="task_alt"
                    size="sm"
                    @click="approveProduct(props.row.id,props.row.commission)"
                    class="bg-green text-white text-weight-bold"
                  />
                  <q-btn
                    icon="delete"
                    size="sm"
                    @click="rejectProduct(props.row.id,props.row.commission)"
                    class="q-ml-sm bg-red text-white text-weight-bold"
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

const columns = [
  {
    name: "productName",
    label: "productName",
    field: "productName",
    sortable: true,
    align: "left",
  },
  {
    name: "productImage",
    label: "productImage",
    field: "productImage",
    align: "left",
  },
  {
    name: "categories",
    label: "categories",
    field: (row) => row.brand.brandName + "/" + row.subcategory.subCategoryName,
    format: (val, row) => `${row.brand.brandName}/${row.subcategory.subCategoryName}`,
    sortable: false,
    align: "center",
  },

  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
    sortable: true,
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    sortable: true,
    align: "left",
  },

  {
    name: "productDesc",
    label: "Description",
    field: "description",
    sortable: false,
    align: "center",
  },
  { name: "commission", label: "Comission (in %)", field: "commission", format:(val , row) => Number(row) , align: "center" },
  {
    name: "Action",
    label: "Action",
    field: "Action",
    sortable: false,
    align: "center",
  },
];
const approveColumn = [
  {
    name: "productName",
    label: "productName",
    field: "productName",
    sortable: true,
    align: "left",
  },
  {
    name: "productImage",
    label: "productImage",
    field: "productImage",
    align: "left",
  },
  {
    name: "categories",
    label: "categories",
    field: (row) => row.brand.brandName + "/" + row.subcategory.subCategoryName,
    format: (val, row) => `${row.brand.brandName}/${row.subcategory.subCategoryName}`,
    sortable: false,
    align: "center",
  },

  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
    sortable: true,
    align: "left",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    sortable: true,
    align: "left",
  },
  { name: "commission", label: "Comission (in %)", field: "commission", align: "center" },
  {
    name: "productDesc",
    label: "Description",
    field: "description",
    sortable: false,
    align: "center",
  },
];

import { getAllPendingProducts ,getAllApprovedProducts ,rejectPendingProduct,approveProduct } from '../../api/admin/product'
export default {
  name: "TableActions",
  created() {
  this.pendingProducts()
  this.getApproveProducts()
  },
  data() {
    return {
      data:[],
      allProducts:[],
      columns,
      approveColumn,
      commission:[],
      tab: "peding",
      selected: [],
    };
  },
  methods:{
    approveProduct(id,commission){
      
      const data = {
        commission: commission,
        id:id
      }
      approveProduct(data)
      .then(res =>{
        this.$q.notify({
          type: "positive",
          message:"Approved Successfully"
        })
        this.pendingProducts()
        this.getApproveProducts()
      })
      .catch((err)=>{
        this.$q.notify({
          type:"negative",
          message:"Something went wrong"

        })
      })
    },
    rejectProduct(id,commission){
      
      const data = {
        id:id,
        commission: commission,
      }
       rejectPendingProduct(data)
       .then(res =>{
        this.$q.notify({
          type: "positive",
          message:"rejected successfully"
        })
        this.pendingProducts()
      })
      .catch((err)=>{
        this.$q.notify({
          type:"negative",
          message:"Something went wrong"

        })
      })
    },
    pendingProducts(){
      getAllPendingProducts()
      .then(res =>{
        
        this.data = res.data.data.data
        
      })
      .catch((err)=>{
        this.$q.notify({
          type:"negative",
          message:"Something went wrong"

        })
      })
    },
    getApproveProducts(){
      getAllApprovedProducts()
      .then(res =>{
     
        this.allProducts = res.data.data.data
        
      })
      .catch((err)=>{
        this.$q.notify({
          type:"negative",
          message:"Something went wrong"

        })
      })
    }

  }
};
</script>
