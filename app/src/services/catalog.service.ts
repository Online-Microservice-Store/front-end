import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/catalogs`;

export const getCatalogsByStoreId = async (storeId:string) => {
    const url = `${BASEURL}/store/${storeId}`;
    const {data} = await axios.get(url);
    return data;
}