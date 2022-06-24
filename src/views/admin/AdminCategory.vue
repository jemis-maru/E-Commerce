<template>
  <div>
    <div class="category-section">
      <div class="section1 q-ma-sm">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Categories</div>
            
          </q-card-section>
            <q-card-section>
              <q-separator />
              <div class="q-ma-sm">Add Category</div>
                <form @submit.prevent="addCategory">
                  <div>
                  
                      <q-input
                        dense
                        class="q-ma-sm"
                        outlined
                        label="Enter Category"
                        style="width: 400px"
                        v-model="this.form.categoryName"
                      />
                      <q-input
                        dense
                        class="q-ma-sm"
                        outlined
                        label="Enter Desctription"
                        v-model="this.form.description"
                        style="width: 400px"
                      />
                      <input type="file" class="custom-file-input" ref="file" >
                
                  </div>
                  <q-btn type="submit" color="primary" class="q-ma-sm" label="Add Category" />
                </form>
              
            </q-card-section>
          <q-card-section>
            <table style="text-align:left">
              <tr style="color:black">
                <th><b>Category Name</b></th>
                <th><b>Description</b></th>
                <th><b>Edit</b></th>
                <th><b>Delete</b></th>
              </tr>
              <tr v-for="category in categoriesList" :key="category.id" style="text-align:left">
                <td>{{ category.categoryName }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <q-btn
                    color="primary"
                    size="sm"
                    flat
                    icon="edit"
                    @click="openCategoryModal(category.id)"
                  />
                </td>
                <td>
                  <q-btn
                    color="primary"
                    size="sm"
                    flat
                     icon="delete"
                    @click="deleteCategory(category.id)"
                  />
                </td>
              </tr>
            </table>
          </q-card-section>
        </q-card>
      </div>
      <div class="section2 q-ma-sm">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Sub-Categories</div>
          </q-card-section>
          <q-card-section>
             <q-separator />
            <div class="q-ma-sm">Add Sub-Category</div>
            <div>
           
              <form @submit.prevent="addSubCategory">
                <q-select
                  dense
                  class="q-ma-sm"
                  outlined
                  emit-value
                  map-options
                  v-model="this.subCategoty.categoryId"
                  :options="options"
                  style="width: 400px"
                  label="Select Category"
                />
                <q-input
                  dense
                  class="q-ma-sm"
                  v-model="this.subCategoty.subCategoryName"
                  outlined
                  label="Enter Sub Category"
                  style="width: 400px"
                />
                <q-input
                  dense
                  v-model="this.subCategoty.description"
                  class="q-ma-sm"
                  outlined
                  label="Enter Description"
                  style="width: 400px"
                />
            
                <q-btn
                  type="submit"
                  color="primary"
                  class="q-ma-sm"
                  label="Add SubCategory"
                />
                            
              </form>
          </div>
          </q-card-section>
          
          <q-card-section>
            <table style="text-align:left">
              <tr style="color:black">
                <th><b>Sub Category Name</b></th>
                <th><b>Description</b></th>
                <th><b>Edit</b></th>
                <th><b>Delete</b></th>
              </tr>
              <tr v-for="category in subCategoriesList" :key="category.id" style="text-align:left">
                <td>{{ category.subCategoryName }}</td>
                <td>{{ category.description }}</td>
                <td>
                  <q-btn
                    color="primary"
                    size="sm"
                    flat
                    icon="edit"
                    @click="openCategoryModal(category.id)"
                  />
                </td>
                <td>
                  <q-btn
                    color="primary"
                    size="sm"
                    flat
                     icon="delete"
                    @click="deleteSubCategory(category.id)"
                  />
                </td>
              </tr>
            </table>
           </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog @hide="onCloseDialog" @show="onOpenDialog" v-model="showDialogSubCategory">
     
            <q-card>
              <div class="q-ma-sm">Add Category</div>
              <q-card-section>
                <div>
                  <q-select
                    dense
                    class="q-ma-sm"
                    outlined
                    v-model="model"
                    :options="options"
                    style="width: 400px"
                    label="Select Category"
                  />
                  <q-input
                    dense
                    class="q-ma-sm"
                    outlined
                    label="Enter Sub Category"
                    style="width: 400px"
                  />
                
                  <q-btn
                    color="primary"
                    class="q-ma-sm"
                    label="Add SubCategory"
                  />
                </div>
              </q-card-section>
            </q-card>
    </q-dialog>
    <q-dialog @hide="onCloseDialog" @show="onOpenDialog" v-model="showDialogCategory">
          <q-card  class="q-ma-sm">
            <form @submit.prevent="updateCategory">
                  <div>
                  
                      <q-input
                        dense
                        class="q-ma-sm"
                        outlined
                        label="Enter Category"
                        style="width: 400px"
                        v-model="this.category.categoryName"
                      />
                      <q-input
                        dense
                        class="q-ma-sm"
                        outlined
                        label="Enter Desctription"
                        v-model="this.category.description"
                        style="width: 400px"
                      />
                      <input type="file" class="custom-file-input" ref="file1" >
                      
                  
                  </div>
                  <q-btn type="submit" color="primary" class="q-ma-sm" label="Upate Category" />
                </form>
          </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { postCategory, getAllCategoriesByQuery ,deleteSubcategory,deleteCategory, getAllCategories, getCategoryById , updateCategory, addSubCategory,getAllSubcategories ,postSubcategory } from '../../api/category.js';
export default {
  name: "AdminCategory",
  created() {
    this.allCategories()
    this.getAllCategoriesByQuery()
    this.allSubCategories()
  },
  data() {
    return {
      form: {
        categoryName: "",
        description: "",
        imagePath: ""
      },
      category: {
        id: "",
        categoryName: "",
        description: "",
        imagePath: ""
      },
      subCategoty: {
        subCategoryName:"xyzMobile",
        description:"Mobile sub category",
        categoryId:""
      },
      rows:[],
      selectCategory: "",
      categoriesList: [],
      subCategoriesList: [],
      rows2:[],
      columns:[],
      Options:[],
      columns2:[],
      OptionsAll:[],
      showDialog: false,
      showDialogSubCategory: false,
      showDialogCategory: false,
      file_path: "",
    }
  },
  methods: {
    
    addCategory() {
      
      const fileData = new FormData()
     
      fileData.append('imagePath', this.$refs.file.files[0])
      fileData.append('categoryName', this.form.categoryName)
      fileData.append('description', this.form.description)
    
      
      
      postCategory(fileData).then(res => {
       
        this.$q.notify({
          type: "positive",
          message: "Category Added Successfully"
        });
        this.getAllCategoriesByQuery()
      })
      .catch(err => {
        
        this.$q.notify({
          type: "negative",
          message: "Category Not Added|Please Try Again"
        });
      });

    },
    allCategories(){
      getAllCategories().then(res => {
       
        this.categoriesList = res.data.data.data;
       
      })
      .catch(err => {
        console.log(err);
      });
    },
    deleteCategory(id){
      
      deleteCategory(id).then(res => {
        
        this.$q.notify({
           type: "positive",
          message: "Category Deleted Successfully"
        });
        this.getAllCategoriesByQuery()
      })
      .catch(err => {
       
        this.$q.notify({
          type: "negative",
          message: "Category Not Deleted|Please Try Again"
        });
      });
    
    },
    openCategoryModal(id){
      this.showDialogCategory = true;
      this.category.id = id;
    },
    openSubCategoryModal(id){
      this.showDialogSubCategory = true;
    },
    onCloseDialog() {
     
     this.category.categoryName = ""
     this.category.description = ""
    },
    onOpenDialog() {
      getCategoryById(this.category.id).then(res => {
        
        this.category.categoryName = res.data.data.editData.categoryName;
        this.category.description = res.data.data.editData.description;
      
      })
      .catch(err => {
        console.log(err);
      });
    },
    updateCategory(){
      const fileData = new FormData()
     
      fileData.append('imagePath', this.$refs.file1.files[0])
      fileData.append('categoryName', this.category.categoryName)
      fileData.append('description', this.category.description)
      fileData.append('id', this.category.id)

      updateCategory(fileData).then(res => {
        
        this.$q.notify({
          type: "positive",
          message: "Category Updated Successfully"
        });
        this.getAllCategoriesByQuery()
        this.showDialogCategory = false;
      })
      .catch(err => {
        
        this.$q.notify({
          type: "negative",
          message: "Category Not Updated|Please Try Again"
        });
      });
    },
    getAllCategoriesByQuery(){
      getAllCategoriesByQuery().then(res => {
       
        this.OptionsAll = res.data.data;
        
      })
      .catch(err => {
      
      });
    },
    allSubCategories(){
      getAllSubcategories().then(res => {
        this.subCategoriesList = res.data.data.data;
        
      })
    },
    addSubCategory(){
      
      postSubcategory(this.subCategoty).then(res => {
       
        this.$q.notify({
          type: "positive",
          message: "Sub Category Added Successfully"
        });
        this.allSubCategories()
      })
      .catch(err => {
      
        this.$q.notify({
          type: "negative",
          message: "Sub Category Not Added|Please Try Again"
        });
      });
    },
    deleteSubCategory(id){
      deleteSubcategory(id).then(res => {
      
        this.$q.notify({
           type: "positive",
          message: "Sub Category Deleted Successfully"
        });
        this.allSubCategories()
      })
      .catch(err => {
       
        this.$q.notify({
          type: "negative",
          message: "Please Try Again"
        });
      });
    
    },

  },
  computed: {
     options(){
      return this.OptionsAll.map(item => {
       
        return {
          label: item.categoryName,
          value: item.id
        }
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
  flex: 1 0 45%;
}
.section2 {
  flex: 1 0 45%;
}
@media screen and (max-width: 992px) {
  .category-section {
    flex-direction: column;
  }
  .section1 {
    flex: 1 0 90%;
  }
  .section2 {
    flex: 1 0 90%;
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
  margin: 0px 10px 0 0;
  background-color: #1976d2;
  margin-bottom: 10px;
}
select {
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 0 8px auto 0;
  margin-bottom: 10px;
}
input[type="file"] {
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 0 8px auto 5px;
  margin-bottom: 10px;
}
</style>