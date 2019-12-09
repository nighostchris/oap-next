import React from 'react';

interface DropdownProps {
  type: string
  position: string
  actionList: Array<string>
  functionList: Array<any>
  align?: string
}

const Dropdown : React.SFC<DropdownProps> = ({
  type, position, actionList, align,
}) => {
  const [toggle, setToggle] = React.useState(false);

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
        onBlur={() => setToggle(false)}
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
      >
        {
          actionList.map((action, index) => (
            <a
              href="#"
              key={`action-${index}`}
              className="dropdown-item"
              onClick={() => console.log('r')}
            >
              {action}
            </a>
          ))
        }
      </div>
    </div>
  );
};

export default Dropdown;
