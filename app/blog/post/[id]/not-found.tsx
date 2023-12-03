import Link from 'next/link';
export default function NotFound() {
  return (
    <>
      <h1>Sorry post , not found</h1>
      <Link href={'/blog'}>Back to all posts</Link>
    </>
  );
}
