import Image from 'next/image';
import profilePic from '../../../public/photo.png';
export const metadata = {
  title: 'Team | NextJS',
};
export default function Team() {
  return (
    <>
      <h1>Team page</h1>
      <Image src={profilePic} alt='Picture of the author' width={310} height={160} />
      <p>
        Front-end developer, I have 2 years of non-commercial development experience.I like to lead a sporty lifestyle.
        I&apos;m a quick learner.I regularly follow the development news and am interested in new technologies and
        tools.
      </p>
    </>
  );
}
