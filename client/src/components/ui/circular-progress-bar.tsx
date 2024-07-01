import { PropsWithChildren } from 'react';

type Props = {
  percentage: number;
  color?: string;
};

export function CircularProgressBar({
  percentage = 0,
  children,
  color,
}: PropsWithChildren<Props>) {
  const getRotation = (percentages: number) => {
    return {
      rightRotation: percentages <= 50 ? percentage * 3.6 : 180,
      leftRotation: percentages > 50 ? (percentage - 50) * 3.6 : 0,
    };
  };

  const { rightRotation, leftRotation } = getRotation(percentage);

  return (
    <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-4 border-gray-100">
      <div className="absolute w-full h-full clip-0-50">
        <div
          className="absolute w-full h-full rounded-full right-clip transform origin-center transition-transform duration-500"
          style={{
            backgroundColor: color,
            transform: `rotate(${rightRotation}deg)`,
          }}
        />
      </div>
      <div className="absolute w-full h-full clip-50-100">
        <div
          className="absolute w-full h-full  rounded-full left-clip transform origin-center transition-transform duration-500"
          style={{
            backgroundColor: color,
            transform: `rotate(${leftRotation}deg)`,
          }}
        />
      </div>
      <div className="absolute w-9 h-9 bg-white rounded-full flex items-center justify-center ">
        <span className="text-blue-500 font-semibold text-xs">{children}</span>
      </div>
    </div>
  );
}
