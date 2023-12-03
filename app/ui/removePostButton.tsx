'use client';
import { removePostByIdDb } from '@/app/lib/dbData';
import clas from '@/styles/buttonCreate.module.scss';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';

// export async function removePostByIdDb(id: string) {
//   'use server';
//   unstable_noStore();
//   try {
//     await sql`DELETE FROM posts WHERE id=${id}`;
//   } catch (error) {
//     throw new Error('Fail get current post!');
//   } finally {
//     revalidatePath('/table');
//     redirect('/table');
//   }
// }
export default function RemoveButton({ removeId }: any) {
  const updateRemovePostWithId = removePostByIdDb.bind(null, removeId);
  return (
    <form action={updateRemovePostWithId}>
      <button className={clas.buttonCreate} type='submit'>
        Remove current post
      </button>
    </form>
  );
}
