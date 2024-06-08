interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
}

export interface BaseQuery {
  title?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}

export interface InvalidatesCacheProps {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
}

export { NewUserRequestBody };
