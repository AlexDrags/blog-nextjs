import Link from 'next/link';

export const metadata = {
  title: 'Contacts | NextJS',
};
export default function Contacts() {
  return (
    <>
      <h1>Contacts page</h1>
      <Link href={'https://alexdrags.github.io/my-cv/'} target='_blank'>
        AleksanderK &copy;
      </Link>{' '}
    </>
  );
}
