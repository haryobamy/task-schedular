import { PropsWithChildren, Suspense } from 'react';

const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <svg
      className="animate-spin h-5 w-5 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  </div>
);

// Props type for the Suspensed component
type SuspensedProps = {
  className?: string; // To accept custom class names if needed
};

export function Suspensed({
  children,
  className,
  ...props
}: PropsWithChildren<SuspensedProps>) {
  return (
    <Suspense
      fallback={
        <div
          {...props}
          className={`flex justify-center items-center h-full ${className}`}
        >
          <Loader />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
