import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabase';
import { Product } from '../utils/types';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const getProducts = async (category?: string, search?: string) => {
    let query = supabase.from('products').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as Product[];
  };

  const getProduct = async (id: number) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data as Product;
  };

  const getFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(6)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data as Product[];
  };

  const getCategories = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category');
    
    if (error) throw error;
    
    // Get unique categories
    const uniqueCategories: string[] = [];
    data.forEach(item => {
      if (!uniqueCategories.includes(item.category)) {
        uniqueCategories.push(item.category);
      }
    });
    
    return uniqueCategories;
  };

  const useProductsQuery = (category?: string, search?: string) => {
    return useQuery({
      queryKey: ['products', { category, search }], 
      queryFn: () => getProducts(category, search),
    });
  };

  const useProductQuery = (id: number) => {
    return useQuery({
      queryKey: ['product', id], 
      queryFn: () => getProduct(id),
      enabled: !!id,
    });
  };

  const useFeaturedProductsQuery = () => {
    return useQuery({
      queryKey: ['featuredProducts'], 
      queryFn: getFeaturedProducts,
    });
  };

  const useCategoriesQuery = () => {
    return useQuery({
      queryKey: ['categories'], 
      queryFn: getCategories,
    });
  };

  return {
    useProductsQuery,
    useProductQuery,
    useFeaturedProductsQuery,
    useCategoriesQuery,
  };
};
