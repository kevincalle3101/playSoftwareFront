import { FC } from 'react'
import { FaCheck } from "react-icons/fa6";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useProducts } from '@/hooks/useProduct';
import { useProductState } from '@/hooks/useProductState';
import Link from 'next/link';

interface Props {
    productId         : string
    productTitle      : string
    productDescription: string
    productImageUrl   : string
    userId            : string
  }

export const ProductsOptions: FC<Props> = ({ 
    productId, 
    productTitle, 
    productDescription,
    productImageUrl,
    userId 
}) => {
    const { deleteProduct } = useProducts()
    const { setCurrentProduct } = useProductState();

    const redirectToForm = () => {
        setCurrentProduct({ 
            _id: productId, 
            title: productTitle, 
            description: 
            productDescription, 
            imageUrl: productImageUrl , 
            userId: userId})
    }
        
    return (
        <div className="absolute z-10 w-[225px] shadow bg-white top-9 left-0 max-xl:-left-48 p-3 rounded-2xl">
            <ul className=" flex flex-col text-black">
                <li>
                    <Link
                        href={"/form"} 
                        className=" max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3  px-2 rounded-md"
                        onClick={()=> redirectToForm()}
                        >
                        <RiEdit2Fill className=" text-2xl max-sm:text-xl text-slate-700" />
                        Editar
                    </Link>
                </li>
                <li
                    onClick={() => {
                        deleteProduct(productId, userId)
                    }}
                    className="max-sm:text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-3 px-2 rounded-md"
                >
                    <MdDelete className=" text-2xl max-sm:text-xl text-slate-700" />
                    Eliminar
                </li>
            </ul>

        </div>
    )
}

