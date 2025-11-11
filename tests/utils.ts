import { RuleTester } from '@typescript-eslint/rule-tester';
import type { ParserOptions } from '@typescript-eslint/utils/ts-eslint';
import { resolve } from 'path';

export function ruleTester({
  comments = false,
  typeScript = true,
  types = true,
}: {
  comments?: boolean;
  typeScript?: boolean;
  types?: boolean;
} = {}) {
  const project = typeScript && types ? "./tsconfig.json" : undefined;

  const filename = "file.tsx";

  const parserOptions = {
    comments,
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project,
    sourceType: "module",
    tsconfigRootDir: resolve(__dirname),
  } as const satisfies ParserOptions;

  RuleTester.afterAll = function (fn) {
    fn();
  }

  const tester = new RuleTester({
    languageOptions: {
      ...!typeScript ? { parser: undefined } : {},
      // parser: typeScript ? parser : undefined,
      parserOptions
    }
  });

  const run = tester.run;

  tester.run = (name, rule, { invalid = [], valid = [] }) =>
    run.call(tester, name, rule, {
      invalid: invalid.map((test) => ({ ...test, filename })),
      valid: valid.map((test) =>
        typeof test === "string"
          ? { code: test, filename }
          : { ...test, filename }
      ),
    });

  return tester;
};

// export const ruleTester = createRuleTester({
//   filename: resolve("./file.tsx"),
// });
