'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { NextResponse } from 'next/server';
import { notFound, redirect } from 'next/navigation';

export async function getDbData() {
  unstable_noStore();
  try {
    const result = await sql`SELECT * FROM posts`;
    return result.rows;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function getPostByIdDb(id: string) {
  unstable_noStore();
  try {
    const result = sql`SELECT * FROM posts WHERE id=${id}`;

    if (!result) {
      throw new Error('Post not found!');
    }

    return (await result).rows[0];
  } catch (error) {
    console.error(error);
    notFound();
    //throw new Error('Fail get current post!');
  } finally {
    console.log('It result will be always');
  }
}

export async function removePostByIdDb(id: string) {
  unstable_noStore();
  try {
    await sql`DELETE FROM posts WHERE id=${id}`;
  } catch (error) {
    throw new Error('Fail get current post!');
  } finally {
    revalidatePath('/table');
    redirect('/table');
  }
}

export async function searchPost(query: string) {
  unstable_noStore();
  try {
    const filterPost = await sql`SELECT
    *
  FROM posts
  WHERE
  posts.postname ILIKE ${`%${query}%`}`;
    return filterPost.rows;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Failed to fetch invoices.');
  }
}
