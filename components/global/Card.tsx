import React from 'react';
import List from './List';
import Dropdown from './Dropdown';

interface CardProps {
  //onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type: string
  title: string
  link?: string
  content?: string
  footer?: string
  teamfooter?: string
  listItem?: Array<any>
  sortable?: boolean
  searchable?: boolean
}

const Card : React.SFC<CardProps> = ({
  type, title, link, content, footer, teamfooter, sortable, searchable, listItem,
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
    console.log(mode);
    if (listItem) {
      switch (mode) {
        case 0:
          return listItem.filter((item) => item.content.title.toLowerCase().includes(keyword));
        case 1:
          return listItem.sort(compareListItem);
        default:
          return listItem.sort(compareListItem).reverse();
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
                            actionList={['Asc', 'Dsc']}
                            functionList={[ascFunc, dscFunc]}
                          />
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
