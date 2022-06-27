<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="row">
      <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
        <q-space />
        <!-- Add item button start-->
        <q-btn
          icon="add"
          label="add item"
          @click="fixed = true"
          ze="sm"
          class="q-ml-sm"
        />
        <!-- Add item button end-->

        <!-- pending item and approve item toggle button start -->
        <q-btn
          icon="verified"
          :label="showApproved == false ? 'Pending ITems' : 'approve items'"
          @click="showData()"
          ze="sm"
          class="q-ml-sm"
        />
        <!-- pending item and approve item toggle button end -->

        <!-- Add Item dialog open -->
        <q-dialog v-model="fixed">
          <q-card>
            <q-card-section>
              <label>product Name</label>
              <q-input type="text" outlined v-model="pName" />
              <p v-if="!pName">Please enter product name</p>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <label>description</label>
              <q-input type="textarea" outlined v-model="pDes" />
              <p v-if="!pDes">Please enter product Description</p>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-separator />
              <label>productImage</label>

              <q-file
                dense
                v-model="pimage"
                label="Please select image"
                outlined
                accept="image/*"
                class="q-ma-sm"
                max-file-size="1048576"
                style="max-width: 200px"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <label>price</label>
              <q-input type="number" outlined v-model="Price" />
              <p v-if="!Price">Please enter product price</p>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <label>quantity</label>
              <q-input type="number" outlined v-model="quant" />
              <p v-if="!quant">Please enter product quantity</p>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <q-select
                emit-value
                map-options
                outlined
                :options="subcatogaryList"
                v-model="SubCat"
                label="select Sub-category"
              ></q-select>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-select
                emit-value
                map-options
                outlined
                :options="brandList"
                v-model="brandid"
                label="select brand"
              ></q-select>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="Red" v-close-popup />
              <q-btn
                flat
                label="Add"
                color="info"
                @click="postProduct"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <!-- Add Item dialog close -->

      <!-- View data dialog open -->
    </q-card-section>
    <q-dialog v-model="basic1">
      <q-card>
        <q-card-section>
          <q-img class="imageofqview" :src="modalData.productImage[0]" />
        </q-card-section>
        <q-card-section>
          <label class="text-justify text-bold">Prodcutname</label>
          <p>{{ modalData.productName }}</p>
        </q-card-section>
        <q-card-section>
          <label class="text-justify text-bold">Product Description</label>
          <p>{{ modalData.description }}</p>
        </q-card-section>
        <q-card-section>
          <label class="text-justify text-bold">Price</label>
          <p>{{ modalData.price }}</p>
        </q-card-section>
        <q-card-section>
          <label class="text-justify text-bold">Quantity</label>
          <p>{{ modalData.quantity }}</p>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="Red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- View data dialog close -->

    <!-- landing seller page open -->
    <q-card-section class="q-mx-sm">
      <div class="row q-col-gutter-lg">
        <div 
          class="outercard col-lg-3 col-sm-12 col-xs-12 col-md-3"
          v-for="data in viewData"
          :key="data"
        >
          <q-card style="background-color: white; position: relative;" class="text-black" >
            <q-btn label="Add Quantity" @click="openDialog(data)" flat icon="add" style="position:absolute; top:0; right:0; z-index:100; color:red; background-color: azure;" />
            <q-img class="imageofq" :src="data.productImage" height="100" />
            <q-separator></q-separator>
            <q-card-section
              class="text-h5 text-center text-uppercase"
              maxlength="4"
            >
              <h4>{{ data.productName }}</h4>
            </q-card-section>
            <q-card-section class="text-justify text-bold">
              <label>Quantity</label>
              <div>
                {{ data.quantity }}
              </div>
            </q-card-section>
            <q-card-section class="text-justify text-bold">
              <label>Price</label>
              <div>${{ data.price }}</div>
            </q-card-section>
            <!-- landing seller page close -->

            <!-- View item button start-->
            <q-card-actions align="around" class="text-subtitle1">
              <q-btn
                label="View"
                color="primary"
                @click="modalFunction(data)"
              />
              <!-- View item button end-->

              <!-- update Item button start -->
              <div class="float-right">
                <q-btn
                  label="update"
                  color="secondary"
                  @click="modalFunction2(data)"
                />
              </div>
              <!-- update Item button close -->

              <!-- delete item button open -->
              <div class="float-right">
                <q-btn
                  label="delete"
                  color="red"
                  @click="deleteProductData(data.id)"
                />
              </div>
              <!-- delete item button close -->
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-card-section>
    <!-- update Item dialog open -->
    <q-dialog v-model="basic">
      <q-card>
        <q-card>
          <q-card-section>
            <label>product Name</label>
            <q-input type="text" outlined v-model="modalData2.productName" />
            <p v-if="!pName">Please enter product name</p>
          </q-card-section>

          <q-separator />
          <q-card-section>
            <label>description</label>
            <q-input
              type="textarea"
              outlined
              v-model="modalData2.description"
            />
            <p v-if="!pDes">Please enter product Description</p>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-separator />
            <label>productImage</label>

            <q-file
              dense
              v-model="modalData2.productImage[0]"
              label="Please select image"
              outlined
              accept="image/*"
              class="q-ma-sm"
              max-file-size="1048576"
              style="max-width: 200px"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>

            <q-separator />
            <q-card-section>
              <label>price</label>
              <q-input type="number" outlined v-model="modalData2.price" />
              <p v-if="!Price">Please enter product price</p>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <label>quantity</label>
              <q-input type="number" outlined v-model="modalData2.quantity" />
              <p v-if="!quant">Please enter product quantity</p>
            </q-card-section>
               <q-separator />
               <q-card-section>
                <q-select emit-value map-options outlined :options="subcatogaryList" v-model="modalData2.SubCat" label="select Sub-Category" ></q-select>
               </q-card-section>
               <q-separator />
               <q-card-section>
                <q-select emit-value map-options outlined :options="brandList" v-model="modalData2.brandid" label="select Brand" ></q-select>
               </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="Red" v-close-popup />
              <q-btn
                flat
                label="Add"
                color="info"
                @click="updateProduct"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
                  </q-card>
                </q-dialog>
    <q-dialog v-model="showDialog">
      <q-card style="height:30%">
        <q-card-section>
          <q-input type="number" v-model="product.quantity" label="Add Updated Quantity*" outlined />
          <q-btn @click="updateQuantity()" label="ADD Quantity" class="q-my-md" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

import {
  addProduct,
  deleteProduct,
  getapproveProduct,
  getpendingProduct,
  updateproduct,
  getAllBrands,
  getAllSubcategories,
  updateProductQuantity
} from "../../api/product";

export default defineComponent({
  name: "BasicFilter",
  data() {
    return {
      type: "All",
      showApproved: true,
      basic: false,
      basic1: false,
      fixed: false,
      modalData: {},
      modalData2: {
        SubCat: "",
        brandid: "",
      },
      viewData: [],
      brandList: [],
      subcatogaryList: [],
      pName: "",
      pId: "",
      pDes: "",
      SubCat: "",
      Price: "",
      product:{
        id:"",
        quantity:""
        
      },
      quant: "",
      pimage: {},
      brandid: "",
      validation: true,
      poroductId: [],
      modalData:{},
      showDialog:false,
    };
  },
  methods: {
    // delete product method
    deleteProductData(id) {
      deleteProduct(id)
        .then((res) => {
         
          this.$q.notify({
            type: "positive",
            message: "Deleted Successfully",
          });
          this.approvefetchProduct();
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: "Something went wrong!",
          });
        });
    },
    //for opening model basic1
    modalFunction(data) {
      this.modalData = data;

      this.basic1 = true;
    },
    //for open model basic
    modalFunction2(data) {
   
      this.modalData2 = data;
      
      this.basic = true;
    },
    //validation method
    validate() {
      if (
        this.pName === " " ||
        this.pDes === "" ||
        this.SubCat === "" ||
        this.pNPriceame === "" ||
        this.quant === "" ||
        this.pimage === {}
      ) {
        this.validation == false;
        return;
      }
    },
    openDialog(data){
      this.showDialog = true
      this.product.id = data.id


    },
    updateQuantity(data){
     
      updateProductQuantity(this.product)
      .then((res)=>{
        this.$q.notify({
          type:"positive",
          message:"Quantity added !!"
        })
      })
      .catch((err)=>{
        this.$q.notify({
          type:"negative",
          message:"Something went wrong while updating!"
        })
      })
    },
    postProduct() {
      const fileData = new FormData();

      fileData.append("productName", this.pName);
      fileData.append("description", this.pDes);
      fileData.append("image", this.pimage);
      fileData.append("price", this.Price);
      fileData.append("quantity", this.quant);
      fileData.append("subCategoryId", this.SubCat);
      fileData.append("brandId", this.brandid);
      addProduct(fileData)
        .then((res) => res)
        .then((res) => {
          this.$q.notify({
            type: "positive",
            message: "Data added successfully",
          });
        })

        .catch((err) => {
       
          this.$q.notify({
            type: "negative",
            message: "something went wrong|Please Try Again",
          });
        });
    },
    //product view method
    showData() {
      if (!this.showApproved) {
        this.approvefetchProduct();
      } else {
        this.pendingfetchProduct();
      }
      this.showApproved = !this.showApproved;
    },
    //for fetching subcat from dropdown
    fetchsubCat() {
      getAllSubcategories()
        .then((res) => {
          const arr = res.data.data;
          this.subcatogaryList = arr.map((item) => {
            return {
              label: item.subCategoryName,
              value: item.id,
            };
          });
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: "Something went wrong!",
          });
        });
    },
    //for fetching  brand from dropdown
    fetchBrand() {
      getAllBrands()
        .then((res) => {
          const arr = res.data.data;
          this.brandList = arr.map((item) => {
            return {
              label: item.brandName,
              value: item.id,
            };
          });
        })
        .catch((err) => {
          this.$q.notify({
            type: "negative",
            message: "Something went wrong!",
          });
        });
    },
    //pending request of product method
    pendingfetchProduct() {
      new Promise((resolve, reject) => {
        getpendingProduct()
          .then((response) => {
            const data = response.data.data.data;
            data.forEach((element) => {
              this.poroductId.push(element.id);
            });
            return response.data.data.data;
          })
          .then((data) => {
            this.viewData = data;
            resolve(data);
          })
          .catch((data, error) => {
           
            reject(error);
          });
      });
    },
    //approve request of product method
    approvefetchProduct() {
      new Promise((resolve, reject) => {
        getapproveProduct()
          .then((response) => {
            const data = response.data.data.data;
            data.forEach((element) => {
              this.poroductId.push(element.id);
            });
            return response.data.data.data;
          })
          .then((data) => {
            this.viewData = data;
            resolve(data);
          })
          .catch((data, error) => {
           
            reject(error);
          });
      });
    },
    //product update method
    updateProduct() {
      const fileData = new FormData();

      fileData.append("productName", this.modalData2.productName);
      fileData.append("description", this.modalData2.description);
      fileData.append("image", this.modalData2.productImage);
      fileData.append("price", this.modalData2.price);
      fileData.append("id", this.modalData2.id);
      fileData.append("quantity", this.modalData2.quantity);
      fileData.append("subCategoryId", this.modalData2.SubCat);
      fileData.append("brandId", this.modalData2.brandid);
      updateproduct(fileData)
        .then((res) => {
          console.log(res);
          this.$q.notify({
            type: "positive",
            message: "Product Updated !!",
          });
          this.approvefetchProduct();
          this.pendingfetchProduct();
        })
        .catch((err) => {
         
          this.$q.notify({
            type: "negative",
            message: "Something went wrong",
          });
        });
    },
  },
  created() {
    this.approvefetchProduct();
    this.pendingfetchProduct();
    this.fetchsubCat();
    this.fetchBrand();
  },
});
</script>

<style scoped>
.q-card {
  width: 100%;
  height: 100%;
  border: 0.1px solid;
}
.outercard:hover {
  opacity: 1;
  transform: scale(1.01);
}

p {
  color: red;
}
.imageofq {
  max-width: 100%;
  height: 200px;
}
.imageofqview {
  max-width: 100%;
  height: 100%;
}
.inputofq {
  display: block;
  position: absolute;
  left: auto;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
