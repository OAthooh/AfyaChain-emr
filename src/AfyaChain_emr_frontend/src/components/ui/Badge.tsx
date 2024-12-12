interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'gray', size = 'md' }: BadgeProps) {
  const variantClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium
      ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
} 