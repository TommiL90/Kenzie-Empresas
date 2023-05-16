import { ReactNode } from "react";
import './Drawer.scss';

interface IDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, children }: IDrawerProps) => {
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer-content">{children}</div>
    </div>
  );
};

export default Drawer;
