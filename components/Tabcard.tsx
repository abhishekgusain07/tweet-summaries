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
    <div className="mb-20 overflow-hidden border rounded-lg shadow-md animate-slide-in border-zinc-300">
      {heading && (
        <div className="px-5 py-4 bg-white border-b border-gray-200 mt-2">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 ">
            {heading}
          </h3>
          {subHeading && <p className="text-muted-foreground text-sm mt-2">{subHeading}</p>}
        </div>
      )}
      {children}
    </div>
  );
};
