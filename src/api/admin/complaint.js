
import axios from '../request';

export function getAllComplaints(){
    return axios({
        url: "/complaint",
        method: "get"
      })
}

export  function deleteComplaint(id){
    return axios({
        url: "/complaint/"+id,
        method: "delete"
      })
}
