import { useProductState } from "./useProductState"
import { IProducts, IProductToCreate, IProductToUpdate } from "@/types"
import getErrorFromError from "@/utils/get-errors"



interface IProductFunctions {
    getProducts  : (state?: boolean) => void,
    createProduct: (params: IProductToCreate) => void,
    updateProduct: (productId: string, params: IProductToUpdate) => void,
    deleteProduct: (productId: string, userId: string) => void 
}

export const useProducts: () => IProductFunctions = () => {

    const { products, userId, setProducts } = useProductState()
    
    const getProducts = async (): Promise<void> => {
        try {
            const  response   = await fetch(`/api/product?userId=${userId}`);

            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }

            const { data }: { data: IProducts[] } = await response.json();

            setProducts(data);
        } catch (error) {
            const { message } = getErrorFromError(error)
            alert(message);
        }
    }

    const createProduct = async (params: IProductToCreate): Promise<void> => {
        try {
          const formData = new FormData();
          formData.append('title', params.title);
          formData.append('description', params.description);
          formData.append('userId', userId);
          formData.append('image', params.imageFile);
      
          const response = await fetch('/api/product', {
            method: 'POST',
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('Error al crear el producto');
          }
          if (response.status === 200) {
            alert('Producto creado! , puede volver al menú');
          }
          const { data } = await response.json();
      
          setProducts([ ...products, data ]);
        } catch (error) {
          const { message } = getErrorFromError(error);
          alert(message);
        }
      };

      const updateProduct = async (productId: string, params: IProductToUpdate): Promise<void> => {
        try {
          const formData = new FormData();
          formData.append('title', params.title);
          formData.append('description', params.description);
          formData.append('userId', params.userId)
          if (params.imageUrl) formData.append('imageUrl', params.imageUrl);
          if (params.imageFile) formData.append('image', params.imageFile);
      
          const response = await fetch(`/api/product/${productId}`, {
            method: 'PATCH',
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('Error al actualizar el producto');
          }

          if (response.status === 200) {
            alert('Actualización exitosa, puede volver al menú');
          }
      
          const { data } = await response.json();
      
          const updatedProducts = products.map((product: IProducts) =>
            product._id === data._id ? data : product
          );
          setProducts(updatedProducts);
        } catch (error) {
          const { message } = getErrorFromError(error);
          alert(message);
        }
      };

      const deleteProduct = async (productId: string, userId: string): Promise<void> => {
        try {
          const response = await fetch(`/api/product/${productId}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
          });
      
          if (!response.ok) {
            throw new Error('Error al eliminar el producto');
          }
      
          const { data }: { data: IProducts } = await response.json();
          console.log(data);
          
          setProducts(products.filter((Product: IProducts) => Product._id !== productId));
        } catch (error) {
          const { message } = getErrorFromError(error);
          alert(message);
        }
      };


    return {
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }
}