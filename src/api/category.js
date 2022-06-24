import axios from './request'

// categories API

export function getAllCategories(){
    return axios({
        url: "/category",
        method: "get"
      })
}

export function getAllCategoriesByQuery(){
  return axios({
      url: "/category?all=true",
      method: "get"
    })
}

export function getCategoryById(id){
    return axios({
        url: "/category/"+id,
        method: "get"
      })
}

export function postCategory(data){
    return axios({
        url: "/category",
        method: "post",
        data
      })
}

export function updateCategory(data){
    return axios({
        url: "/category",
        method: "put",
        data
      })
}

export function deleteCategory(id){
    return axios({
        url: "/category/"+id,
        method: "delete",
      })
}

//subcategories API

export function getAllSubcategories(){
    return axios({
        url: "/subcategory",
        method: "get"
      })
}

export function getSubcategoryById(id){
    return axios({
        url: "/subcategory/"+id,
        method: "get"
      })
}

export function postSubcategory(data){
    return axios({
        url: "/subcategory",
        method: "post",
        data
      })
}

export function updateSubcategory(data){
    return axios({
        url: "/subcategory",
        method: "put",
        data
      })
}

export function deleteSubcategory(id){
    return axios({
        url: "/subcategory/"+id,
        method: "delete",
      })
}
//brands API

export function getAllBrands(){
    return axios({
        url: "/brand?all=true",
        method: "get"
      })
}

export function getBrandById(id){
    return axios({
        url: "/brand/"+id,
        method: "get"
      })
}

export function postBrand(data){
    return axios({
        url: "/brand",
        method: "post",
        data
      })
}

export function updateBrand(data){
    return axios({
        url: "/brand",
        method: "put",
        data
      })
}

export function deleteBrand(id){
    return axios({
        url: "/brand/"+id,
        method: "delete",
      })
}