
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CategoryPage = () => {
  useEffect(() => {
    const router = useRouter();
    router.push('/home');
  }, []);
  return (
    <div>
      <p>this is category</p>
      <p>this is category</p>
      <p>this is category</p>
    </div>
  );
};

export default CategoryPage;
