import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useCartStore } from '../store/cartStore';
import { useLanguageStore } from '../store/languageStore';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  console.log('🧪 Logged in user:', user);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const { language, toggleLanguage } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">EasyShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors ${
                router.pathname.startsWith('/products')
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {language === 'en' ? 'Products' : 'المنتجات'}
            </Link>
            <div className="w-64">
              <SearchBar />
            </div>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold transition-colors"
              aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>

            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {user ? (
<div
  className="relative"
  onMouseEnter={() => setDropdownOpen(true)}
  onMouseLeave={() => setDropdownOpen(false)}
>
                <button className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium focus:outline-none">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold">
                          {user.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                      )}
                    </div>
                    <span className="text-primary">
                      {language === 'en'
                        ? `Hi, ${user.first_name || 'User'}`
                        : `مرحبًا، ${user.first_name || 'المستخدم'}`}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-down"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
{dropdownOpen && (
  <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {language === 'en' ? 'Profile' : 'الملف الشخصي'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left rtl:text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {language === 'en' ? 'Sign out' : 'تسجيل الخروج'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  {language === 'en' ? 'Sign in' : 'تسجيل الدخول'}
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Link href="/cart" className="relative p-2 mr-2 text-gray-700 hover:text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <div className="px-4 py-2">
            <SearchBar />
          </div>
          <div className="flex px-3 py-2 items-center justify-between">
            <Link
              href="/products"
              className="text-base font-medium text-gray-700 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Products' : 'المنتجات'}
            </Link>

            {/* Language Toggle Button (Mobile) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold transition-colors"
              aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              {language === 'en' ? 'AR' : 'EN'}
            </button>
          </div>
          {user ? (
            <>
              {/* عرض اسم المستخدم وصورته في القائمة المتنقلة */}
              <div className="flex items-center gap-2 px-3 py-2 text-primary font-medium">
                <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold">
                      {user.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
               <div className="flex items-center gap-1">
  <span className="text-primary text-sm font-medium">
    {language === 'en'
      ? `Hi, ${user.first_name || 'User'}`
      : `مرحبًا، ${user.first_name || 'المستخدم'}`}
  </span>
  <button
    onClick={handleSignOut}
    title={language === 'en' ? 'Logout' : 'تسجيل الخروج'}
    className="text-xs bg-gray-100 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-colors"
  >
    {language === 'en' ? 'Logout' : 'خروج'}
  </button>
</div>

              </div>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'en' ? 'Profile' : 'الملف الشخصي'}
              </Link>
              <button
                onClick={handleSignOut}
                className={`block w-full ${language === 'en' ? 'text-left' : 'text-right'} px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50`}
              >
                {language === 'en' ? 'Sign out' : 'تسجيل الخروج'}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'en' ? 'Sign in' : 'تسجيل الدخول'}
              </Link>
              <Link
                href="/auth/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
