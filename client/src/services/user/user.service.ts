import { api } from '@/api/api.instance';
import { IRole } from '@/shared/types/role.interface';
import { IUser } from '@/shared/types/user.interface';
import { getParamsString } from '@/utils/getParamsString';

const UserService = {
  async getMany(queryParams?: {
    count?: number;
    offset?: number;
    query?: string;
  }) {
    const { count, offset, query } = queryParams || {};
    const { data, headers } = await api.get<IUser[]>(
      `/user${getParamsString({
        count,
        offset,
        query,
      })}`
    );

    return {
      users: data,
      totalCount: +headers['x-total-count'],
    };
  },

  async getOne(email: string) {
    const response = await api.get<IUser & { roles: IRole[] }>(
      `/user/${email}`
    );
    return response.data;
  },

  async delete(email: string) {
    return await api.delete<void>(`/user/${email}`);
  },
};

export default UserService;
