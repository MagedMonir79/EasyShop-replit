export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  created_at: string;
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
