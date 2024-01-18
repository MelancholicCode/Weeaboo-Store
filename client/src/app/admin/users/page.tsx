import { Metadata } from 'next';
import { AdminUsersList } from '@/components/AdminUsersList/AdminUsersList';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `User Management | ${SEO_TITLE}`,
  description: 'A panel for managing store users.',
};

const AdminUsersPage = async () => {
  return (
    <main className="page-container">
      <AdminUsersList />
    </main>
  );
};

export default AdminUsersPage;
