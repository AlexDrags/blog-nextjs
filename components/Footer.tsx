import classFooter from '../styles/footer.module.scss';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className={classFooter.footer}>
      <p>
        Use resources:{' '}
        <Link href={'https://jsonplaceholder.typicode.com/'} target='blank'>
          &#123;JSON&#125; Placeholder
        </Link>
      </p>
      <p>
        Copyright{' '}
        <Link href={'https://alexdrags.github.io/my-cv/'} target='_blank'>
          AleksanderK &copy;
        </Link>{' '}
        2023.
      </p>
    </footer>
  );
}
