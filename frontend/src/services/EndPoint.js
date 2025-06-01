import axios from "axios";
export const baseUrl="http://localhost:8080/"
const instance=axios.create({
    baseURL:baseUrl,
    withCredentials:true//yh isiye h taki jitni bhi cookies backend seh arahi h wh yh accept karega,agar nhi lagayenge th wh accept nhi karega
})
export const get=(url,params)=>instance.get(url,{params})
export const post=(url,data)=>instance.post(url,data)
export const patch=(url,data)=>instance.patch(url,data)
export const del=(url)=>instance.delete(url)
