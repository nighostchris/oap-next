import React from 'react';

interface DropdownItemProps {
  title: string,
  func: any,
  setT?: any,
}

const DropdownItem : React.SFC<DropdownItemProps> = ({ title, func, setT }) => (
  <a
    href="#"
    className="dropdown-item"
    onClick={(e) => { e.preventDefault(); func(); setT(false); }}
  >
    {title}
  </a>
);

export default DropdownItem;
