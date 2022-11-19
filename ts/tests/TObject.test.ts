/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TObjectTypeDefinition } from "../TObject";
import { T } from "../index";

describe("OObjectType", (): void => {
  const tests: {
    expect: TObjectTypeDefinition<any>;
    value: any;
    truthy: boolean;
  }[] = [
    {
      expect: {},
      value: {},
      truthy: true,
    },
    {
      expect: {
        name: T.string(),
        age: T.number(),
      },
      value: {
        name: "Elijah",
        age: 21,
      },
      truthy: true,
    },
    {
      expect: {
        name: T.string(),
        age: T.number(),
      },
      value: {
        name: "Elijah",
        age: true,
      },
      truthy: false,
    },
    {
      expect: {
        name: T.string(),
        setting: T.object({
          isDark: T.boolean(),
          notificationTime: T.number(),
        }),
      },
      value: {
        name: "Elijah",
        setting: {
          isDark: true,
          notificationTime: 2332,
        },
      },
      truthy: true,
    },
    {
      expect: {
        name: T.string(),
        settings: T.object({
          isDark: T.boolean(),
          notificationTime: T.number(),
        }),
      },
      value: {
        name: "Elijah",
        setting: true,
      },
      truthy: false,
    },
    {
      expect: {
        name: T.string(),
        settings: T.object({
          isDark: T.boolean(),
          notificationTime: T.number(),
        }),
      },
      value: {
        name: "Elijah",
        setting: {
          isDark: true,
          notificationTime: "2332",
        },
      },
      truthy: false,
    },
    {
      expect: {
        name: T.string(),
        settings: T.object({
          isDark: T.boolean(),
          notificationTime: T.number(),
        }),
      },
      value: {
        name: "Elijah",
        setting: {
          isDark: 32,
          notificationTime: 2332,
        },
      },
      truthy: false,
    },
    {
      expect: {
        x: T.object({
          y: T.object({
            z: T.string(),
          }),
        }),
      },
      value: {
        x: {
          y: {
            z: "Hello, world!",
          },
        },
      },
      truthy: true,
    },
    {
      expect: {
        x: T.object({
          y: T.object({
            z: T.string(),
          }),
        }),
      },
      value: {
        x: {
          y: {},
          z: "Hello, world!",
        },
      },
      truthy: false,
    },
  ];

  let i: number = 0;
  for (const t of tests) {
    test("Test " + i, (): void => {
      expect(T.object(t.expect).conforms(t.value)).toEqual(t.truthy);
    });
    i++;
  }
});
