import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/invoices`;
export const createInvoice = async (body:any) => {
    const url = `${BASEURL}`;
    const object = await axios.post(url, body);
    return object;
}

export const getAllInvoices = async () => {
    const url = `${BASEURL}`;
    const {data} = await axios.get(url);
    return data;
}

export const updateInvoice = async (id:string, state: any, token: string | null) => {

}

export const deleteInvoiceById = async (token: string | null, id : string) => {

}