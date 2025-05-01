export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  image_url: string | null;
  category_id?: number | null;
  category?: string;
  stock: number | null;
  is_featured?: boolean | null;
  created_at: string | Date | null;
  updated_at?: string | Date | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          email: string;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          email: string;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          email?: string;
        };
      };
      orders: {
        Row: {
          id: number;
          user_id: string;
          status: string;
          total: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          status: string;
          total: number;
        };
        Update: {
          status?: string;
          total?: number;
        };
      };
      order_items: {
        Row: {
          id: number;
          order_id: number;
          product_id: number;
          quantity: number;
          price: number;
        };
        Insert: {
          order_id: number;
          product_id: number;
          quantity: number;
          price: number;
        };
        Update: {
          quantity?: number;
          price?: number;
        };
      };
    };
  };
};
