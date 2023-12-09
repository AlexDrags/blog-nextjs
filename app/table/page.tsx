import { getDbData, searchPost } from '@/app/lib/dbData';
import Search from '@/components/Search';
import clas from '@/styles/buttonCreate.module.scss';
import Link from 'next/link';
import clasDesk from '@/styles/deskPosts.module.scss';
interface DB {
  db: any;
}
interface PostProps {
  id: string;
  postname: string;
  posttext: string;
  date: string;
  time: string;
}
export default async function Page({ searchParams }: { searchParams: { query: string } }) {
  const db: any = await getDbData();
  const searchRes = await searchPost(`${searchParams.query}`);

  return (
    <>
      <div className={clasDesk.wrapper}>
        <h2>Posts list:</h2>
        <Search />
        <Link className={clas.buttonCreate} href={`/newPosts`}>
          Create new post
        </Link>
      </div>
      <div>
        <ul>
          {db.map((item: PostProps) => {
            const { id, postname, date, time } = item;
            return (
              <li className={clasDesk.itemList} key={id}>
                <Link href={`/table/${id}`}>{postname}</Link>
                <p>
                  {date} {time}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Seatch result:</h3>
        <ul>
          {searchRes &&
            searchRes.map((item) => {
              const { id, postname, date, time } = item;
              return (
                <li className={clasDesk.itemList} key={id}>
                  <Link href={`/table/${id}`}>{postname}</Link>
                  <p>
                    {date} {time}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
