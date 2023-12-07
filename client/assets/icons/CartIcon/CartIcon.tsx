import { FC } from 'react';

interface CartIconProps {
  className?: string;
}

export const CartIcon: FC<CartIconProps> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 64 64">
      <path d="m13 38h40a2 2 0 0 0 1.93-1.47l6-22a2 2 0 0 0 -1.93-2.53h-46.25l-.75-4.35a2 2 0 0 0 -2-1.65h-5a2 2 0 0 0 0 4h3.33l4.28 24a7 7 0 0 0 .39 14h1.68a7 7 0 1 0 12.63 0h10.37a7 7 0 1 0 12.63 0h5.69a2 2 0 0 0 0-4h-43a3 3 0 0 1 0-6z" />
    </svg>
  );
};
