"use client"
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default async function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    router.push('/connect');
  })
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <Loader2 className='size-6 animate-spin' />
    </div>
  );
}