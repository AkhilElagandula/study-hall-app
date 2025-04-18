import React from "react";

interface LoaderProps {
  isOpen?: boolean;
}

/**  Component to show loader between page mounts */
const Loading: React.FC<LoaderProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#19548D]"></div>
    </div>
  );
};

export default Loading;
