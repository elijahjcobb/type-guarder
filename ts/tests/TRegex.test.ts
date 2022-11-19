/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { T } from "../index";

describe("ORegex", (): void => {
  describe("Email", (): void => {
    test("t1", (): void =>
      expect(T.regex.email().conforms("john@gmail.com")).toBeTruthy());
    test("t2", (): void => expect(T.regex.email().conforms("")).toBeFalsy());
    test("t3", (): void =>
      expect(T.regex.email().conforms("@gmail.com")).toBeFalsy());
    test("t4", (): void =>
      expect(T.regex.email().conforms("@gmail")).toBeFalsy());
    test("t5", (): void =>
      expect(T.regex.email().conforms("john@")).toBeFalsy());
    test("t6", (): void =>
      expect(T.regex.email().conforms("john@.com")).toBeFalsy());
    test("t7", (): void =>
      expect(T.regex.email().conforms("@gmail.com")).toBeFalsy());
    test("t8", (): void =>
      expect(T.regex.email().conforms("john@.com")).toBeFalsy());
    test("t9", (): void =>
      expect(T.regex.email().conforms("@.com")).toBeFalsy());
  });

  describe("Domain", (): void => {
    test("t1", (): void =>
      expect(T.regex.domain().conforms("gmail.com")).toBeTruthy());
    test("t2", (): void =>
      expect(T.regex.domain().conforms("a.b.c.com")).toBeTruthy());
    test("t3", (): void =>
      expect(T.regex.domain().conforms("mail.google.com")).toBeTruthy());
    test("t4", (): void =>
      expect(T.regex.domain().conforms(".com")).toBeFalsy());
    test("t5", (): void =>
      expect(T.regex.domain().conforms("google")).toBeFalsy());
    test("t6", (): void =>
      expect(T.regex.domain().conforms("google.")).toBeFalsy());
  });

  describe("URL", (): void => {
    test("t1", (): void =>
      expect(T.regex.url().conforms("http://gmail.com")).toBeTruthy());
    test("t2", (): void =>
      expect(T.regex.url().conforms("https://gmail.com")).toBeTruthy());
    test("t3", (): void =>
      expect(T.regex.url().conforms("http://gmail.com/hi")).toBeTruthy());
    test("t4", (): void =>
      expect(T.regex.url().conforms("gmail.com")).toBeTruthy());
    test("t5", (): void =>
      expect(T.regex.url().conforms("a.b.c.com")).toBeTruthy());
    test("t6", (): void =>
      expect(T.regex.url().conforms("mail.google.com")).toBeTruthy());
    test("t7", (): void => expect(T.regex.url().conforms(".com")).toBeFalsy());
    test("t8", (): void =>
      expect(T.regex.url().conforms("google")).toBeFalsy());
    test("t9", (): void =>
      expect(T.regex.url().conforms("google.")).toBeFalsy());
  });

  describe("Phone", (): void => {
    test("t1", (): void =>
      expect(T.regex.phone().conforms("+1 (123) 456 - 7890")).toBeTruthy());
    test("t2", (): void =>
      expect(T.regex.phone().conforms("+1 (123) 456 -7890")).toBeTruthy());
    test("t3", (): void =>
      expect(T.regex.phone().conforms("+1 (123) 456- 7890")).toBeTruthy());
    test("t4", (): void =>
      expect(T.regex.phone().conforms("+1 (123) 456-7890")).toBeTruthy());
    test("t5", (): void =>
      expect(T.regex.phone().conforms("+1 (123)456-7890")).toBeTruthy());
    test("t6", (): void =>
      expect(T.regex.phone().conforms("+11234567890")).toBeTruthy());
    test("t7", (): void =>
      expect(T.regex.phone().conforms("+1 123 456 - 7890")).toBeTruthy());
    test("t8", (): void =>
      expect(T.regex.phone().conforms("2112")).toBeFalsy());
    test("t9", (): void =>
      expect(T.regex.phone().conforms("123467890a")).toBeFalsy());
    test("t0", (): void => expect(T.regex.phone().conforms("+a1")).toBeFalsy());
    test("t10", (): void =>
      expect(T.regex.phone().conforms("1a1")).toBeFalsy());
  });
});
