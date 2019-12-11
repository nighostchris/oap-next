import React from 'react';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

interface ListItemProps {
  content: {
    title: string
    subtitle: string
    button?: {
      title: string
      link: string
    }
    id: number
  }
  avatar: {
    type: string
    src: string
  }
}

interface ListProps {
  listItem: Array<ListItemProps>
}

const List : React.SFC<ListProps> = ({ listItem }) => (
  <ul className="list-group list-group-lg list-group-flush list my-n4">
    {
      listItem.map((item, index) => (
        <li key={`listItem-${index}`} className="list-group-item px-0">
          <div className="row align-items-center">
            <div className="col-auto">
              {
                item.avatar
                  && (
                    <div className="avatar avatar-lg">
                      {
                        item.avatar.type === 'icon'
                          ? (
                            <span className="avatar-title rounded bg-white text-secondary">
                              <span className={item.avatar.src} />
                            </span>
                          )
                          : (
                            <img
                              alt=""
                              src={item.avatar.src}
                              className="avatar-img rounded"
                            />
                          )
                      }
                    </div>
                  )
              }
            </div>
            <div className="col ml-n2">
              <h4 className="card-title mb-1 name">
                <a href={`/coursework/${item.content.id}/announcements`}>{item.content.title}</a>
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
              <Dropdown
                type="icon"
                align="left"
                position="-150px"
              >
                <DropdownItem title="Edit" func={() => console.log('edit')} />
                <DropdownItem title="Delete" func={() => console.log('delete')} />
              </Dropdown>
            </div>
          </div>
        </li>
      ))
    }
  </ul>
);

export default List;
