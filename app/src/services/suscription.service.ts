import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/suscriptions`;

export const createSuscription = async (body:any) => {
    const url = `${BASEURL}`;
    
    const result = await axios.post(url, body);
    return result;
}

export const getAllSuscription = async () => {
    const url = `${BASEURL}`;
    const {data} = await axios.get(url);
    return data;
}

export const updateSuscription = async (id:string, state: any, token: string | null) => {

}

export const deleteSuscriptionById = async (token: string | null, id : string) => {

}