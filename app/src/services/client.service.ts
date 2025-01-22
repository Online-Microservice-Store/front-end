import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/auth`;
export const createClient = async (body:any) => {
    const url = `${BASEURL}/registerClient`;
    
    const object = await axios.post(url, body);
    return object;
}

export const getAllClients = async (token: string) => {
    const url = `${BASEURL}/get/Client`;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Añade el token como un Bearer token
        },
    };
    const {data} = await axios.get(url, config);
    return data;
}

export const updateClient = async (id:string, state: any, token: string | null) => {

}

export const deleteClientById = async (token: string | null, id : string) => {

}
