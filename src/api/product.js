import axios from "./request";

export function addProduct(data) {
  return axios({
    url: "/product",
    method: "post",
    data,
  });

  }
  export function getpendingProduct(){
      return axios({
          url:"/product?status=false",
          method:"get"
      })
}
export function getapproveProduct(){
  return axios({
      url:"/product?status=true",
      method:"get"
  })
}
export function updateproduct(data) {
  return axios({
      url: "product/details",
      method: "put",
      data
    })
}
export function getAllSubcategories(){
  return axios({
      url: "/subcategory?all=true",
      method: "get"
    })
}
export function getAllBrands(){
  return axios({
      url: "/brand?all=true",
      method: "get"
    })
}

export function deleteProduct(id){
  return axios({
    url:'/product/'+id,
    method:"delete"
  })
}

export function orderFetch(id){
  return axios({
    url:'/product/'+id,
    method:"delete"
  })
}

export function updateProductQuantity(data){
  return axios({
    url:"/product/quantity",
    method:"put",
    data
  })
}