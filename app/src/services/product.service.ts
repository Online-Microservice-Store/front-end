import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/products`;

export const createProduct = async (body:any) => {
    const url = `${BASEURL}`;
    
    const result = await axios.post(url, body);
    return result;
}
export const getAllProducts = async () => {
    const url = `${BASEURL}`;
    const {data} = await axios.get(url);
    return data;
}

export const getProductById = async (id:string) => {
    const url = `${BASEURL}/id/${id}`;
    const {data} = await axios.get(url);
    return data;
}

export const getProductsByName = async (name : string) => {
    const url = `${BASEURL}/name/${name}`
    const {data} = await axios.get(url);
    return data;
}

export const getProductsByCatalogId = async (id : string) => {
    const url = `${BASEURL}/catalog/${id}`
    const {data} = await axios.get(url);
    return data;
}

export const updateProduct = async (id:string, body: any, token: string | null) => {

}

export const deleteProductById = async (token: string | null, id : string) => {

}