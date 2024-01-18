'use client';

import { useEffect, useState } from 'react';
import UserService from '@/services/user/user.service';
import { IUser } from '@/shared/types/user.interface';
import styles from './AdminUsersList.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { CrossIcon } from '@/shared/assets/icons/CrossIcon/CrossIcon';
import { Typography } from '@/shared/components/Typography/Typography';
import { Placeholder } from '@/shared/components/Placeholder/Placeholder';
import { RolesEnum } from '@/shared/types/role.interface';

export const AdminUsersList = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    UserService.getMany()
      .then(({ users, totalCount }) => {
        setUsers(users);
        setTotalCount(totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  const handleLoadMore = async () => {
    const { users } = await UserService.getMany({ offset: offset + 20 });

    setUsers((prev) => [...prev, ...users]);
    setOffset((prev) => prev + 20);
  };

  if (loading) {
    return null;
  }

  if (error) {
    return <Placeholder type="error">Something went wrong</Placeholder>;
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {users.map(({ id, name, surname, roles }) => (
          <li key={id} className={styles.item}>
            <Typography variant="body-1">
              {name} {surname} - {roles.map((role) => role.name).join(', ')}
            </Typography>

            {roles.every(({ name }) => name !== RolesEnum.ADMIN) && (
              <Button className={styles.delete_button} variant="icon">
                <CrossIcon />
              </Button>
            )}
          </li>
        ))}
      </ul>

      {totalCount > users.length && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
    </div>
  );
};
