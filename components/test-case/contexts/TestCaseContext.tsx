import React from 'react';

interface VariableInterface {
  class: string
  params: Array<any>
}

interface TestCaseInterface {
  id: number
  name: string
  child: Array<any>
};

interface InitialStateType {
  variables: Array<VariableInterface>
  tests: Array<TestCaseInterface>
};

const initialState = {
  variables: [],
  tests: []
};

export const TestCaseContext = React.createContext<{state: InitialStateType; dispatch: React.Dispatch<any>}>({
  state: initialState, dispatch: () => null });

export const testsReducer = (state: any, action: any) => {
  switch(action.type) {
    case 'ADD_TEST':
      return {
        ...state,
        tests: [...state.tests, { id: state.tests.length, name: '', child: [] }]
      };
    case 'RENAME_TEST':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id ? { ...test, name: action.name } : test)
      };
    case 'ADD_VARIABLE':
      return {
        ...state,
        variables: [...state.variables, { class: '', params: [] }]
      };
    case 'MODIFY_VARIABLE_CLASS':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid ? { ...variable, class: action.class } : variable)
      };
    case 'MODIFY_VARIABLE_PARAMS':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? {
            ...variable,
            params: variable.params.map((param: any, index: number) => index === action.pid ? action.param : param )
          }
          : variable
        )
      };
    case 'ADD_ASSERTION':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id
          ? {
            ...test,
            child: [
              ...test.child,
              {
                id: test.child.length,
                type: 'assertion',
                name: action.name,
                child: []
              }
            ]
          }
          : test
        )
      };
    case 'ADD_DATA_INPUT':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                child: [
                  ...c.child,
                  {
                    id: c.child.length,
                    type: 'dataInput',
                    name: action.name
                  }
                ]
              }
              : c
            )
          }
          : test
        )
      }
    case 'ADD_ASSERTION_FUNCTION':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                child: [
                  ...c.child,
                  {
                    id: c.child.length,
                    type: 'assertion-function',
                    name: action.name,
                    child: new Array(action.params).map((_param: any, index: number) => { return { id: index } })
                  }
                ]
              }
              : c
            )
          }
          : test
        )
      }
    default: 
      return state;
  };
};
