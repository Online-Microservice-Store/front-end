import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/auth`;

export const createAdmin = async (body:any) => {
    const url = `${BASEURL}/registerAdmin`;
    
    const object = await axios.post(url, body);
    return object;
}
export const getAllAdmins = async () => {
    const url = `${BASEURL}/get/Admin`;
    const {data} = await axios.get(url);
    return data;
}
export const updateAdmin= async (id:string, state: any, token: string | null) => {

}

export const deleteAdminById = async (token: string | null, id : string) => {

}