import React from 'react';

interface TableProps {
  thead: Array<string>
  tbody: Array<JSX.Element>
  textAlign?: 'default' | 'center'
  scrollable?: boolean
  bordered?: boolean
}

/*
const scrollbarStyle = {
  '::-webkit-scrollbar': {
    width: '.8rem',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '.8rem',
    backgroundClip: 'padding-box',
    border: '2px solid transparent',
    backgroundColor: 'rgba(128, 128, 128, .7)',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, .05), inset 1px 1px 0 rgba(0, 0, 0, .05)',
  },
};
*/


const Table : React.SFC<TableProps> = ({
  thead, tbody, textAlign = 'default', scrollable, bordered,
}) => {
  console.log(tbody);

  return (
  <div
    className={textAlign === 'center' ? 'text-center' : undefined}
    style={{ ...(scrollable && { 'overflowY': 'auto', 'height': '60vh' }) }}
  >
    <table className={`table ${bordered && 'table-bordered'}`}>
      <thead>
        <tr>
          <th scope="col">#</th>
          {
            thead.map((th, index) => (
              <th key={`th-${index}`} scope="col">{th}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          tbody.map((tr, index) => (
            <tr>
              <th scope="row">{index}</th>
              { tr }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
  );
};

export default Table;
