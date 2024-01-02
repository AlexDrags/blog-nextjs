'use client';
import { update } from '@/app/lib/dbData';

export interface FileProps {
  setSrc: (prev: string) => void;
}
export default function FileField({ setSrc }: FileProps) {
  return (
    <input
      className='fileField'
      type='file'
      accept='image/*'
      name='postPic'
      id=''
      onChange={async (evt) => {
        if (!evt.target.files) return;
        const file = evt.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async function () {
          const uni = reader.result;
          setSrc(`${uni}`);
          await update(`${uni}`);
        };
        reader.onerror = function () {
          console.log(reader.error);
        };
      }}
    />
  );
}
