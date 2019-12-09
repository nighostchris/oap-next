import React from 'react';

interface DropdownProps {
  actionList: Array<string>
  align?: string
}

const Dropdown : React.SFC<DropdownProps> = ({ actionList, align }) => {
  const [toggle, setToggle] = React.useState(false);

  const leftStyle = {
    top: '0',
    left: '0',
    position: 'absolute' as 'absolute',
    transform: 'translate3d(-150px, 25px, 0px)',
    willChange: 'transform',
  }

  return (
    <div className={`dropdown ${toggle ? 'show' : ''}`}>
      <a
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded={toggle}
        data-toggle="dropdown"
        onClick={() => setToggle(!toggle)}
        className="dropdown-ellipses dropdown-toggle"
      >
        <i className="fe fe-more-vertical" />
      </a>
      <div
        className={`dropdown-menu dropdown-menu-right" ${toggle ? 'show' : ''}`}
        x-placement={align === 'left' ? 'bottom-end' : ''}
        style={align === 'left' ? leftStyle : undefined}
      >
        {
          actionList.map((action, index) => (
            <a key={`action-${index}`} href="#" className="dropdown-item">
              {action}
            </a>
          ))
        }
      </div>
    </div>
  );
};

export default Dropdown;
