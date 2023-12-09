'use client';
import clas from '@/styles/search.module.scss';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);
  return (
    <div className={clas.searchWrapper}>
      <input
        className={clas.search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder='Input search text..'
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className={clas.searchIcon} />
    </div>
  );
}
