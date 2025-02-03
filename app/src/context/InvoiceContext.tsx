"use client";
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
  } from "react";

interface InvoiceContextType {
    products: any,
    addProduct: (product:any) => number
    getProducts : () => any
    deleteProducts : () => any
    deleteProduct : () => void
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

interface InvoiceProviderProps {
    children: ReactNode;
}

export const InvoiceProvider : React.FC<InvoiceProviderProps> = ( {children}) => {
    const [products, setProducts] = useState<any[]>([]);
    const [storeInvoices, setStoreInvoices] = useState<any[]> ([]);

    useEffect(() => {
        console.log("Products updated:", products); // Verifica los productos actualizados
      }, [products, storeInvoices]);

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
        if (storeInvoices.length > 0){
            localStorage.setItem("storeInvoice", JSON.stringify(storeInvoices));
        }
    }, [products, storeInvoices]);


    const addProduct = (product: any) => {
        const products = localStorage.getItem('products');
        const productsFormatted = products ? JSON.parse(products) : [];
        const updatedProducts = [...productsFormatted, product];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        console.log('Producto agregado:', product);
        console.log('Productos actualizados:', updatedProducts);
        return updatedProducts.length; // Devuelve el número de productos en el carrito
    };

    const getProducts = () => {
        const products = localStorage.getItem('products');
        // Si no hay productos, retorna un array vacío, de lo contrario, parsea el JSON
        return products ? JSON.parse(products) : [];
    }
    //TODO: Build delete product
    const deleteProduct = () => {
        const products = localStorage.getItem('products');

    }

    const deleteProducts = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("products");
          }
    }


    return(
        <InvoiceContext.Provider value={{products, addProduct, getProducts, deleteProduct, deleteProducts}}>
            {children}
        </InvoiceContext.Provider>
    );
    
}

export const useInvoice = (): InvoiceContextType => {
    const context = useContext(InvoiceContext);
    if(!context){
        throw new Error("useInvoice debe ser usado dentro de un provider");
    }
    return context;
}