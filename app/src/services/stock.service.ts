import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/stocks`;


export const createStock = async (body:any) => {
    const url = `${BASEURL}`;
    
    const {data} = await axios.post(url, body);
    return data;
}

export const getStocksByProductId = async (id:string) => {
    const url = `${BASEURL}/product/${id}`
    const {data} = await axios.get(url);
    return data;
}