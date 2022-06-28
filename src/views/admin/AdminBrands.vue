<template>
  <div class="section1 q-ma-sm">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Brand Name</div>
      </q-card-section>
      <div>
      
        <form @submit.prevent="addBrand">
          <q-input
            dense
            class="q-mx-xl q-my-sm"
            outlined
            v-model="brand.brandName"
            label="Brand Name"
            style="max-width: 300px;width:100%;"
          />
          <q-input
            dense
            class="q-mx-xl q-my-sm"
            outlined
            v-model="brand.description"
            label="Brand Description"
            style="max-width: 300px; width:100%;"
          />
       
          <q-btn
            color="primary"
            class="q-mx-xl"
            label="Add Brand"
            type="submit"
          />
        </form>
      </div>
      <q-card-section style="overflow-x: scroll;">
        <q-list>
          <q-item>
            <q-item-section>
               <table style="text-align:left">
              <tr style="color:black">
                <th><b>Brand Name</b></th>
                <th><b>Description</b></th>
                <th><b>Edit</b></th>
                <th><b>Delete</b></th>
              </tr>
              <tr v-for="category in allBrands" :key="category.id" style="text-align:left">
                <td>{{ category.brandName }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <q-btn
                    color="primary"
                    size="sm"
                    flat
                    icon="edit"
                    @click="openBrandModal(category.id)"
                  />
                </td>
                <td>
                  <q-btn
                    color="primary"
                    size="sm"
                    flat
                     icon="delete"
                    @click="deleteBrand(category.id)"
                  />
                </td>
              </tr>
            </table>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-dialog @hide="onCloseDialog" @show="onOpenDialog" v-model="showDialog">
      <q-card>
        <div class="q-ma-sm text-h6">Update Brand</div>
        <q-card-section>
          <form @submit.prevent="updateBrand">
          <q-input
            dense
            class="q-mx-md q-my-sm"
            outlined
            v-model="brand.brandName"
            label="Brand Name"
            style="width: 300px"
          />
          <q-input
            dense
            class="q-mx-md q-my-sm"
            outlined
            v-model="brand.description"
            label="Brand Description"
            style="width: 300px"
          />
  
          <q-btn
            color="primary"
            class="q-mx-md"
            label="Update Brand"
            type="submit"
          />
        </form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { getAllBrands,getBrandById,postBrand,updateBrand,deleteBrand } from '../../api/category.js'
export default {
  created(){
    this.getAllBrands()
  },
  data(){
    return {
      showDialog: false,
      brand:{
        id:'',
        brandName: '',
        description: ''
      },
      allBrands: [],


  }
  },
  methods: {
    openBrandModal(id){
      this.showDialog = true ;
  
      this.brand.id = id;
    },
    onCloseDialog(){
      this.showDialog = false;
      this.brand.brandName ="",
      this.brand.description =""
      },
      onOpenDialog(){
       
        getBrandById(this.brand.id).then(res=>{
          
          this.brand.brandName = res.data.data.editData.brandName;
          this.brand.description = res.data.data.editData.description;
        })

      },
     getAllBrands(){
      getAllBrands()
      .then(res=>{
        
        this.allBrands = res.data.data
      })
      .catch(err=>{
        this.$q.notify({
          type: 'negative',
          message: 'Something went wrong!'})
      })
  },

  addBrand(){
    postBrand(this.brand)
    .then(res=>{
      this.getAllBrands()
      this.$q.notify({
        type: 'positive',
        message: 'Brand Added Successfully'
      })
    })
    .catch(err=>{
      this.$q.notify({
        type: 'negative',
        message: 'Something went wrong!'
      })
    })
  },
  updateBrand(){
    updateBrand(this.brand)
    .then(res=>{
      this.getAllBrands()
      this.$q.notify({
        type: 'positive',
        message: 'Brand Updated Successfully'
      })
      this.brand.brandName ="",
      this.brand.description =""
      this.showDialog = false
    })
    .catch(err=>{
      this.$q.notify({
        type: 'negative',
        message: 'Something went wrong!'
      })
    })
  },
  deleteBrand(id){
    deleteBrand(id)
    .then(res=>{
      this.getAllBrands()
      this.$q.notify({
        type: 'positive',
        message: 'Brand Deleted Successfully'
      })
    })
    .catch(err=>{
      this.$q.notify({
        type: 'negative',
        message: 'Something went wrong!'
      })
    })
  }
}
}

</script>

<style>
.category-section {
  display: flex;
}
.section1 {
  flex: 1 0 50%;
}
.section2 {
  flex: 1 0 50%;
}
@media screen and (max-width: 992px) {
  .category-section {
    flex-direction: column;
  }
  .section1 {
    flex: 1 0 100%;
  }
  .section2 {
    flex: 1 0 100%;
  }
}

.input-category {
  /* width: 300px; */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 0 8px auto 0;
  margin-bottom: 10px;
}
.input-category-btn {
  width: 100px;
  border: 1px solid rgb(39, 42, 228);
  color: rgb(255, 255, 255);
  border-radius: 5px;
  padding: 10px;
  margin: 8px 10px 0 0;
  background-color: #1976d2;
  margin-bottom: 10px;
}
#category {
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 0 8px auto 0;
  margin-bottom: 10px;
}
</style>