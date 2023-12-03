'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clas from '../styles/navigation.module.scss';

interface PathProps {
  href: string;
  title: string;
}
interface PathsProps {
  paths: PathProps[];
}

export default function MobileNavigation({ paths }: PathsProps) {
  const pathName = usePathname();
  return (
    <>
      <nav className={clas.mobNavigation}>
        {paths.map((p: PathProps) => {
          return (
            <Link key={p.title} href={p.href}>
              {p.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
