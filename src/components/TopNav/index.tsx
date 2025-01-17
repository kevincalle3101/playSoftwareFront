import { FC } from 'react'
import Link from 'next/link';

import { IoIosArrowBack } from "react-icons/io";

interface Props {
    title: string
  }

export const TopNav: FC<Props> = ({title}) => {
  
  return (
    <div className=" py-7 max-sm:py-5  text-center text-3xl text-white flex items-center">
      <Link href="/" className="rounded-lg p-1">
          <IoIosArrowBack className="text-4xl max-sm:text-2xl cursor-pointer" />
      </Link>
      <h1 className="font-bold max-sm:text-2xl text-4xl mx-auto">{title}</h1>
    </div>
  );
};
