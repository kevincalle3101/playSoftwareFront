import { create } from 'zustand'

import { IProducts } from '@/types';
import { getUserId } from '@/utils/user';

interface IState {
    products          : IProducts[];
    currentProduct    : IProducts;
    userId            : string;
    setProducts       : (products: IProducts[]) => void;
    setCurrentProduct : (product: IProducts) => void
}

export const useProductState = create<IState>((set) => ({
  products          : [],
  currentProduct    : {_id: '', title: '', description: '', imageUrl: '', userId: ''},
  userId            : getUserId(),
  setProducts       : (products: IProducts[]) => set((state) => ({ ...state, products })),
  setCurrentProduct : (currentProduct: IProducts) => set((state) => ({...state, currentProduct})),
}))
