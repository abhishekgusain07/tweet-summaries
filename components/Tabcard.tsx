import React from "react";

interface TabCardProps extends React.PropsWithChildren {
  heading?: string;
  subHeading?: string;
}

export const TabCard: React.FC<TabCardProps> = ({
  heading,
  subHeading,
  children,
}) => {
  return (
    <div className="mb-20 overflow-hidden rounded-lg shadow-md animate-slide-in border dark:border-zinc-700 border-zinc-300 bg-white dark:bg-zinc-900 transition-colors">
      {heading && (
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-700 mt-2">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 dark:text-gray-100">
            {heading}
          </h3>
          {subHeading && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {subHeading}
            </p>
          )}
        </div>
      )}
      <div className="dark:bg-zinc-900">
        {children}
      </div>
    </div>
  );
};

export default TabCard;