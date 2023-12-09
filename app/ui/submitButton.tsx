'use client';
import { useFormStatus } from 'react-dom';
export default function SubmitNutton() {
  const { pending } = useFormStatus();
  return (
    <button type='submit' aria-disabled={pending}>
      Send
    </button>
  );
}
