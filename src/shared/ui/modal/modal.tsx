import { ReactNode, useRef, MouseEvent } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  isOpened,
  onClose,
  children,
}: {
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  if (!isOpened) {
    return null;
  }
  const handleOnClickOutside = (e: MouseEvent) => {
    if (e.target === ref.current) {
      onClose();
    }
    e.stopPropagation();
  };
  return (
    <div
      ref={ref}
      onClick={handleOnClickOutside}
      className="absolute left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/40 text-primary"
    >
      <div className="rounded-[5px] border-[1px] border-cBorder bg-grey drop-shadow-base">
        {children}
      </div>
    </div>
  );
};
