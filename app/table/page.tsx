// import { getDbData } from '@/app/lib/dbData';
import { getDbData, searchPost } from '@/app/lib/dbData';
import Search from '@/components/Search';
import clas from '@/styles/buttonCreate.module.scss';
import Link from 'next/link';
import clasDesk from '@/styles/deskPosts.module.scss';
interface DB {
  db: any;
}
interface PostProps {
  id: bigint;
  post_author: string;
  email: string;
  post_title: string;
  post_message: string;
  image: any;
  date: any;
  time: any;
}
export default async function Page({ searchParams }: { searchParams: { query: string } }) {
  const db: any = await getDbData();
  const searchRes: any = await searchPost(`${searchParams.query}`);
  //console.log(`${db[0].time}`.split(' ').slice(4, 5).join(' '));

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
        <h3>Seatch result:</h3>
        <ul>
          {searchRes &&
            searchRes.map((item: PostProps) => {
              const { id, post_title, time, date } = item;
              return (
                <li className={clasDesk.itemList} key={`${id}`}>
                  <Link href={`/table/${id}`}>{post_title}</Link>
                  <p>
                    {`${date}`.split(' ').slice(0, 3).join(' ')} {`${time}`.split(' ').slice(4, 5).join(' ')}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <ul>
          {db.map((item: PostProps) => {
            const { id, post_title, time, date } = item;
            return (
              <li className={clasDesk.itemList} key={`${id}`}>
                <Link href={`/table/${id}`}>{post_title}</Link>
                <p>
                  {`${date}`.split(' ').slice(0, 3).join(' ')} {`${time}`.split(' ').slice(4, 5).join(' ')}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
