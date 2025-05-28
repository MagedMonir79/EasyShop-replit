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
    setIsMobileMenuOpen(false);
    router.push('/auth/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <React.Fragment>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">EasyShop</span>
            </Link>
            ...
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
