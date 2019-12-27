import * as React from 'react';
import { Button } from 'react-bootstrap';
import Root from '../components/root-layout/Root';

export default class SettingPage extends React.Component<{}, { darkMode: string | null }> {
  constructor(props: any) {
    super(props);
    this.state = ({
      darkMode: '',
    });
  }

  componentDidMount() {
    this.setState({ darkMode: localStorage.getItem('dark-mode') });
  }

  setDarkMode = () => {
    localStorage.setItem('dark-mode', String(this.state.darkMode));
  }

  render() {
    const dm = this.state.darkMode;

    return (
      <Root>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-8">
              <div className="header mt-md-5">
                <div className="header-body">
                  <div className="row align-items-center">
                    <div className="col">
                      <h1 className="header-title">Settings</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Color Scheme</label>
                <small className="form-text text-muted">
                  Overall light or dark presentation
                </small>
                <div className="btn-group-toggle d-flex mb-4">
                  <label
                    className={`btn btn-white col ${dm === 'light' && 'focus active'}`}
                    onClick={() => this.setState({ darkMode: 'light' })}
                  >
                    <input type="radio" />
                    <i className="fe fe-sun mr-2" /> Light Mode
                  </label>
                  <label
                    className={`btn btn-white col ml-2 ${dm === 'dark' && 'focus active'}`}
                    onClick={() => this.setState({ darkMode: 'dark' })}
                  >
                    <input type="radio" />
                    <i className="fe fe-moon mr-2" /> Dark Mode
                  </label>
                </div>
              </div>
              <Button href="/settings" variant="primary" onClick={() => this.setDarkMode()}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Root>
    );
  }
}
