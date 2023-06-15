"use client"
import { useOutClick } from "@/hooks/useOutClick";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

interface ModalProps {
  toggleModal: () => void;
  blockClosing?: boolean;
  children: ReactNode;
}

export const Modal = ({ toggleModal, children, blockClosing }: ModalProps) => {
    const ref = useOutClick(toggleModal)

  return createPortal(
    <div className="bg-gradient-to-b from-[rgba(0,0,0,0.19940476190476186)] to-color-grey-1 fixed top-0 flex h-screen w-screen items-center justify-center">
      <div
        role="dialog"
        className="shadow-[0 0 25px  0 rgba(0,0,0,.25)] min-w-max h-max bg-color-grey-5 relative"
        ref={blockClosing ? null : ref}>
        <button className="absolute top-4 right-4" onClick={toggleModal}>
          <MdClose size={28} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
