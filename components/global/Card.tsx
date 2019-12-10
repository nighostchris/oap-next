import React from 'react';
import List from './List';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';

interface Info {
  category: string
  value: string
}

interface CardProps {
  //onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type: string
  title?: string
  link?: string
  content?: string
  footer?: string
  teamfooter?: string
  listItem?: Array<any>
  sortable?: boolean
  searchable?: boolean
  infoList?: Array<Info>
}

const Card : React.SFC<CardProps> = ({
  type, title, link, content, footer,
  teamfooter, sortable, searchable, listItem, infoList,
}) => {
  const [keyword, setKeyword] = React.useState('');
  const [mode, setMode] = React.useState(0);

  const ascFunc = () => setMode(1);
  const dscFunc = () => setMode(2);

  const compareListItem = (a: any, b: any) => {
    if (a.content.title > b.content.title) {
      return -1;
    }
    if (a.content.title < b.content.title) {
      return 1;
    }
    return 0;
  };

  const filterListItem = () => {
    if (listItem) {
      const filtered = listItem.filter(
        (item) => item.content.title.toLowerCase().includes(keyword),
      );
      switch (mode) {
        case 0:
          return filtered;
        case 1:
          return filtered.sort(compareListItem);
        default:
          return filtered.sort(compareListItem).reverse();
      }
    } else {
      return [];
    }
  };

  return (
    <div
      className="card mx-2"
      style={{ flex: 1 }}
      data-toggle={type === 'list' && 'lists'}
      data-options={type === 'list' && '{"valueNames": ["name"]}'}
    >
      {
        type === 'list'
          && (
            <>
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="card-header-title">
                      {title}
                    </h4>
                  </div>
                  {
                    sortable
                      && (
                        <div className="col-auto">
                          <Dropdown
                            type="text"
                            align="left"
                            position="-80px"
                          >
                            <DropdownItem title="Asc" func={ascFunc} />
                            <DropdownItem title="Dsc" func={dscFunc} />
                          </Dropdown>
                        </div>
                      )
                  }
                </div>
              </div>
              {
                searchable
                  && (
                    <div className="card-header">
                      <div className="row">
                        <div className="col-12">
                          <form>
                            <div className="input-group input-group-flush input-group-merge">
                              <input
                                type="search"
                                value={keyword}
                                placeholder="Search"
                                onChange={(e) => setKeyword(e.target.value)}
                                className="form-control form-control-prepended search"
                              />
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <span className="fe fe-search" />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )
              }
            </>
          )
      }
      <div className="card-body">
        {
          type === 'footer'
            && (
              <>
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{content}</p>
                <div className="btn btn-primary">
                  <i className="fas fa-arrow-right" />
                </div>
              </>
            )
        }
        {
          type === 'team'
            && (
              <>
                <div className="text-center">
                  <a href="team-overview.html" className="card-avatar avatar avatar-lg mx-auto">
                    <img
                      src={link}
                      alt=""
                      className="avatar-img rounded"
                    />
                  </a>
                </div>
                <h2 className="card-title text-center mb-3">
                  <a href="/course/1/overview">{title}</a>
                </h2>
                <p className="card-text text-center text-muted mb-4">{content}</p>
                <hr />
                <div className="row align-items-center">
                  <div className="col">
                    <p className="card-text small text-muted">
                      {teamfooter}
                    </p>
                  </div>
                </div>
              </>
            )
        }
        {
          type === 'list'
            && (
              <List listItem={filterListItem()} />
            )
        }
        {
          type === 'post'
            && (
              <>
                <div className="mb-3">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <div className="avatar">
                        <img
                          alt="..."
                          src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      <h4 className="card-title mb-1">
                        {title}
                      </h4>
                      <p className="card-text small text-muted">
                        <span className="fe fe-clock" />
                        ` 4 days ago`
                      </p>
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
                </div>
                <p className="mb-3">
                  {content}
                </p>
              </>
            )
        }
        {
          type === 'info'
            && (
              infoList
                && (
                  infoList.map((info, index) => (
                    <React.Fragment key={`info-${index}`}>
                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="mb-0">{info.category}</h5>
                        </div>
                        <div className="col-auto">
                          <div className="small text-muted">
                            {info.value}
                          </div>
                        </div>
                      </div>
                      {
                        index !== infoList.length - 1 && <hr />
                      }
                    </React.Fragment>
                  ))
                )
            )
        }
      </div>
      {
        footer
          && (
            <div
              className="card-footer bg-dark"
              style={{
                position: 'inherit',
                bottom: '0',
                width: '100%',
              }}
            >
              <p style={{ marginBottom: 0, color: 'white' }}>{footer}</p>
            </div>
          )
      }
    </div>
  );
};

export default Card;
