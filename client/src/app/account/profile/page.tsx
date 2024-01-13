import { Metadata } from 'next';
import { AccountMenu } from '@/components/AccountMenu/AccountMenu';
import { SEO_TITLE } from '@/shared/constants/seo';

const mainMetaData = {
  title: `Profile | ${SEO_TITLE}`,
  description:
    "The user's profile page with information about the account and its settings.",
};

export const metadata: Metadata = {
  ...mainMetaData,
  openGraph: mainMetaData,
};

const ProfilePage = () => {
  return (
    <main className="page-container">
      <AccountMenu />
    </main>
  );
};

export default ProfilePage;
