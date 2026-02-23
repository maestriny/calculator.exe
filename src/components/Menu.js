import styled from 'styled-components';
import { Toolbar, Button } from 'react95';

const StyledToolbar = styled(Toolbar)`
  display: flex;
  gap: 0;
`;

const MenuButton = styled(Button).attrs({ variant: 'thin', size: 'sm' })`
  font-size: 13px;
`;

const ITEMS = ['File', 'Edit', 'View', 'Calculator', 'Help'];

function Menu({ onHelp }) {
  return (
    <StyledToolbar>
      {ITEMS.map((item) => (
        <MenuButton key={item} onClick={item === 'Help' ? onHelp : undefined}>
          {item}
        </MenuButton>
      ))}
    </StyledToolbar>
  );
}

export default Menu;
