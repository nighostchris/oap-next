interface testReflectionInterface {
  name: string
  field: any
  constructor: Array<any>
  method: any
}

const testReflectionResult: Array<testReflectionInterface> = [{
  name: "Player",
  field: {
    "name": "string",
    "units": "array"
  },
  constructor: [["string"]],
  method: {
    "getName": [],
    "equals": ["object"],
    "readyAllUnits": [],
    "getUnitList": [],
    "getUnitById": ["char"],
    "hasUnitsRemaining": [],
    "addUnit": ["Unit"],
    "hasReadyUnits": []
  }
}, {
  name: "Archer",
  field: {
    "DEFENSE_ARCHER": "int",
    "ATTACK_ARCHER": "int",
    "MOVEMENT_RANGE_ARCHER": "int",
    "ATTACK_RANGE_ARCHER": "int"
  },
  constructor: [["char", "int", "int"]],
  method: {
    "attackUnit": ["Unit"],
    "toString": [],
    "receiveDamage": ["double", "Unit"]
  }
}];

export const libraryImport = `import org.junit.Assert.*;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.Rule;\n
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;\n\n`;

const constructTest = (child: any) => {
  if (child === undefined) {
    return null;
  }

  let result = ``;

  for (let i = 0; i < child.length; i++) {
    if (child[i].type === "assertion" || child[i].type === "function") {
      result += `${child[i].name}(` + constructTest(child[i].child) + ");";
    } else if (child[i].type === "assertion-function") {
      if (i !== child.length - 1 || i === 0) {
        result += `${child[i].name}.invoke(` + constructTest(child[i].child) + ")";
      } else {
        result += `, ${child[i].name}.invoke(` + constructTest(child[i].child) + ");";
      }
    } else if (child[i].type === "dataInput") {
      if (i !== child.length - 1 || i === 0) {
        result += child[i].name;
      } else {
        result += `, "${child[i].name}"`;
      }
    } else if (["object", "int", "double", "float"].includes(child[i].type)) {
      if (i === 0) {
        result += child[i].value;  
      } else {
        result += `, ${child[i].value}`;
      }
    } else if (["string", "char"].includes(child[i].type)) {
      if (i === 0) {
        result += `"${child[i].value}"`;
      } else {
        result += `, "${child[i].value}"`;
      }
    }
  };

  return result;
}

export const preSetup = (testsState: any) => {
  console.log(testsState);
  let staticTemplate: any[] = [];
  let setUpBeforeClassTemplate = ["@BeforeClass\npublic static void setUpBeforeClass() throws Exception\n{"];
  let afterClassTemplate = ["@AfterClass\npublic static void tearDownAfterClass() throws Exception\n{"];
  let setUpTemplate = ["@Before\npublic void setUp() throws Exception\n{"];
  let tearDownTemplate = ["@After\npublic void tearDown() throws Exception\n{"];
  let tests: any[] = [];

  testReflectionResult.forEach((reflectedClass: any) => {
    reflectedClass.constructor.forEach((reflectedConstructor: any, constructorIndex: number) => {
      let className = reflectedClass.name;
      let constructorName = `${className.toLowerCase()}Constructor${constructorIndex + 1}`;
      let staticConstructorField = `static Constructor<${className}> ${constructorName};`;
      staticTemplate.push(staticConstructorField);

      // Construct getDeclaredConstructor
      let declaredConstructor = `${constructorName} = ${className}.class.getDeclaredConstructor(`;

      reflectedConstructor.forEach((param: any, paramIndex: number) => {
        const capitalizeParam = !["int", "float", "double", "char", "boolean"].includes(param)
          ? param.charAt(0).toUpperCase() + param.slice(1)
          : param;

        if (paramIndex !== reflectedConstructor.length - 1) {
          declaredConstructor += `${capitalizeParam}.class, `;
        } else {
          declaredConstructor += `${capitalizeParam}.class);`;
        }
      });

      setUpBeforeClassTemplate.push(declaredConstructor);
      setUpBeforeClassTemplate.push(`${constructorName}.setAccessible(true);`);

      afterClassTemplate.push(`${constructorName} = null;`);
    });

    // Construct static Field and getDeclaredField
    Object.keys(reflectedClass.field).forEach((key: string) => {
      staticTemplate.push(`static Field ${key};`);

      setUpBeforeClassTemplate.push(`${key} = ${reflectedClass.name}.class.getDeclaredField("${key}");`);
      setUpBeforeClassTemplate.push(`${key}.setAccessible(true);`);

      afterClassTemplate.push(`${key} = null;`);
    });

    // Construct static Method and getDeclaredMethod
    Object.entries(reflectedClass.method).forEach(([key, value]: [any, any]) => {
      staticTemplate.push(`static Method ${key};`);
      let declaredMethod = `${key} = ${reflectedClass.name}.class.getDeclaredMethod("${key}"`;

      value.forEach((v: any) => {
        const capitalizeV = !["int", "float", "double", "char", "boolean"].includes(v)
          ? v.charAt(0).toUpperCase() + v.slice(1)
          : v;
        declaredMethod += `, ${capitalizeV}.class`;
      });

      setUpBeforeClassTemplate.push(declaredMethod + ");");
      setUpBeforeClassTemplate.push(`${key}.setAccessible(true);`);

      afterClassTemplate.push(`${key} = null;`);
    });
  });

  testsState.variables.forEach((variable: any) => {
    let instance = `\t${variable.name} = ${variable.class.toLowerCase()}Constructor1.newInstance(`;
    
    variable.params.forEach((param: any, paramIndex: number) => {
      let paramValue = !["int", "float", "double", "boolean"].includes(param) ? `"${param.value}"` : param.value;

      if (paramIndex !== variable.params.length - 1) {
        instance += `${paramValue}, `;
      } else {
        instance += `${paramValue});`;
      }
    });

    setUpTemplate.push(instance);
    tearDownTemplate.push(`\t${variable.name} = null;`);
  });

  testsState.tests.forEach((test: any) => {
    let testTemplate = `@Test\npublic void ${test.name}() throws Exception\n{\n\t`;
    let childIterator = test.child;
    testTemplate += constructTest(childIterator);
    tests.push(testTemplate);
  });

  return staticTemplate.join("\n") + "\n\n" + setUpBeforeClassTemplate.join("\n\t") + "\n}\n\n" + afterClassTemplate.join("\n\t") + "\n}\n\n"
    + setUpTemplate.join("\n") + "\n}\n\n" + tearDownTemplate.join("\n") + "\n}\n\n" + tests.join("\n") + "\n}";
}
