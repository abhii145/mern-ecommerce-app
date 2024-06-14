import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from ".";

declare type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

declare type MessageResponse = {
  success: boolean;
  message: string;
};

declare type AllUsersResponse = {
  success: boolean;
  users: User[];
};

declare type UserResponse = {
  success: boolean;
  user: User;
};

declare type AllProductsResponse = {
  success: boolean;
  products: Product[];
};
declare type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

declare type SearchProductsResponse = AllProductsResponse & {
  totalPage: number;
};
declare type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
declare type ProductResponse = {
  success: boolean;
  product: Product;
};

declare type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};
declare type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

declare type StatsResponse = {
  success: boolean;
  stats: Stats;
};

declare type PieResponse = {
  success: boolean;
  charts: Pie;
};

declare type BarResponse = {
  success: boolean;
  charts: Bar;
};

declare type LineResponse = {
  success: boolean;
  charts: Line;
};

declare type NewProductRequest = {
  id: string;
  formData: FormData;
};
declare type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};
declare type DeleteProductRequest = {
  userId: string;
  productId: string;
};

declare type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

declare type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

declare type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};
