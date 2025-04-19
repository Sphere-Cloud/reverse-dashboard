import '../styles/ellipsisMenu.css';
import { SlOptionsVertical } from 'react-icons/sl';
import { useState } from 'react';

interface EllipsisMenuProps {
  items: { id: number; name: string; action: () => void }[];
}

const EllipsisMenu = ({ items }: EllipsisMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SlOptionsVertical onClick={handleShowOptions} />
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '-50px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            border: '1px solid #ddd',
          }}
        >
          {items.map((item) => (
            <div className="option" key={item.id} style={{ cursor: 'pointer' }} onClick={item.action}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EllipsisMenu;
