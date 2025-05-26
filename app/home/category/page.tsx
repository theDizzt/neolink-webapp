'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CategoryPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);
  return (
    <div>
      <p>this is category</p>
      <p>this is category</p>
      <p>this is category</p>
    </div>
  );
};

export default CategoryPage;
