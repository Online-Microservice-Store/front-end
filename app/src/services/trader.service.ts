import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/auth`;

export const createTrader = async (body:any) => {
    const url = `${BASEURL}/registerTrader`;
    
    const object = await axios.post(url, body);
    return object;
}
export const getAllTraders = async () => {
    const url = `${BASEURL}/get/Trader`;
    const {data} = await axios.get(url);
    return data;
}
export const updateTrader = async (id:string, state: any, token: string | null) => {

}

export const deleteTraderById = async (token: string | null, id : string) => {

}