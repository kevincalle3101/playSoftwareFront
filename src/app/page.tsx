'use client';

import { RxPlus } from "react-icons/rx";
import Greeting from "@/components/Greeting"
import { useEffect } from "react";
import { useProductState } from "@/hooks/useProductState";
import { useProducts } from "@/hooks/useProduct";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";



const Home = () => {

  const { products, userId, setCurrentProduct } = useProductState();
  const { getProducts } = useProducts();
  useEffect(() => {
    getProducts()
  }, [])

  const createProductReset = () => {
    setCurrentProduct( {_id: '', title: '', description: '', imageUrl: '', userId: ''})
  }

  return (
    <main>
      <Greeting />
      <h1 className="text-white font-bold gap-1 text-5xl max-md:text-2xl text-center">
        Productos Challenge 📚
      </h1>
      {products?.length ? (
        <div className="flex flex-wrap justify-center gap-6 p-4 mt-20">
          {products?.map((product, index) => (
            <ProductCard 
              key={index}
              _id={product?._id}
              title={product?.title}
              description={product?.description}
              imageUrl={product?.imageUrl}
              userId={userId}
            />
          ))}
        </div>
      ) : (
        <h1 className=" w-full text-center text-2xl max-md:text-2xl max-sm:text-xl text-white font-bold absolute bottom-[50%] left-[50%] -translate-x-[50%]">
          No tienes ninguna producto por mostrar
        </h1>
      )}
      <Link
        href="/form"
        onClick={() => createProductReset()}
        className="fixed bottom-10 w-16 h-16 max-sm:w-14 max-sm:h-14 cursor-pointer bg-white grid 
          place-items-center rounded-full left-[50%] -translate-x-[50%] transition-transform duration-300 hover:scale-110"
      >
        <RxPlus className="text-4xl max-sm:text-3xl plusIcon text-indigo-500" />
      </Link>
    </main>
  );
};

export default Home;