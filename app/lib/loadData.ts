'use server';
import { notFound } from 'next/navigation';
import { env } from 'process';
export async function getAllPostsData() {
  try {
    console.log('Database fetching...');
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      next: { revalidate: 120 },
    });
    console.log('Fetch is done.');
    return await response.json();
  } catch (error) {
    console.error('Database fetching error');
    throw new Error('Fail get post!');
  } finally {
    console.log('It result will be always');
  }
}

export async function getPostByIdData(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 120 },
    });
    console.log(res);

    if (res.status === 404) {
      throw new Error('Post not found!');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    notFound();
    //throw new Error('Fail get current post!');
  } finally {
    console.log('It result will be always');
  }
}
