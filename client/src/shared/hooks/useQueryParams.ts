import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  const add = (name: string, value: string) => {
    if (!current.has(name)) {
      current.append(name, value);

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${pathname}${query}`);
    }
  };

  const remove = (name: string) => {
    if (current.has(name)) {
      current.delete('not_activated');

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${pathname}${query}`);
    }
  };

  const has = (name: string) => {
    return current.has(name);
  };

  return {
    add,
    remove,
    has,
  };
};
