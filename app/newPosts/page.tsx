'use client';
import clas from '@/styles/createForm.module.scss';
import { createPosts } from '@/app/lib/action';
export default function Page() {
  return (
    <form className={clas.form} action={createPosts} id='formCreate' name='formCreate'>
      <h2>Write your post</h2>
      <input type='text' name='postTitle' id='' placeholder='Title post' />
      <textarea name='postDescription' id='' placeholder='Text you post...'></textarea>
      <button type='submit'>Send</button>
    </form>
  );
}
