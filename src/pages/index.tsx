import React from 'react';
import { Toaster } from 'react-hot-toast';
import HomePage from './homepage';

// Use direct import instead of dynamic loading
const IndexPage = () => {
  return (
    <div suppressHydrationWarning>
      <HomePage />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default IndexPage;