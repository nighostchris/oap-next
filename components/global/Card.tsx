import React from 'react';
import List from './List';
import Dropdown from './Dropdown';

interface Info {
  category: string
  value: string
}

interface CardProps {
  type: 'team' | 'footer' | 'info' | 'post' | 'list' | 'stat'
  title?: string
  link?: string
  content?: string
  icon?: string
  footer?: string
  teamfooter?: string
  listItem?: Array<any>
  sortable?: boolean
  searchable?: boolean
  infoList?: Array<Info>
}

const compareListItem = (a: any, b: any) => {
  if (a.content.title > b.content.title) {
    return -1;
  }
  if (a.content.title < b.content.title) {
    return 1;
  }
  return 0;
};

const filterListItem = (listItem: (Array<any> | undefined), keyword: string, mode: number) => {
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

const listCard = (title: string, listItem: (Array<any> | undefined),
  sortable: boolean, searchable: boolean, keyword: string, setKeyword: any,
  mode: number, setMode: any) => {
  const listItemDropdown = [{ title: 'Asc', func: () => setMode(1) }, { title: 'Dsc', func: () => setMode(2) }];

  return (
    <div className="card mx-2" style={{ flex: 1 }} data-toggle="lists">
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
                    <Dropdown title="Sort By" menu={listItemDropdown} />
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
      <div className="card-body">
        <List listItem={filterListItem(listItem, keyword, mode)} />
      </div>
    </div>
  );
};

const footerCard = (title: string, content: string, footer: string) => (
  <div className="card mx-2" style={{ flex: 1 }}>
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{content}</p>
      <div className="btn btn-primary">
        <i className="fas fa-arrow-right" />
      </div>
    </div>
    <div className="card-footer bg-dark" style={{ position: 'inherit', bottom: '0', width: '100%' }}>
      <p style={{ marginBottom: 0, color: 'white' }}>{footer}</p>
    </div>
  </div>
);

const teamCard = (link: string, title: string, content: string, teamfooter: string) => (
  <div className="card mx-2" style={{ flex: 1 }}>
    <div className="card-body">
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
        <a href="/course/1/announcements">{title}</a>
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
    </div>
  </div>
);

const infoCard = (title: string, infoList: Array<Info>) => (
  <div className="card" style={{ flex: 1 }}>
    {
      title
        && (
          <div className="card-header" style={{ fontWeight: 'bold' }}>
            {title}
          </div>
        )
    }
    <div className="card-body">
      {
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
      }
    </div>
  </div>
);

const postCard = (title: string, content: string) => {
  const listItemDropdown = [{ title: 'Edit', func: () => {} }, { title: 'Delete', func: () => {} }];

  return (
    <div className="card mx-2" style={{ flex: 1 }}>
      <div className="card-body">
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
              <Dropdown menu={listItemDropdown} />
            </div>
          </div>
        </div>
        <p className="mb-3">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </div>
    </div>
  );
};

const statCard = (title: string, content: string, icon: string) => (
  <div className="card mx-4" style={{ flex: 1 }}>
    <div className="card-body" style={{ padding: '0.6rem 4rem' }}>
      <div className="row align-items-center">
        <div className="col">
          <h6 className="card-title text-uppercase text-muted mb-2">
            {title}
          </h6>
          <span className="h2 mb-0">
            {content}
          </span>
        </div>
        <div className="col-auto">
          <span className={icon} style={{ fontSize: 22 }} />
        </div>
      </div>
    </div>
  </div>
);

const Card : React.SFC<CardProps> = ({
  children, type, title, link, content, icon, footer,
  teamfooter, sortable, searchable, listItem, infoList,
}) => {
  const [keyword, setKeyword] = React.useState('');
  const [mode, setMode] = React.useState(0);

  return (
    type === 'team' ? teamCard(link as string, title as string, content as string, teamfooter as string)
      : (type === 'footer' ? footerCard(title as string, content as string, footer as string)
        : (type === 'info' ? infoCard(title as string, infoList as Info[])
          : (type === 'post' ? postCard(title as string, content as string)
            : (type === 'list' ? listCard(title as string, listItem as any[], sortable as boolean,
              searchable as boolean, keyword as string, setKeyword as any, mode as number,
                setMode as any)
              : (type === 'stat' ? statCard(title as string, content as string, icon as string)
                : (
                  <div className="card mx-2" style={{ flex: 1 }}>
                    <div className="card-body">
                      {children}
                    </div>
                  </div>
                ))))))
  );
};

export default Card;
