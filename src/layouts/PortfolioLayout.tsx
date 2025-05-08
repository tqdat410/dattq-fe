import React from "react";

type PortfolioLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const PortfolioLayout = ({ children, sidebar }: PortfolioLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar: 1/4 width, fixed */}
      <div className="w-1/4 fixed left-10 top-1/2 -translate-y-1/2 z-10 flex justify-center">
        {sidebar}
      </div>
      {/* Main content: 3/4 width, with left margin */}
      <div className="w-3/4 ml-[25%]">{children}</div>
    </div>
  );
};

export default PortfolioLayout;
