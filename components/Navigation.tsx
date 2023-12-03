'use client';
import clas from '../styles/navigation.module.scss';
import clasBtn from '../styles/buttonMenu.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MobileNavigation from './MobileNavigation';

const paths = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/blog',
    title: 'JSONPosts',
  },
  {
    href: '/table',
    title: 'DBPosts',
  },
  {
    href: '/about',
    title: 'About',
  },
];

export default function Navigation() {
  const pathName = usePathname();
  const [open, setOpen] = useState(430);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    function mo() {
      setOpen(window.innerWidth);
    }
    window.addEventListener('resize', mo);
  }, [open, mobile]);

  function openHandler() {
    document.querySelector('body')?.classList.toggle('overlay');
    setMobile((prev) => !prev);
  }

  return (
    <>
      {open > 420 ? (
        <nav className={clas.navigation}>
          {paths.map((p) => {
            return (
              <Link className={p.href === pathName ? `${clas.active}` : ''} key={p.title} href={p.href}>
                {p.title}
              </Link>
            );
          })}
        </nav>
      ) : null}

      {mobile && open < 420 ? <MobileNavigation paths={paths} /> : null}

      <button className={clasBtn.buttonMenu} type='button' onClick={openHandler}>
        {!mobile ? '☰' : '⨯'} <span className='visuallyHidden'>Menu</span>
      </button>
    </>
  );
}
function componentDidMount() {
  throw new Error('Function not implemented.');
}
