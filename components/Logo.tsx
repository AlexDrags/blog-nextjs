import styles from '../styles/logo.module.scss';
import Link from 'next/link';
export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href={'/'}>Blog</Link>
    </div>
  );
}
