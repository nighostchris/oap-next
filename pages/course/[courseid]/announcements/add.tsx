import * as React from 'react';
import { NextPage } from 'next';
import TextEditor from '../../../../components/global/TextEditor';
import Root from '../../../../components/root-layout/Root';

const AddAnnouncement: NextPage = () => (
  <Root>
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-8">
          <div className="header mt-md-5">
            <div className="header-body">
              <div className="row align-items-center">
                <div className="col">
                  <h1 className="header-title">Create a new announcement</h1>
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
    </div>
  </Root>
);

export default AddAnnouncement;
