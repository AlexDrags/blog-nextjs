'use client';
import { useFormStatus } from 'react-dom';
import { update } from '@/app/lib/dbData';
export default function SubmitNutton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' aria-disabled={pending}>
      Send
    </button>
  );
}
