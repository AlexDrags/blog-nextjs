'use client';
import SubmitNutton from '../ui/submitButton';
import Image from 'next/image';
import clas from '@/styles/createForm.module.scss';
import { createPosts } from '@/app/lib/action';
import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import FileField from '@/components/FileField';
export default function Page() {
  const prisma = new PrismaClient();
  const [src, setSrc] = useState<string | ArrayBuffer | null>('');
  const updateCreatePosts = createPosts.bind(null, `${src}`);

  return (
    <form className={clas.form} action={updateCreatePosts} id='formCreate' name='formCreate'>
      <h2>Write your post</h2>
      <input type='text' name='postTitle' id='' placeholder='Title post' />
      <textarea name='postMessage' id='' placeholder='Message you post...' maxLength={1000}></textarea>
      <input className={clas.authorField} type='text' name='postAuthor' placeholder='Yor name...' />
      <input type='email' name='email' id='' placeholder='Your email' />
      {/* <FileField setSrc={setSrc} /> */}
      <p>Attention: don&apos;t download size image more 1mb! Compresse you image.</p>
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
          reader.onload = function () {
            const uni = reader.result;
            setSrc(uni);
            console.log(src);
          };
          console.log(`${src}`);
          reader.onerror = function () {
            console.log(reader.error);
          };
        }}
      />

      <Image className='preview' src={`${src}`} width={250} height={150} alt='preview' />
      <SubmitNutton />
    </form>
  );
}
