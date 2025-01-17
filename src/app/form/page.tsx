'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IoIosCloseCircle } from "react-icons/io";
import * as yup from 'yup'

import { TopNav } from "@/components/TopNav"
import { useProductState } from "@/hooks/useProductState"
import { IProductFormField, IProductToCreate, IProductToUpdate } from "@/types";
import { useProducts } from '../../hooks/useProduct'
import { useState } from 'react';
import Link from 'next/link';

const schemaProductForm = yup.object().shape({
  title      : yup.string().required('Campo requerido'),
  description: yup.string().required(),
})

interface IImage {
  url: string
  file?: File | undefined
}

const ProductForm = () => {

  const { currentProduct, userId } = useProductState();
  const isEditMode = currentProduct._id.length ? true : false
  const { updateProduct, createProduct } = useProducts()

  const [ image, setImage ] = useState<IImage>({
    url : isEditMode ? currentProduct.imageUrl : '',
    file: undefined
  })
  
  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: errorsProduct },
    reset: resetProduct,
    getValues: getValuesProduct
  } = useForm<IProductFormField>({
    defaultValues: isEditMode ? {
      title            : currentProduct.title,
      description      : currentProduct?.description && currentProduct.description
    } : {},
    resolver: yupResolver(schemaProductForm)
  })

  const onSubmit = () => {

    if (isEditMode) {
        if (!image.file && (!image.url || image.url.length === 0)) {
          alert("Debe proporcionar una imagen");
          return;
        }
      
        const dataToSubmit: IProductToUpdate = {
          ...getValuesProduct(),
          userId   : userId,
          imageFile: image.file || undefined,
          imageUrl : image.url || "",
        };
        updateProduct(currentProduct._id, dataToSubmit);
        if( currentProduct._id === '') {setImage({
            url: '',
            file: undefined,
          });
        }
      } else {
        if (image.file) {
            const dataToSubmit: IProductToCreate = {
              ...getValuesProduct(),
              imageFile: image.file,
            };
            createProduct(dataToSubmit);
            setImage({
                url: '',
                file: undefined,
              });
          } else {
            alert('Por favor, selecciona un archivo de imagen');
          }
          resetProduct()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage({
        url: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleRemoveImage = () => {
    setImage({
      url: '',
      file: undefined,
    });
  };

  return (
    <div className=" w-full relative min-h-screen bg-gradient-to-r from-indigo-500 via-indigo-500 to-blue-500">
      <div className=" max-w-[1300px] px-3 m-auto">
        <TopNav title={isEditMode ? 'Editar Producto' : 'Crear nuevo producto'} />
        <h5 className='text-slate-300 text-center ml-8 sm:ml-12'>{"(Todos los campos son requeridos)"}</h5>
        <form className="mt-10 max-w-[600px] m-auto" onSubmit={handleSubmitProduct(onSubmit)}>
          <div>
            <label
              className={`text-sm max-sm:text-xs text-indigo-200`}
              htmlFor="ProductName"
            >
              {isEditMode ? 'Editar título' : 'Título'}
            </label>
            <input
              type="text"
              id="ProductName"
              placeholder="Ingresa el título del nuevo producto"
              className={`w-full h-14 max-sm:h-12 border-none rounded-xl p-4 text-base max-sm:placeholder:text-sm mt-1 outline-none`}
              {...registerProduct('title')}
            />
          </div>
          <div className=" mt-7 max-sm:mt-4">
            <label
              className={`text-sm max-sm:text-xs text-indigo-200`}
              htmlFor="ProductDescription"
            >
              Descripción del producto
            </label>
            <textarea
              id="ProductDescription"
              placeholder="Ingresa la descripción del producto"
              className={`resize-none border-none  w-full rounded-xl p-4 max-sm:p-3 mt-1 text-base max-sm:placeholder:text-sm h-48 max-sm:h-36 outline-none`}
              {...registerProduct('description')}
            />
          </div>
          <div className="mt-7 max-sm:mt-4">
            <label className="text-sm max-sm:text-xs text-indigo-200" htmlFor="ProductImage">
              {!isEditMode || image.url === '' ? 'Click para agregar imagen': 'Imagen del producto'}
            </label>
            <div className="mt-2 flex items-center justify-center gap-4">
              {image.url && !image.file ? (
                <div className="relative">
                  <img src={image.url} alt="Producto" className="w-32 h-32 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
                  >
                    <IoIosCloseCircle className="text-xl" />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  id="ProductImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
              { image.url && image.file && (
                <div className="w-32 h-32 relative">
                  <img src={URL.createObjectURL(image.file)} alt="Vista previa" className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2"
                  >
                    <IoIosCloseCircle className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="text-center flex gap-4 max-sm:flex-col mt-4">
            <Link
              href="/"
              onClick={()=>{
                resetProduct()
              }}
              className="bg-indigo-400 hover:bg-indigo-600 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={!!Object.keys(errorsProduct).length}
              onClick={() => {handleSubmitProduct(onSubmit)}}
              className="bg-blue-500 hover:bg-blue-600 transition text-xl font-bold text-white p-4 max-sm:p-3 max-sm:text-lg rounded-xl w-full"
            >
              {isEditMode ? 'Guardar' : 'Crear'}
            </button>
          </div>  
        </form>
        {errorsProduct?.title && (
            <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 absolute bottom-8 left-[50%] -translate-x-[50%]">
              <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Por favor ingrese un título
              </h2>
            </div>
          )}
          {errorsProduct?.description && (
            <div className=" max-sm:w-[230px] px-3 py-2 rounded-md bg-white border-l-[10px] flex items-center gap-2 border-red-600 absolute bottom-8 left-[50%] -translate-x-[50%]">
              <IoIosCloseCircle className=" text-2xl max-sm:text-xl text-red-500" />{" "}
              <h2 className=" max-md:text-xs text-sm text-slate-600 font-semibold">
                Por favor ingrese una descripción
              </h2>
            </div>
          )}
      </div>
    </div>
  )
}

export default ProductForm

