import React from 'react';

interface VariableInterface {
  class: string
  name: string
  constructor: number
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
    case 'REMOVE_TEST':
      return {
        ...state,
        tests: state.tests.filter((_test: any, index: number) => index !== action.id)
      };
    case 'ADD_VARIABLE_CLASS':
      return {
        ...state,
        variables: [...state.variables, { category: 'class', class: '', name: '', constructor: 1, params: [] }]
      };
    case 'ADD_VARIABLE_BASIC':
      return {
        ...state,
        variables: [...state.variables, { category: 'basic', type: '', name: '', value: '' }]
      };
    case 'REMOVE_VARIABLE':
      return {
        ...state,
        variables: state.variables.filter((_variable: any, index: number) => index !== action.id)
      };
    case 'MODIFY_VARIABLE_NAME':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? { ...variable, name: action.name }
          : variable)
      };
    case 'MODIFY_VARIABLE_TYPE':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? {
            ...variable,
            type: action.typeValue,
            name: '',
            value: action.typeValue === "boolean" ? true : "",
            ...(action.typeValue === "ArrayList" && { subtype: '' })
          }
          : variable
        )
      }
    case 'MODIFY_VARIABLE_SUBTYPE':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? {
            ...variable,
            subtype: action.subtype
          }
          : variable
        )
      }
    case 'MODIFY_VARIABLE_CONSTRUCTOR':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? {
              ...variable,
              constructor: action.constructor,
              params: action.params.map((param: any) => { return { type: param, value: param === "boolean" ? true : undefined }; }) 
          }
          : variable)
      };
    case 'MODIFY_VARIABLE_CLASS':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? {
              ...variable,
              class: action.class, 
              constructor: 1,
              params: action.params.map((param: any) => { return { type: param, value: param === "boolean" ? true : undefined }; }) 
          }
          : variable)
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
    case 'MODIFY_VARIABLE_VALUE':
      return {
        ...state,
        variables: state.variables.map((variable: any, index: number) => index === action.vid
          ? {
            ...variable,
            value: action.value
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
    case 'REMOVE_ASSERTION':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.filter((_c: any, cIndex: number) => cIndex !== action.id[1])
          }
          : test
        )
      };
    case 'ADD_LOCAL_VARIABLE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id
          ? {
            ...test,
            child: [
              ...test.child,
              {
                id: test.child.length,
                type: 'local-variable',
                var_type: '',
                name: '',
                value: ''
              }
            ]
          }
          : test
        )
      };
    case 'MODIFY_LOCAL_VARIABLE_NAME':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                name: action.name
              }
              : c
            )
          }
          : test
        )
      };
    case 'MODIFY_LOCAL_VARIABLE_VALUE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                value: action.value
              }
              : c
            )
          }
          : test
        )
      };
    case 'MODIFY_LOCAL_VARIABLE_SUBTYPE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                var_subtype: action.varSubtype
              }
              : c
            )
          }
          : test
        )
      };
    case 'MODIFY_LOCAL_VARIABLE_TYPE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                id: c.id,
                type: 'local-variable',
                name: '',
                var_type: action.varType,
                value: action.varType === "boolean" ? true : "",
                ...(action.varType === "ArrayList" && { var_subtype: '' })
              }
              : c
            )
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
                    input_type: action.inputType,
                    value: action.value
                  }
                ]
              }
              : c
            )
          }
          : test
        )
      };
    case 'MODIFY_DATA_INPUT_TYPE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                child: c.child.map((dInput: any, index: number) => index === action.id[2]
                  ? {
                    ...dInput,
                    input_type: action.inputType,
                    value: action.inputType === "boolean" ? true : ""
                  }
                  : dInput
                )
              }
              : c
            )
          }
          : test
        )
      };
    case 'MODIFY_DATA_INPUT_VALUE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                child: c.child.map((dInput: any, index: number) => index === action.id[2]
                  ? {
                    ...dInput,
                    value: action.value
                  }
                  : dInput
                )
              }
              : c
            )
          }
          : test
        )
      };
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
                    child: action.params.map((param: any, index: number) => ({ id: index, type: param }))
                  }
                ]
              }
              : c
            )
          }
          : test
        )
      };
    case 'MODIFY_INSTANCE':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                child: c.child.map((af: any, index: number) => index === action.id[2]
                  ? {
                    ...af,
                    child: af.child.map((ins: any, index: number) => index === action.id[3]
                      ? {
                        ...ins,
                        id: index,
                        value: action.value
                      }
                      : ins
                    )
                  }
                  : af
                )
              }
              : c
            )
          }
          : test
        )
      };
    case 'ADD_FUNCTION':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id
          ? {
            ...test,
            child: [
              ...test.child,
              {
                id: test.child.length,
                type: 'function',
                name: action.name,
                child: action.params.map((param: any, index: number) => ({ id: index, type: param }))
              }
            ]
          }
          : test
        )
      };
    case 'REMOVE_FUNCTION':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.filter((_c: any, cIndex: number) => cIndex !== action.id[1])
          }
          : test
        )
      }
    case 'MODIFY_PARAMETER':
      return {
        ...state,
        tests: state.tests.map((test: any, index: number) => index === action.id[0]
          ? {
            ...test,
            child: test.child.map((c: any, index: number) => index === action.id[1]
              ? {
                ...c,
                child: c.child.map((param: any, index: number) => index === action.id[2]
                  ? {
                    ...param,
                    value: action.value
                  }
                  : param
                )
              }
              : c
            )
          }
          : test
        )
      };
    default: 
      return state;
  };
};
