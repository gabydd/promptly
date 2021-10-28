import { PropsWithChildren } from "react";

const StyledButton = ({
  children,
  type,
}: PropsWithChildren<{
  type?: "button" | "submit" | "reset" | undefined;
}>) => {
  return (
    <button type={type} className="bg-blue-600 rounded-full w-full text-white">
      {children}
    </button>
  );
};

export default StyledButton;
