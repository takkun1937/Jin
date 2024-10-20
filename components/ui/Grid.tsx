import { HTMLAttributes } from 'react';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns: 1 | 2 | 3; // 列の数
  gap: 'gap-1' | 'gap-2' | 'gap-3' | 'gap-4';
}

export default function Grid({
  columns,
  gap,
  className,
  children,
  ...props
}: GridProps) {
  const columnsClassNames = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
  };

  return (
    <div
      className={`grid overflow-y-auto ${columnsClassNames[columns]} ${gap} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
