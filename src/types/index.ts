export interface IProducts {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
}

export interface IProductFormField {
  title: string;
  description: string;
}

export interface IProductToCreate {
  title: string;
  description: string;
  imageFile: File;
}

export interface IProductToUpdate {
  title: string;
  description: string;
  userId: string;
  imageUrl?: string | undefined
  imageFile?: File | undefined;
}