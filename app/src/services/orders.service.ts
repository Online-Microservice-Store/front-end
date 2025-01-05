import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/orders2`;

export const createOrder = async (body:any) => {
    const url = `${BASEURL}`;
    
    const result = await axios.post(url, body);
    return result;
}

export const getAllOrders = async () => {
    const url = `${BASEURL}`;
    const {data} = await axios.get(url);
    return data;
}

export const updateOrder = async (id:string, state: any, token: string | null) => {

}

export const deleteOrderById = async (token: string | null, id : string) => {

}