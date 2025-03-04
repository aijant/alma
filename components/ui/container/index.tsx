import { FC, PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
  className?: string;
}
const Container: FC<IProps> = ({ className, children }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-8 md:py-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
