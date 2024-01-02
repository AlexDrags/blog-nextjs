'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { NextResponse } from 'next/server';
import { notFound, redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDbData() {
  unstable_noStore();

  try {
    const result = await prisma.$queryRaw`SELECT * FROM posts`;
    //console.log(result);

    return result;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// export async function getDbData() {
//   unstable_noStore();

//   try {
//     // const result = await prisma.posts.findMany();
//     const result = await prisma.$queryRaw`SELECT * FROM posts`;
//     //console.log(result);

//     return result;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function getDbData() {
//   unstable_noStore();
//   try {
//     const result = await sql`SELECT * FROM posts`;
//     return result.rows;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function getPostByIdDb(id: string) {
  unstable_noStore();
  const uniqueId = Number(id);
  try {
    const result = prisma.posts.findUnique({
      where: {
        id: uniqueId,
      },
    });
    //console.log(result);

    if (!result) {
      throw new Error('Post not found!');
    }

    return result;
  } catch (error) {
    console.error(error);
    notFound();
    //throw new Error('Fail get current post!');
  } finally {
    console.log('It result will be always');
  }
}

// export async function getPostByIdDb(id: string) {
//   unstable_noStore();
//   try {
//     const result = sql`SELECT * FROM posts WHERE id=${id}`;

//     if (!result) {
//       throw new Error('Post not found!');
//     }

//     return (await result).rows[0];
//   } catch (error) {
//     console.error(error);
//     notFound();
//     //throw new Error('Fail get current post!');
//   } finally {
//     console.log('It result will be always');
//   }
// }

export async function removePostByIdDb(id: string) {
  unstable_noStore();
  const idRemove = Number(id);
  try {
    await prisma.posts.delete({
      where: {
        id: idRemove,
      },
    });
  } catch (error) {
    throw new Error('Fail get current post!');
  } finally {
    revalidatePath('/table');
    redirect('/table');
  }
}

// export async function removePostByIdDb(id: string) {
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

export async function searchPost(query: string) {
  unstable_noStore();
  try {
    const filterPost = await prisma.$queryRaw`
    SELECT * FROM posts WHERE posts.post_title ILIKE ${`%${query}%`}
    `;
    console.log(filterPost);
    if (filterPost) {
      return filterPost;
    }
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Failed to fetch query.');
  }
}

// export async function searchPost(query: string) {
//   unstable_noStore();
//   try {
//     const filterPost = await sql`SELECT
//     *
//   FROM posts
//   WHERE
//   posts.postname ILIKE ${`%${query}%`}`;
//     return filterPost.rows;
//   } catch (error) {
//     console.error('Database error: ', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }

export async function update(fileCode: string) {
  unstable_noStore();
  //const files = (e.target as HTMLInputElement).files;
  //const file = evt.files[0];
  //const reader = new FileReader();
  //reader.readAsDataURL(file);
  //reader.onload = async function () {
  //const res = await String(reader.result);
  // await sql`UPDATE posts
  //   SET image = ${fileCode}
  //   WHERE id = 2;`;
  console.log(fileCode);
  await prisma.posts.update({
    where: { id: 1 },
    data: { image: fileCode },
  });
  //};
  // reader.onerror = function () {
  //   console.log(reader.error);
  // };
}
