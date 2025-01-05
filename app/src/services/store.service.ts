import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/stores`;

export const createStore = async (body:any) => {
    const url = `${BASEURL}`;
    
    const result = await axios.post(url, body);
    return result;
}

export const getAllStores = async () => {
    const url = `${BASEURL}`;
    const {data} = await axios.get(url);
    return data;
}

export const updateStore = async (id:string, state: any, token: string | null) => {

}

export const deleteStoreById = async (token: string | null, id : string) => {

}