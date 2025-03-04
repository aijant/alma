import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  return (
    <div>
      <main className="w-full min-h-[calc(100vh_-_216px)] h-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
