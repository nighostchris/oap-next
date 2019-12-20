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
          <span className="fas fa-edit" style={{ fontSize: '22px', marginLeft: '10px' }} />
        </div>
        <div className="conversation-left-scrollable">
          {
            dummy.map(() => (
              <div className="channel">
                <img
                  alt=""
                  src="https://www.cse.ust.hk/admin/people/faculty/photos/desmond.jpg"
                  className="avatar avatar-sm rounded-circle"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h4>Desmond Tsoi</h4>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6>Thanks for your question</h6>
                    <h6>Dec 19</h6>
                  </div>
                </div>
              </div>
            ))
          }
          
        </div>
      </div>
      <div className="conversation-right">
      </div>
    </div>
  );
};

export default ConversationLayout;
