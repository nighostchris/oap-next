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

export const preSetup = () => {
  let staticTemplate: any[] = [];
  let setUpBeforeClassTemplate = ["@BeforeClass\npublic static void setUpBeforeClass() throws Exception\n{"];

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
    });

    // Construct static Field and getDeclaredField
    Object.keys(reflectedClass.field).forEach((key: string) => {
      staticTemplate.push(`static Field ${key};`);
      setUpBeforeClassTemplate.push(`${key} = ${reflectedClass.name}.class.getDeclaredField("${key}");`);
      setUpBeforeClassTemplate.push(`${key}.setAccessible(true);`);
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
    });
  });

  return [staticTemplate.join("\n") + "\n\n", setUpBeforeClassTemplate.join("\n\t") + "\n}"];
}
