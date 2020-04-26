# oxygen
Welcome to the Oxygen wiki! This is a work in progress and will be constantly updated. Below you will find pages to
this wiki but also feel free to view some nice features and information about the package.

[Want to buy my next coffee? :)](https://www.buymeacoffee.com/elijahjcobb)

## Summary
Oxygen is a recursive run-time type checking package that is simple to use yet provides all the functionality you will
ever need. Written by and for Typescript.

There are 6 different type checkers built into Oxygen. Below I will explain all of them. Every type extends `OType`.
This provides you with `conforms:(value: void) => boolean` which tells you if a value follows the type. Also, a helpful
method is provided: `verify<T>(value: any): T | undefined` which internally calls `conforms()` and returns `undefined`
if it does not conform, or returns `T` if it conforms.

## Types

### `OStandardType`
The standard type object contains types like: string, number, boolean, void, undefined, null.

```typescript
import {OStandardType} from "@element-ts/oxygen";

OStandardType.number.conforms(42); // true
OStandardType.number.conforms("Hello, world!"); // false
OStandardType.string.conforms("Hello, world!"); // true
OStandardType.boolean.conforms(42); // false
```

### `OEnum`
Now if you want to check some values you can do that too with the enum type. It will return `true` if the value exists
in the accepted values provided by `.any()`.
```typescript
import {OEnum} from "@element-ts/oxygen";

OEnum.any(true, 42, "HI").conforms(false); // false
OEnum.any(true, 42, "HI").conforms(41); // false
OEnum.any(true, 42, "HI").conforms(true); // true
OEnum.any(true, 42, "HI").conforms("HI"); // true
OEnum.any(true, 42, "HI").conforms(42); // true
```

### `OOptional`
The optional type will return `true` if the value is the correct type or if the value is `undefined`. Otherwise, it will
return false.
```typescript
import {OOptional, OStandardType} from "@element-ts/oxygen";

OOptional.maybe(OStandardType.string).conforms("Hello, world!"); // true
OOptional.maybe(OStandardType.string).conforms(undefined); // true
OOptional.maybe(OStandardType.string).conforms(42); // false
```

### `OUnion`
The union type will return `true` if the value is any of the allowed types.
```typescript
import {OStandardType, OUnion} from "@element-ts/oxygen";

OUnion.any(OStandardType.string, OStandardType.number).conforms("Hello, world!"); // true
OUnion.any(OStandardType.string, OStandardType.number).conforms(42); // true
OUnion.any(OStandardType.string, OStandardType.number).conforms(true); // false
```

### `OArrayType`
The array type checks that the value is an array and that every value of the array is one of the accepted types. If any
of the values do not conform, the entire array does not conform.
```typescript
import {OArrayType, OStandardType} from "@element-ts/oxygen";

OArrayType.any(OStandardType.string).conforms(["a", "b", "c"]); // true
OArrayType.any(OStandardType.string).conforms(["a", 42, "c"]); // false
OArrayType.any(OStandardType.string, OStandardType.number).conforms(["a", 42, "c"]); // true
```

### `OObjectType`
The object type checks that all keys in the type definition passed are keys in the value passed and that each key's
value conforms. If a single key value pair does not conform, the entire object does not conform.
```typescript
import {OObjectType, OStandardType} from "@element-ts/oxygen";

OObjectType.follow({
    name: OStandardType.string,
    age: OStandardType.number
}).conforms({
    name: "Elijah",
    age: 21
}); // true

OObjectType.follow({
    name: OStandardType.string,
    age: OStandardType.number
}).conforms({
    name: "Elijah",
    age: true
}); // false

OObjectType.follow({
    name: OStandardType.string,
    age: OStandardType.number
}).conforms({
    name: "Elijah"
}); // false
```

### `OReget`
The ability to handle regex checking in the oxygen type checking system. You can write your own regex with `.custom()`
or use one of the predefined regex expressions.
```typescript
import {ORegex} from "@element-ts/oxygen";

ORegex.phone().conforms("+1 (123) 456-7890"); // true
ORegex.phone().conforms("qwqwd 1234"); // false
ORegex.email().conforms("john@gmail.com"); // true
ORegex.domain().conforms("google.com"); // true
ORegex.url().conforms("https://google.com"); // true
ORegex.custom(/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/g).conforms("#FAFAFA"); // true
```

### `OAny`
This type is an extra type that literally always returns true. This can be used for example with `OOptional` to require
that a value is defined and it does not matter the type of the variable.
```typescript
import {OAny} from "@element-ts/oxygen";
OAny.any().conforms(1); // true
OAny.any().conforms(undefined); // true
```

## Recursive
Keep in mind, every type checker's type input is of `OType` and every type checker is an `OType`. So you can super
easily build recursive structures and Oxygen will type check all of it!
```typescript
import {
    OArrayType,
    OEnum,
    OObjectType,
    OOptional,
    OStandardType
} from "@element-ts/oxygen";

OObjectType.follow({
	name: OStandardType.string,
	age: OStandardType.number,
	favoriteNumbers: OArrayType.any(OStandardType.number),
	address: OObjectType.follow({
		street: OStandardType.string,
		city: OStandardType.string,
		country: OStandardType.string,
		zip: OStandardType.number
	}),
	isAdmin: OStandardType.boolean,
	parentId: OOptional.maybe(OStandardType.string),
	settings: OObjectType.follow({
		theme: OEnum.any("light", "dark", "default"),
		keepSession: OStandardType.boolean
	})
}).conforms({ /* the actual object */});
```

## About

### Language
All of Oxygen is written in [TypeScript](https://www.typescriptlang.org). If you do not know how to use TypeScript don't
worry. It is completely compatible with JavaScript.

### Why?
It was time for me to write my own type checker!

### Author/Maintainer
My name is [Elijah Cobb](https://elijahcobb.com). I am a computer science student at
[Michigan Technological University](https://mtu.edu).