# typr
Welcome to the typr wiki! This is a work in progress and will be constantly updated. Below you will find pages to
this wiki but also feel free to view some nice features and information about the package.

[Want to buy my next coffee? :)](https://www.buymeacoffee.com/elijahjcobb)

## Summary
typr is a recursive run-time type checking package that is simple to use yet provides all the functionality you will
ever need. Written by and for Typescript.

There are 6 different type checkers built into typr. Below I will explain all of them. Every type extends `TType`.
This provides you with a few functions below as shown below. Everything is not only type-checking during runtime, but
it is also ALL generic. Most times you won't even realize the type system working underneath. For example, if you are
checking a `OStandartType.string` and you call `.verify()` you will get back `string | undefined`. The type system is
smart enough for all types to know what you are really meaning in your type definitions because it just infers the raw
base type.

## Functions
#### `.conforms(value: any): boolean`
This will check if the value passed in conforms to the `TType` it returns a boolean for whether the value conforms.

#### `.verify(value: any): T | undefined`
This function will check if the value conforms and if it does, it will return the value with the correct types in the
type system by parsing out the raw type from the `TType` provided.

#### `.force(value: any): T`
This function is almost identical to `verify(...)` however it will return `T` instead of `T | undefined` if the value
does not conform, an error will be thrown.

## Types

### `TStandard`
The standard type object contains types like: string, number, boolean, void, undefined, null.

```typescript
import {TStandard} from "@elijahjcobb/typr";

TStandard.number.conforms(42); // true
TStandard.number.verify("Hello,  world!"); // number | undefined
TStandard.number.verify({a: 1, b: 2}); // number (may throw error)
TStandard.number.conforms("Hello, world!"); // false
TStandard.string.conforms("Hello, world!"); // true
TStandard.boolean.conforms(42); // false
```

### `TEnum`
Now if you want to check some values you can do that too with the enum type. It will return `true` if the value exists
in the accepted values provided by `.any()`.
```typescript
import {TEnum} from "@elijahjcobb/typr";

TEnum.any(true, 42, "HI").conforms(false); // false
TEnum.any(true, 42, "HI").conforms(41); // false
TEnum.any(true, 42, "HI").conforms(true); // true
TEnum.any(true, 42, "HI").conforms("HI"); // true
TEnum.any(true, 42, "HI").conforms(42); // true
```

### `TOptional`
The optional type will return `true` if the value is the correct type or if the value is `undefined`. Otherwise, it will
return false.
```typescript
import {TOptional, TStandard} from "@elijahjcobb/typr";

TOptional.maybe(TStandard.string).conforms("Hello, world!"); // true
TOptional.maybe(TStandard.string).conforms(undefined); // true
TOptional.maybe(TStandard.string).conforms(42); // false
```

### `TUnion`
The union type will return `true` if the value is any of the allowed types.
```typescript
import {TStandard, TUnion} from "@elijahjcobb/typr";

TUnion.any(TStandard.string, TStandard.number).conforms("Hello, world!"); // true
TUnion.any(TStandard.string, TStandard.number).conforms(42); // true
TUnion.any(TStandard.string, TStandard.number).conforms(true); // false
```

### `TArray`
The array type checks that the value is an array and that every value of the array is one of the accepted types. If any
of the values do not conform, the entire array does not conform.
```typescript
import {TArray, TStandard} from "@elijahjcobb/typr";

TArray.any(TStandard.string).conforms(["a", "b", "c"]); // true
TArray.any(TStandard.string).conforms(["a", 42, "c"]); // false
TArray.any(TStandard.string, TStandard.number).conforms(["a", 42, "c"]); // true
```

### `TObject`
The object type checks that all keys in the type definition passed are keys in the value passed and that each key's
value conforms. If a single key value pair does not conform, the entire object does not conform.
```typescript
import {TObject, TStandard} from "@elijahjcobb/typr";

TObject.follow({
    name: TStandard.string,
    age: TStandard.number
}).conforms({
    name: "Elijah",
    age: 21
}); // true

TObject.follow({
    name: TStandard.string,
    age: TStandard.number
}).conforms({
    name: "Elijah",
    age: true
}); // false

TObject.follow({
    name: TStandard.string,
    age: TStandard.number
}).conforms({
    name: "Elijah"
}); // false
```

### `TRegex`
The ability to handle regex checking in the oxygen type checking system. You can write your own regex with `.custom()`
or use one of the predefined regex expressions.
```typescript
import {TRegex} from "@elijahjcobb/typr";

TRegex.phone().conforms("+1 (123) 456-7890"); // true
TRegex.phone().conforms("qwqwd 1234"); // false
TRegex.email().conforms("john@gmail.com"); // true
TRegex.domain().conforms("google.com"); // true
TRegex.url().conforms("https://google.com"); // true
TRegex.custom(/#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/g).conforms("#FAFAFA"); // true
```

### `TAny`
This type is an extra type that literally always returns true. This can be used for example with `TOptional` to require
that a value is defined and it does not matter the type of the variable.
```typescript
import {TAny} from "@elijahjcobb/typr";
TAny.any().conforms(1); // true
TAny.any().conforms(undefined); // true
```

## Recursive
Keep in mind, every type checker's type input is of `TType` and every type checker is an `TType`. So you can super
easily build recursive structures and Oxygen will type check all of it!
```typescript
import {
    TArray,
    TEnum,
    TObject,
    TOptional,
    TStandard,
    TRegex
} from "@elijahjcobb/typr";

TObject.follow({
	name: TStandard.string,
    email: TRegex.email(),
	age: TStandard.number,
	favoriteNumbers: TArray.any(TStandard.number),
	address: TObject.follow({
		street: TStandard.string,
		city: TStandard.string,
		country: TStandard.string,
		zip: TStandard.number
	}),
	isAdmin: TStandard.boolean,
	parentId: TOptional.maybe(TStandard.string),
	settings: TObject.follow({
		theme: TEnum.any("light", "dark", "default"),
		keepSession: TStandard.boolean
	})
}).conforms({ /* the actual object */});
```

## About

### Language
All of typr is written in [TypeScript](https://www.typescriptlang.org). If you do not know how to use TypeScript don't
worry. It is completely compatible with JavaScript.

### Why?
It was time for me to write my own type checker!

### Author/Maintainer
My name is [Elijah Cobb](https://elijahcobb.com).