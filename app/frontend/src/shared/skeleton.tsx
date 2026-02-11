export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`bg-gray-600 animate-pulse rounded my-1 ${className}`} />
  );
};
