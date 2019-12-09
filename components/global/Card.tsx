import React from 'react';
import List from './List';

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
  const filterListItem = () => (
    listItem ? listItem.filter((item) => item.content.title.toLowerCase().includes(keyword))
      : []);

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
                          <div className="dropdown">
                            <a
                              href="#!"
                              data-toggle="dropdown"
                              aria-expanded="false"
                              className="small text-muted dropdown-toggle"
                            >
                              Sort order
                            </a>
                            <div
                              className="dropdown-menu"
                              x-placement="bottom-start"
                              style={{
                                top: '0',
                                left: '0',
                                position: 'absolute',
                                willChange: 'transform',
                                transform: 'translate3d(0px, 20px, 0px)',
                              }}
                            >
                              <div className="dropdown-item sort desc" data-sort="name">
                                Asc
                              </div>
                              <div className="dropdown-item sort desc" data-sort="name">
                                Desc
                              </div>
                            </div>
                          </div>
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
