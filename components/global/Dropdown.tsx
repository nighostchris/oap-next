import React, { ReactElement } from 'react';

interface DropdownProps {
  type: string
  position: string
  align?: string
}

const Dropdown : React.SFC<DropdownProps> = ({
  children, type, position, align,
}) => {
  const [toggle, setToggle] = React.useState(false);

  const modifiedChildren = React.Children.map(children, (child) => React.cloneElement(
    child as ReactElement, { setT: setToggle },
  ));

  const leftStyle = {
    top: '0',
    left: '0',
    position: 'absolute' as 'absolute',
    transform: `translate3d(${position}, 25px, 0px)`,
    willChange: 'transform',
  };

  return (
    <div className={`dropdown ${toggle ? 'show' : ''}`}>
      <a
        href="#"
        aria-haspopup="true"
        aria-expanded={toggle}
        data-toggle="dropdown"
        onClick={(e) => { e.preventDefault(); setToggle(!toggle); }}
        className={`${type === 'icon' ? 'dropdown-ellipses' : 'small text-muted'} dropdown-toggle`}
      >
        {
          type === 'icon'
            ? <i className="fe fe-more-vertical" />
            : 'Sort Order'
        }
      </a>
      <div
        className={`dropdown-menu dropdown-menu-right" ${toggle ? 'show' : ''}`}
        x-placement={align === 'left' ? 'bottom-end' : ''}
        style={align === 'left' ? leftStyle : undefined}
        onBlur={() => { console.log('remove toggle'); setToggle(false); }}
      >
        {modifiedChildren}
      </div>
    </div>
  );
};

export default Dropdown;
