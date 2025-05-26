'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PlayPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home  ');
  }, [router]);
  return (
    <div>
      <h1>Play Page</h1>
      <p>Welcome to the play page!</p>
    </div>
  );
};

export default PlayPage;
