'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function createPosts(formData: FormData) {
  const postname = `${formData.get('postTitle')}`;
  const posttext = `${formData.get('postDescription')}`;
  const dateObj = new Date();
  const id = dateObj.getTime();
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const fullDate = `${day}.${month}.${year}`;
  const fullTime = `${hours}:${minutes}:${seconds}`;

  try {
    if (!postname || !posttext) throw new Error('Title and description text required');
    await sql`INSERT INTO posts (id, postname, posttext, date, time) VALUES (${id}, ${postname}, ${posttext}, ${fullDate}, ${fullTime});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    revalidatePath('/table');
    redirect('/table');
  }
}
