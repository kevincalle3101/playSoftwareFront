'use client';

import { SlOptionsVertical } from 'react-icons/sl'
import { ProductsOptions } from '../ProductOptions'
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

import burguer from "@/images/burguer.webp"

interface Props {
    _id: string
    title: string
    description: string
    imageUrl: string
    userId: string
}


export const ProductCard: FC<Props> = ({
    _id,
    title,
    description,
    imageUrl,
    userId
}) => {

    const menuRef = useRef<HTMLDivElement | null>(null);

    const [openOptions, setOpenOptions] = useState(false);



    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setOpenOptions(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <div className={`rounded-lg shadow-md max-w-xs w-full bg-indigo-700 relative`}>
            <Image
                src={imageUrl || burguer}
                alt={title || ''}
                width={640}
                height={224}
                className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-6 grid justify-items-center gap-y-3">
                <h2 className="text-2xl font-bold text-green-500">{title || ''}</h2>
                <span className="text-base font-normal text-slate-300 text-center block">{description || ''}</span>
            </div>
            <div ref={menuRef}
                onClick={() => setOpenOptions(!openOptions)}
                className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-lg">
                <SlOptionsVertical
                    className=" text-lg cursor-pointer"
                />
                <div
                    className={`${openOptions ? "animationActive" : "animationUnactive"}`}
                >
                    {openOptions && (
                        <ProductsOptions
                            productId={_id}
                            productTitle={title}
                            productDescription={description}
                            productImageUrl={imageUrl}
                            userId={userId}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
