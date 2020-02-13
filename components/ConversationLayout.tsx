import * as React from 'react';

const dummy = Array(20).fill(0);

const ConversationLayout: React.FunctionComponent = () => {
  const [search, setSearch] = React.useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div className="conversation-left">
        <div className="conversation-left-header">
          <div className="input-group input-group-merge">
            <input
              type="text"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-prepended"
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <span className="fas fa-search" />
              </div>
            </div>
          </div>
          <span className="fas fa-edit" />
        </div>
        <div className="conversation-left-scrollable">
          {
            dummy.map(() => (
              <div className="channel">
                <img
                  alt=""
                  src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                  className="avatar avatar-sm rounded-circle"
                />
                <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 60px)' }}>
                  <h4>Desmond Tsoi</h4>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'left' }}>
                    <h6 className="mb-0" style={{ width: '80%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      Thanks for your question. I will probably reply by
                    </h6>
                    <h6 className="mb-0" style={{ width: '20%', textAlign: 'end' }}>Dec 19</h6>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="conversation-right">
        <div className="conversation-right-header">
          <div className="header-content">
            <img
              alt=""
              src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
              className="avatar avatar-sm rounded-circle"
            />
            <h3 className="mb-0 ml-3">Desmond Tsoi</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationLayout;
