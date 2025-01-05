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
    addProduct: (product:any) => void
    getProducts : () => any
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

interface InvoiceProviderProps {
    children: ReactNode;
}

export const InvoiceProvider : React.FC<InvoiceProviderProps> = ( {children}) => {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        console.log("Products updated:", products); // Verifica los productos actualizados
      }, [products]);

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (product: any) => {
        const products = localStorage.getItem('products');
        const productsFormatted = products ? JSON.parse(products) : [];
        const updatedProducts = [...productsFormatted, product];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        console.log('Producto agregado:', product);
        console.log('Productos actualizados:', updatedProducts);
    };

    const getProducts = () => {
        const products = localStorage.getItem('products');
        // Si no hay productos, retorna un array vacío, de lo contrario, parsea el JSON
        return products ? JSON.parse(products) : [];
    }

    return(
        <InvoiceContext.Provider value={{products, addProduct, getProducts}}>
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