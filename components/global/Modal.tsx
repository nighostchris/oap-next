import React from 'react';

interface ModalProps {
}

const Modal : React.SFC<ModalProps> = ({ children }) => (
  <div
    tabIndex={-1}
    role="dialog"
    id="modalMembers"
    aria-hidden="true"
    className="modal fade show"
    style={{ display: 'block', paddingRight: '17px' }}
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-card">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
