import axios from 'axios';
import {BACKEND_URL} from '@/constants/index';

const BASEURL = `${BACKEND_URL}/invoices`;
export const createInvoice = async (bodyInvoice:any, products:any) => {
    const storeInvoices = createInvoiceStores(products);
    console.log(storeInvoices);
    const url = `${BASEURL}`;
    const invoice = {
      ...bodyInvoice,
      invoiceStores: storeInvoices
    }
    const {data} = await axios.post(url, invoice);
    console.log("DATA EN INVOICE SERVICE");
    console.log(data);
    return data;
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

//Methods to create stores-invoices
function createInvoiceStores(products:any) {
    // Agrupamos los productos por storeId
    const storesMap = products.reduce((acc:any, product:any) => {
      const { storeId, stockId, id: productId, quantity: amount } = product;
  
      if (!acc[storeId]) {
        // Si no existe la tienda, inicializamos
        acc[storeId] = {
          date: new Date, // Fecha fija o calculada según tu lógica
          discount: 1, // Descuento genérico o calculado
          tax: 14, // Impuesto genérico o calculado
          storeId: storeId,
          items: [],
        };
      }
  
      // Agregamos el producto como un item
      acc[storeId].items.push({
        productId,
        amount,
        stockId,
      });
  
      return acc;
    }, {});
  
    // Convertimos el objeto en un array de InvoiceStore
    return Object.values(storesMap);
}
