'use client';
import clas from '@/styles/submitBtn.module.scss';
import { useFormStatus } from 'react-dom';
import { useDebouncedCallback } from 'use-debounce';
export interface SubmitProps {
  disabled: boolean;
  setDisabl: (disabled: boolean) => void;
}

export default function SubmitButton({ disabled, setDisabl }: SubmitProps) {
  const { pending } = useFormStatus();
  const handleSend = useDebouncedCallback(() => {
    setDisabl(!disabled);
  }, 500);
  return (
    <button className={clas.submit} type='submit' aria-disabled={pending} disabled={disabled} onClick={handleSend}>
      Send
    </button>
  );
}
