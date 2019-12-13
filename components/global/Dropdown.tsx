import React from 'react';
import { Dropdown } from 'react-bootstrap';

interface DropdownMenuProps {
  title: string
  func: any
}

interface DropdownProps {
  title?: string
  menu: Array<DropdownMenuProps>
}

const toggleStyle = {
  color: '#95AAC9',
  fontSize: '.8125rem',
  background: 'transparent',
  borderColor: 'transparent',
};

const iconStyle = {
  fontSize: '1.0625rem',
  color: '#D2DDEC',
};

const DashkitDropdown : React.SFC<DropdownProps> = ({ title, menu }) => (
  <Dropdown drop="left">
    <style>
      {`
        .dropdown-toggle:before {
          content: none !important
        }
        .dropdown-toggle:focus {
          box-shadow: none !important
        }
      `}
    </style>
    <Dropdown.Toggle
      id="dropdown-basic"
      style={toggleStyle}
    >
      { title }
      { !title && <i style={iconStyle} className="fe fe-more-vertical" /> }
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {
        menu.map((menuItem, index) => (
          <Dropdown.Item
            href="#"
            key={`dropdownItem-${index}`}
            onClick={(e: any) => { e.preventDefault(); menuItem.func(); }}
          >
            {menuItem.title}
          </Dropdown.Item>
        ))
      }
    </Dropdown.Menu>
  </Dropdown>
);

export default DashkitDropdown;
