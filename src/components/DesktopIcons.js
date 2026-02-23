import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MenuList, MenuListItem } from 'react95';
import { useDrag } from '../hooks/useDrag';

import paintIcon from '../assets/paint.ico';
import folderIcon from '../assets/folder.ico';
import computerIcon from '../assets/computer.ico';
import explorerIcon from '../assets/explorer.ico';
import binIcon from '../assets/bin.ico';
import emptyBinIcon from '../assets/emptybin.ico';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  cursor: default;
  user-select: none;

  img {
    width: 48px;
    height: 48px;
    pointer-events: none;
  }

  span {
    margin-top: 4px;
    color: white;
    font-size: 11px;
    text-align: center;
    text-shadow: 1px 1px 1px black;
    pointer-events: none;
  }
`;

// desktop icon component with image and label, draggable and with a context menu (only for the bin)
function DeskIcon({ src, label, style, onContextMenu }) {
  const { ref, onMouseDown } = useDrag();

  return (
    <Wrapper
      ref={ref}
      style={style}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}
    >
      <img src={src} alt={label} draggable={false} />
      <span>{label}</span>
    </Wrapper>
  );
}

// set of icons to show on the desktop, with their image, label and position
// the bin has id 'bin' to handle its special logic (icon swap + context menu)
const icons = [
  { src: folderIcon, label: 'src', style: { top: 120, left: 80 } },
  { src: paintIcon, label: 'Paint', style: { top: 210, left: 80 } },
  { src: computerIcon, label: 'My Computer', style: { top: 16, right: 16 } },
  { src: explorerIcon, label: 'Internet Explorer', style: { top: 106, right: 16 } },
  { id: 'bin', src: binIcon, label: 'Recycle Bin', style: { bottom: 16, right: 16 } },
];

function DesktopIcons() {
  const [binEmpty, setBinEmpty] = useState(false);
  const [menu, setMenu] = useState(null);

  const handleBinContextMenu = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ x: rect.left - 140, y: rect.top });
  };

  const handleEmpty = () => {
    setBinEmpty(true);
    setMenu(null);
  };

  // close menu on any click
  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menu]);

  return (
    <>
      {icons.map((icon) => (
        <DeskIcon
          key={icon.label}
          // if bin is empty, show the empty bin icon
          src={icon.id === 'bin' && binEmpty ? emptyBinIcon : icon.src}
          label={icon.label}
          style={icon.style}
          onContextMenu={icon.id === 'bin' ? handleBinContextMenu : undefined}
        />
      ))}
      {menu && (
        <MenuList
          style={{ position: 'fixed', zIndex: 2000, left: menu.x, top: menu.y }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <MenuListItem size="sm" disabled={binEmpty} onClick={handleEmpty}>
            Empty Recycle Bin
          </MenuListItem>
        </MenuList>
      )}
    </>
  );
}

export default DesktopIcons;
