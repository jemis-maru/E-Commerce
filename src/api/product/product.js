import axios from '../request.js';

export function getAllProducts(param){
  if(param){
    return axios({
        url: "/product/guest?page="+param,
        method: "get",
      })
  }
  else{
    return axios({
      url: "/product/guest",
      method: "get",
    })
  }
}

export function getProduct(prodId){
  return axios({
      url: "/product/"+prodId,
      method: "get",
  })
}
export function getAllProductsByQuery(searchWord){
  return axios({
      url: "/product/guest?status=true&searchWord=" + searchWord,
      method: "get",
    })
}

export function getFilterProducyOnScroll(page, searchWord){
  return axios({
      url: "/product/guest?status=true&page="+ page + "searchWord=" + searchWord,
      method: "get",
    })
}


export function filterProducts(page, count, sortBy, sortOrder, searchWord){
  return axios({
      url: "/product/guest?status=true&page=" + page + "&count="+ count+ "&sortBy="+ sortBy+ "&sortOrder="+ sortOrder+ "&searchWord="+ searchWord,
      method: "get",
    })
}