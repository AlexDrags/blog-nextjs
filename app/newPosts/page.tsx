'use client';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import SubmitButton from '../ui/submitButton';
import Image from 'next/image';
import clas from '@/styles/createForm.module.scss';
import { createPosts } from '@/app/lib/action';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { useDebouncedCallback } from 'use-debounce';
import FileField from '@/components/FileField';
export default function Page() {
  const prisma = new PrismaClient();
  const [src, setSrc] = useState('');
  const [disabl, setDisabl] = useState(false);
  const updateCreatePosts = createPosts.bind(null, src);

  return (
    <form className={clas.form} action={useDebouncedCallback(updateCreatePosts, 500)} id='formCreate' name='formCreate'>
      <h2>Write your post</h2>
      <input type='text' name='postTitle' id='' placeholder='Title post' />
      <textarea name='postMessage' id='' placeholder='Message you post...' maxLength={1000}></textarea>
      <input className={clas.authorField} type='text' name='postAuthor' placeholder='Yor name...' />
      <input type='email' name='email' id='' placeholder='Your email' />
      {/* <FileField setSrc={setSrc} /> */}
      <p>Attention: don&apos;t download size image more 5mb! Compresse you image.</p>
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
          const newF = new File([evt.target.files[0]], evt.target.value);
          const compressImage = async (file: File, { quality = 1, type = file.type }) => {
            // Get as image data
            const imageBitmap = await createImageBitmap(file);

            // Draw to canvas
            const canvas = document.createElement('canvas');
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(imageBitmap, 0, 0);

            // Turn into Blob
            const blob: any = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));

            // Turn Blob into File
            return new File([blob], file.name, {
              type: blob.type,
            });
          };
          const compressedFile = await compressImage(file, {
            quality: 0.5,
            type: 'image/jpeg',
          });
          //console.log(compressedFile);

          //reader.readAsDataURL(file);
          reader.readAsDataURL(compressedFile);
          reader.onload = async function () {
            const uni = reader.result;
            setSrc(`${uni}`);
            //console.log(m);
          };
          //console.log(src);
          reader.onerror = function () {
            console.log(reader.error);
          };
        }}
      />

      <Image className='preview' src={`${src}`} width={250} height={150} alt='preview' />
      <SubmitButton disabled={disabl} setDisabl={setDisabl} />
    </form>
  );
}
