# type-guarder

type-guarder is a recursive run-time type checking package that is simple to use yet provides all the functionality you will
ever need. Written by and for Typescript.

## TLDR

```typescript
import { T } from "@elijahjcobb/type-guarder";

const body = T.Object({
  name: T.Object({
    first: T.String(),
    last: T.String(),
  }),
  email: T.Regex(^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phone: T.Nullable(T.string()),
  address: T.Nullable(
    T.Object({
      street: T.String(),
      apt: T.Nullable(T.String()),
      zip: T.Union(T.String(), T.Integer()),
    })
  ),
}).assert(await req.json())
```

In the above example, `body` will automatically have the following type:

```typescript
typeof body = {
  name: {
    first: string;
    last: string;
  }
  email: string;
  phone: string | null;
  address: {
    street: string;
    apt: string | null;
    zip: string | number;
  } | null
}
```

## Functions

#### `.assert(value: any): T`

Given a specific type, check a value for conformance and return the typed value. If the value does not conform to the type, a `TError` will be thrown.

#### `.check(value: any): T | null`

This function will check if the value conforms to the type. If it does, it will return the value with the correct typing. If not, it will return undefined.

#### `.conforms(value: any): boolean`

Returns a boolean denoting whether the value provided conforms to the specific type.

## Usage

### Import

```typescript
import { T } from "@elijahjcobb/type-guarder";
```

### `T.String`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.String().conforms("Hello, world"); // true
T.String().conforms(null); // false
T.String().conforms(3); // false

T.String({ minLength: 8 }).conforms("abc"); // false
T.String({ maxLength: 2 }).conforms("abc"); // false
T.String({ minLength: 1, maxLength: 4 }).conforms("abc"); // true
```

### `T.Boolean`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Boolean().conforms(true); // true
T.Boolean().conforms(3); // false
T.Boolean().conforms("Hello, world"); // false
T.Boolean().conforms(null); // false
```

### `T.Number`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Number().conforms(3); // true
T.Number().conforms("Hello, world"); // false
T.Number().conforms(null); // false

T.Number({ min: 5 }).conforms(3); // false
T.Number({ max: 5 }).conforms(10); // false
T.Number({ min: 1, max: 4 }).conforms(3); // true
```

> Note, you can also use `T.Integer` and `T.Float` with the same options for more fine grained type checking.

#### `T.Integer`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Integer().conforms(3); // true
T.Integer().conforms(3.14); // false
T.Integer().conforms("Hello, world"); // false
T.Integer().conforms(null); // false
```

#### `T.Float`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Float().conforms(3.14); // true
T.Float().conforms(3); // false
T.Float().conforms("Hello, world"); // false
T.Float().conforms(null); // false
```

### `T.Null`

> Note, you will probably rarely use `T.Null`, however it is used in higher order types like `T.Nullable` with a `T.Union`.

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Null().conforms(null); // true
T.Null().conforms(3); // false
T.Null().conforms("Hello, world"); // false
T.Null().conforms(true); // false
```

### `T.Nullable`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Nullable(T.Number()).conforms(null); // true
T.Nullable(T.Number()).conforms(3); // true
T.Nullable(T.Number()).conforms("Hello, world"); // false
T.Nullable(T.Number()).conforms(true); // false
```

### `T.Undefined`

> Note, you will probably rarely use `T.Undefined`, however it is used in higher order types like `T.Undefinable` with a `T.Union`.

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Undefined().conforms(undefined); // true
T.Undefined().conforms(3); // false
T.Undefined().conforms("Hello, world"); // false
T.Undefined().conforms(true); // false
```

### `T.Undefinable`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Undefinable(T.Number()).conforms(undefined); // true
T.Undefinable(T.Number()).conforms(3); // true
T.Undefinable(T.Number()).conforms("Hello, world"); // false
T.Undefinable(T.Number()).conforms(true); // false
```

### `T.Optional`

> Note, this is just a `T.Union` of `T`, `T.Null`, and `T.Undefined`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Optional(T.Number()).conforms(null); // true
T.Optional(T.Number()).conforms(undefined); // true
T.Optional(T.Number()).conforms(3); // true
T.Optional(T.Number()).conforms("Hello, world"); // false
T.Optional(T.Number()).conforms(true); // false
```

### `T.Union`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Union(T.Number(), T.String()).conforms("Hello, world!"); // true
T.Union(T.Number(), T.String()).conforms(3); // true
T.Union(T.Number(), T.String()).conforms(null); // false
T.Union(T.Number(), T.String()).conforms([]); // false
T.Union(T.Number(), T.String()).conforms(true); // false

T.Union(T.Integer(), T.Boolean(), T.String()).conforms(true); // true
T.Union(T.Integer(), T.Boolean(), T.String()).conforms(3); // true
T.Union(T.Integer(), T.Boolean(), T.String()).conforms(3.4); // false
```

### `T.Array`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Array(T.Number(), T.String()).conforms([3, "hi", 2]); // true
T.Array(T.Number(), T.String()).conforms([1, 2, 3]); // true
T.Array(T.Number(), T.String()).conforms([3, false, 2]); // false
```

### `T.ArrayWithOptions`

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.ArrayWithOptions({
  types: [T.Number(), T.String()],
  options: { minLength: 8, maxLength: 16 },
}).conforms([3, "hi", 2]); // false
```

### `T.Object`

```typescript
import { T } from "@elijahjcobb/type-guarder";

const checker = T.Object({
  a: T.String(),
  b: T.Number(),
  c: T.Boolean();
})

checker.conforms({
  a: "Hello, world!",
  b: 123,
  c: true
}) // true

checker.conforms({
  a: "Hello, world!",
  b: 123,
}) // false

checker.conforms({
  a: "Hello, world!",
  b: 123,
  c: "nope"
}) // false
```

### `T.Regex`

```typescript
import { T } from "@elijahjcobb/type-guarder";

const checker = T.Regex(^[^\s@]+@[^\s@]+\.[^\s@]+$/);

checker.conforms("jane@doe.com"); // true
checker.conforms("janedoe.com"); // false
checker.conforms(8); // false
```

### Recursion

```typescript
import { T } from "@elijahjcobb/type-guarder";

T.Object({
  name: T.Object({
    first: T.String(),
    last: T.String(),
  }),
  email: T.Regex(^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  phone: T.Nullable(T.string()),
  address: T.Nullable(
    T.Object({
      street: T.String(),
      apt: T.Nullable(T.String()),
      zip: T.Union(T.String(), T.Integer()),
    })
  ),
});
```

## Author/Maintainer

My name is [Elijah Cobb](https://elijahcobb.dev).
