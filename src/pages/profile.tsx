import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';

type ProfileFormData = {
  firstName: string;
  lastName: string;
};

const ProfilePage: React.FC = () => {
  const { user, updateProfile, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    try {
      const result = await updateProfile({
        first_name: data.firstName,
        last_name: data.lastName,
      });
      
      if (result.success) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    
    const file = event.target.files[0];
    const fileSize = file.size / 1024 / 1024; // size in MB
    
    if (fileSize > 2) {
      toast.error('File size must be less than 2MB');
      return;
    }
    
    setUploading(true);
    
    try {
      if (!user) throw new Error('Not authenticated');
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // Update user profile with avatar URL
      const result = await updateProfile({
        avatar_url: publicUrl,
      });
      
      if (result.success) {
        toast.success('Avatar updated successfully');
      } else {
        toast.error(result.error || 'Failed to update avatar');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
  };

  return (
    <Layout title="My Profile | EasyShop" requireAuth>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
                <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100">
                  {user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt="Profile picture"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-5xl text-gray-400">
                      {user?.first_name?.[0] || user?.email?.[0]}
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {user?.first_name && user?.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : 'Welcome'}
                  </h2>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="relative"
                      isLoading={uploading}
                    >
                      {uploading ? 'Uploading...' : 'Change Avatar'}
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleAvatarUpload}
                        accept="image/*"
                        disabled={uploading}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    error={errors.firstName?.message}
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                  />
                  
                  <Input
                    label="Last Name"
                    error={errors.lastName?.message}
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={user?.email || ''}
                      disabled
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                  >
                    Update Profile
                  </Button>
                  
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-8 text-center">
                <p className="text-gray-500">Your order history will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
