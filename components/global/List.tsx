import React from 'react';
import Dropdown from './Dropdown';

interface ListItemProps {
  content: {
    title: string
    subtitle: string
    button?: {
      title: string
      link: string
    }
    link: string
  }
  avatar: JSX.Element
}

interface ListProps {
  listItem: Array<ListItemProps>
}

const listItemDropdown = [{ title: 'Delete', func: () => {} }];

const List : React.SFC<ListProps> = ({ listItem }) => (
  <ul className="list-group list-group-lg list-group-flush list my-n4">
    {
      listItem.map((item, index) => (
        <li key={`listItem-${index}`} className="list-group-item px-0">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="avatar avatar-lg">{item.avatar}</div>
            </div>
            <div className="col ml-n2">
              <h4 className="card-title mb-1 name">
                <a href={item.content.link}>{item.content.title}</a>
              </h4>
              <p className="card-text small text-muted">
                {item.content.subtitle}
              </p>
            </div>
            <div className="col-auto">
              {
                item.content.button
                  && (
                    <a href={item.content.button.link} className="btn btn-sm btn-white d-none d-md-inline-block">
                      {item.content.button.title}
                    </a>
                  )
              }
            </div>
            <div className="col-auto">
              <Dropdown menu={listItemDropdown} />
            </div>
          </div>
        </li>
      ))
    }
  </ul>
);

export default List;
