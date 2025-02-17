import React from "react";
import { Head } from "./Head";

interface PageTitleProps extends React.PropsWithChildren {
  heading: string;
  subHeading?: string;
  dashboard?: boolean;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  heading,
  subHeading,
  dashboard,
}) => {
  return (
    <div className={`py-8 pl-4 border-b md:pl-${dashboard ? '0' : '6'} border-zinc-300 dark:border-zinc-700`}>
      <Head title={heading} />
      <h1 className="mx-auto mb-2 text-3xl font-bold max-w-7xl dark:text-zinc-100">{heading}</h1>
      <p className="mx-auto max-w-7xl text-zinc-500 dark:text-zinc-400">{subHeading}</p>
    </div>
  );
};
