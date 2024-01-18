import { Metadata } from 'next';
import { AccountMenu } from '@/components/AccountMenu/AccountMenu';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `Profile | ${SEO_TITLE}`,
  description:
    "The user's profile page with information about the account and its settings.",
};

const ProfilePage = () => {
  return (
    <main className="page-container">
      <AccountMenu />
    </main>
  );
};

export default ProfilePage;
