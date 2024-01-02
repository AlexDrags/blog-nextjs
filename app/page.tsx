import Image from 'next/image';
import styles from './page.module.css';
import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Main blog page',
};

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <p>
        It my traning SPA project on NEXT.js framework. <br />
        I am used local state for clien components and <br />
        JSONPlaceholder API with for SSR this project. <br />
      </p>
      <h3>Implemented technologies:</h3>
      <ul>
        <li>static and dynamic routind</li>
        <li>preloading, error page and not-found pages</li>
        <li>data fetchind</li>
        <li>styling</li>
        <li>image next optimization</li>
        <li>caching: time base-revalidation</li>
        <li>vercel deploying</li>
      </ul>
    </>
  );
}
