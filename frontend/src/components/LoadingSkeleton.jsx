import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-gray-200 rounded-md"></div>
      <div className="h-12 bg-gray-200 rounded-md"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
        <div className="h-10 bg-gray-200 rounded-md"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded-md"></div>
      <div className="flex justify-center">
        <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton; 