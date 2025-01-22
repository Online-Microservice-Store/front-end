import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/auth`;

export const createTrader = async (body:any) => {
    const url = `${BASEURL}/registerTrader`;
    
    const object = await axios.post(url, body);
    return object;
}
export const getAllTraders = async (token:string) => {
    const url = `${BASEURL}/get/Trader`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Añade el token como un Bearer token
        },
    };
    const {data} = await axios.get(url, config);
    return data;
}
export const updateTrader = async (id:string, state: any, token: string | null) => {

}

export const deleteTraderById = async (token: string | null, id : string) => {

}

