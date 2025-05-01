import React, { useEffect, useState } from 'react';

interface NoSSRProps {
  children: React.ReactNode;
}

const NoSSR: React.FC<NoSSRProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="bg-gray-100 rounded-lg p-4">جاري التحميل...</div>;
  }

  return <>{children}</>;
};

export default NoSSR;