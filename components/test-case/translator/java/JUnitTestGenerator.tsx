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
    "getName": ["object"],
    "equals": ["object", "object"],
    "readyAllUnits": ["object"],
    "getUnitList": ["object"],
    "getUnitById": ["object", "char"],
    "hasUnitsRemaining": ["object"],
    "addUnit": ["object", "object"],
    "hasReadyUnits": ["object"]
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
    "attackUnit": ["object"],
    "toString": [],
    "receiveDamage": ["double", "object"]
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

export const staticTemplate = () => {
  let result = ``;
  let setUpBeforeClassTemplate = `@BeforeClass\n` + 
  `public static void setUpBeforeClass() throws Exception\n{\n\t`;

  testReflectionResult.forEach((reflectedClass: any) => {
    reflectedClass.constructor.forEach((reflectedConstructor: any, constructorIndex: number) => {
      let className = reflectedClass.name;
      let constructorName = `${className.toLowerCase()}Constructor${constructorIndex + 1}`;
      let staticConstructorField = `static Constructor<${className}> ${constructorName};\n`;
      result += staticConstructorField;

      setUpBeforeClassTemplate += `${constructorName} = ${className}.class.getDeclaredConstructor(`;
      reflectedConstructor.forEach((param: any, paramIndex: number) => {
        if (paramIndex !== reflectedConstructor.length - 1) {
          setUpBeforeClassTemplate += `${param}.class, `;
        } else {
          setUpBeforeClassTemplate += `${param}.class);\n\t`;
        }
      });
      setUpBeforeClassTemplate += `${constructorName}.setAccessible(true);\n\t`
    });

    // reflectedClass.
  });

  return [result, setUpBeforeClassTemplate];
}
