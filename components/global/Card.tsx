import React from 'react';

interface CardProps {
  //onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  type: string
  title: string
  link?: string
  content: string
  footer?: string
  teamfooter?: string
}

const Card : React.SFC<CardProps> = ({
  type, title, link, content, footer, teamfooter,
}) => (
  <div className="card mx-2" style={{ flex: 1 }}>
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
                <a href="/course/1">{title}</a>
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
    </div>
    {
      footer
        && (
          <div className="card-footer bg-dark">
            <p style={{ marginBottom: 0, color: 'white' }}>{footer}</p>
          </div>
        )
    }
  </div>
);

export default Card;
