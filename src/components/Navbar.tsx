import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useCartStore } from '../store/cartStore';
import { useLanguageStore } from '../store/languageStore';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const { language, toggleLanguage } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    router.push('/auth/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-primary">EasyShop</span>
        </Link>

        <div>
          {user ? (
            <button onClick={handleSignOut} className="text-sm text-red-600 hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
