'use server';
const bcrypt = require('bcrypt');
import { Prisma } from '@prisma/client';
import { decode as base64_decode, encode as base64_encode } from 'base-64';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateProps {
  postname: string;
  posttext: string;
}
export async function createPosts(uni: string, formData: FormData) {
  const postTitle = `${formData.get('postTitle')}`;
  const postMessage = `${formData.get('postMessage')}`;
  const postAuthor = `${formData.get('postAuthor')}`;
  const email = `${formData.get('email')}`;

  try {
    if (!postTitle || !postMessage) throw new Error('Title and description text required');
    await prisma.posts.create({
      data: {
        post_title: `${postTitle}`,
        post_message: `${postMessage}`,
        post_author: `${postAuthor}`,
        email: `${email}`,
        image: uni,
      },
    });
    //console.log(uni);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    revalidatePath('/table');
    redirect('/table');
  }
}

// export async function createPosts(formData: FormData) {
//   const postname = `${formData.get('postTitle')}`;
//   const posttext = `${formData.get('postDescription')}`;
//   const dateObj = new Date();
//   const id = dateObj.getTime();
//   const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`;
//   console.log(day);

//   const month = dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : `${dateObj.getMonth()}`;
//   const year = dateObj.getFullYear();
//   const hours = dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : `${dateObj.getHours()}`;
//   const minutes = dateObj.getMinutes() < 10 ? `0${dateObj.getMinutes()}` : `${dateObj.getMinutes()}`;
//   const seconds = dateObj.getSeconds() < 10 ? `0${dateObj.getSeconds()}` : `${dateObj.getSeconds()}`;
//   const fullDate = `${day}.${month}.${year}`;
//   const fullTime = `${hours}:${minutes}:${seconds}`;
//   // const idEncoded = base64_encode(`${postname}`);
//   // const hasheded = await bcrypt.hash(`${formData.get('postTitle')}`, 10);
//   // console.log(idEncoded);
//   // console.log(hasheded);

//   try {
//     if (!postname || !posttext) throw new Error('Title and description text required');
//     await sql`INSERT INTO posts (id, postname, posttext, date, time) VALUES (${id}, ${postname}, ${posttext}, ${fullDate}, ${fullTime});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   } finally {
//     revalidatePath('/table');
//     redirect('/table');
//   }
// }
