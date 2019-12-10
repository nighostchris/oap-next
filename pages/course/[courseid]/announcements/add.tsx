import * as React from 'react';
import { NextPage } from 'next';
import TextEditor from '../../../../components/global/TextEditor';
import Modal from '../../../../components/global/Modal';

const AddAnnouncement: NextPage = () => (
  <Modal>
    <div className="card" style={{ marginBottom: 0 }}>
      <div className="card-body" style={{ maxHeight: '500px' }}>
        <div className="header mt-md-5" style={{ marginTop: '0 !important' }}>
          <div className="header-body" style={{ paddingTop: 0 }}>
            <div className="row align-items-center">
              <div className="col">
                <h1 className="header-title">
                  Create a new announcement
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Content</label>
          <TextEditor />
        </div>
      </div>
    </div>
  </Modal>
);

export default AddAnnouncement;
