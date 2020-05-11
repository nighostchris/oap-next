import React from 'react';
import dynamic from 'next/dynamic';
import { TestCaseContext } from './contexts/TestCaseContext';

const DynamicEditor = dynamic(import('./Editor'), { ssr: false });

const CodeEditor: React.FC = () => {
  const { state: testsState, dispatch: testsDispatch } = React.useContext(TestCaseContext);

  return (
    <>
      <div className="col-12 col-xl-2">
        <p>Testing</p>
      </div>
      <div className="col-12 col-xl-10 px-0">
        <DynamicEditor />
      </div>
    </>
  );
};

export default CodeEditor;
