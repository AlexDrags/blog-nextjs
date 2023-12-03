'use client';
import { useEffect } from 'react';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <>
      <h1>Oops! {error.message}</h1>
      <button onClick={() => reset()} type='button'>
        Try again
      </button>
    </>
  );
}
