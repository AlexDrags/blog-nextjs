'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function Search() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }
  return (
    <input
      onChange={(e) => handleSearch(e.target.value)}
      placeholder='Input search text..'
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
