/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import { TType } from "../TType";
import { T } from "../index";

describe("OArrayType", (): void => {
  const values: Map<any, TType<any>> = new Map();

  values.set("", T.string());
  values.set(42, T.number());
  values.set(true, T.boolean());
  values.set(null, T.null());
  values.set(undefined, T.undefined());

  function createTests(): void {
    for (const [k1, v1] of values) {
      describe(typeof k1, (): void => {
        for (const [k2, v2] of values) {
          if (k2 === k1) continue;
          describe(typeof k2, (): void => {
            for (const [k3, v3] of values) {
              if (k3 === k1) continue;
              if (k3 === k2) continue;
              describe(typeof k3, (): void => {
                for (const [k4, v4] of values) {
                  if (k4 === k1) continue;
                  if (k4 === k2) continue;
                  if (k4 === k3) continue;
                  describe(typeof k4, (): void => {
                    for (const [k5, v5] of values) {
                      if (k5 === k1) continue;
                      if (k5 === k2) continue;
                      if (k5 === k3) continue;
                      if (k5 === k4) continue;
                      describe(typeof k5, (): void => {
                        test(typeof k1, (): void =>
                          expect(v1.conforms(k1)).toBeTruthy()
                        );
                        test(typeof k2, (): void =>
                          expect(v2.conforms(k1)).toBeFalsy()
                        );
                        test(typeof k3, (): void =>
                          expect(v3.conforms(k1)).toBeFalsy()
                        );
                        test(typeof k4, (): void =>
                          expect(v4.conforms(k1)).toBeFalsy()
                        );
                        test(typeof k5, (): void =>
                          expect(v5.conforms(k1)).toBeFalsy()
                        );
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }

  createTests();
});
