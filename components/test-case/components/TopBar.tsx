import React from 'react';
import { Form, ButtonGroup, Button } from 'react-bootstrap';

interface TopBarProps {
  language: string
  setLanguage: (value: string | ((prevVar: string) => string)) => void
  viewController: boolean
  setViewController: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const TopBar: React.FunctionComponent<TopBarProps> = ({ language, setLanguage, viewController, setViewController }) => {
  return (
    <div className="row mx-0 align-items-center justify-content-center" style={{ height: '60px', borderBottom: '1px solid #E3EBF6' }}>
      <Form.Group className="mb-0" style={{ display: 'inline-flex', flexDirection: 'row', position: 'absolute', left: '0.75rem' }}>
        <Form.Label className="mb-0 mr-3" style={{ alignSelf: 'center' }}>Language</Form.Label>
        <Form.Control
          as="select"
          value={language}
          onChange={(e) => setLanguage((e.target as HTMLInputElement).value)}
        >
          {
            ["C++", "Java", "Python"].map((option, index) => (
              <option key={`type-option-${index}`}>
                {option}
              </option>
            ))
          }
        </Form.Control>
      </Form.Group>
      <ButtonGroup style={{ justifySelf: 'center' }}>
        <Button
          variant={viewController ? "secondary" : "outline-secondary"}
          onClick={() => {
            if (!viewController) {
              setViewController(true);
            }
          }}
        >
          Diagram
        </Button>
        <Button
          variant={viewController ? "outline-secondary" : "secondary"}
          onClick={() => {
            if (viewController) {
              setViewController(false);
            }
          }}
        >
          Code
        </Button>
      </ButtonGroup>
      <Button className="mr-3" variant="outline-primary" style={{ position: 'absolute', right: '4.4rem' }}>Discard</Button>
      <Button variant="outline-primary" style={{ position: 'absolute', right: '.75rem' }}>Save</Button>
    </div>
  );
};

export default TopBar;