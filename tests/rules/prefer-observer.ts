/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/eslint-plugin-rxjs
 */

import { stripIndent } from "common-tags";
import { fromFixture } from "../from-fixture";
import { rule } from "../../source/rules/prefer-observer";
import { ruleTester } from "../utils";

ruleTester({ types: true }).run("prefer-observer", rule, {
  valid: [
    {
      code: stripIndent`
        // allow-next
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe(
          value => console.log(value)
        );

        source.subscribe({
          next(value) { console.log(value); }
        });
        source.subscribe({
          next: value => console.log(value)
        });

        source.pipe(tap(
          value => console.log(value)
        )).subscribe();

        source.pipe(tap({
          next(value) { console.log(value); }
        })).subscribe();
        source.pipe(tap({
          next: value => console.log(value)
        })).subscribe();
      `,
      options: [{ allowNext: true }],
    },
    {
      code: stripIndent`
        // default
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe();
        source.subscribe(
          value => console.log(value)
        );

        source.subscribe({
          next(value) { console.log(value); }
        });
        source.subscribe({
          error(error) { console.log(error); }
        });
        source.subscribe({
          complete() { console.log("complete"); }
        });
        source.subscribe({
          next(value) { console.log(value); },
          error(error) { console.log(error); },
          complete() { console.log("complete"); }
        });

        source.subscribe({
          next: value => console.log(value)
        });
        source.subscribe({
          error: error => console.log(error)
        });
        source.subscribe({
          complete: () => console.log("complete")
        });
        source.subscribe({
          next: value => console.log(value),
          error: error => console.log(error),
          complete: () => console.log("complete")
        });

        source.pipe(tap(
          value => console.log(value)
        )).subscribe();

        source.pipe(tap({
          next(value) { console.log(value); }
        })).subscribe();
        source.pipe(tap({
          error(error) { console.log(error); }
        })).subscribe();
        source.pipe(tap({
          complete() { console.log("complete"); }
        })).subscribe();
        source.pipe(tap({
          next(value) { console.log(value); },
          error(error) { console.log(error); },
          complete() { console.log("complete"); }
        })).subscribe();

        source.pipe(tap({
          next: value => console.log(value)
        })).subscribe();
        source.pipe(tap({
          error: error => console.log(error)
        })).subscribe();
        source.pipe(tap({
          complete: () => console.log("complete")
        })).subscribe();
        source.pipe(tap({
          next: value => console.log(value),
          error: error => console.log(error),
          complete: () => console.log("complete")
        })).subscribe();
      `,
      options: [{}],
    },
    {
      code: stripIndent`
        // disallow-next
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe({
          next(value) { console.log(value); }
        });
        source.subscribe({
          next: value => console.log(value)
        });

        source.pipe(tap({
          next(value) { console.log(value); }
        })).subscribe();
        source.pipe(tap({
          next: value => console.log(value)
        })).subscribe();
      `,
      options: [{ allowNext: false }],
    },
    {
      code: stripIndent`
        // named
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const nextObserver = {
          next: (value: number) => { console.log(value); }
        };
        const source = of(42);

        source.subscribe(nextObserver);
        source.pipe(tap(nextObserver));
      `,
      options: [{}],
    },
    {
      code: stripIndent`
        // non-arrow functions
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe();
        source.subscribe(
          function (value) { console.log(value); }
        );
        source.pipe(tap(
          function (value) { console.log(value); }
        )).subscribe();
      `,
      options: [{}],
    },
    {
      code: stripIndent`
        // https://github.com/cartant/eslint-plugin-rxjs/issues/61
        const whatever = {
          pipe(...value: unknown[]) {},
          subscribe(callback?: (value: unknown) => void) {}
        };
        whatever.pipe(() => {});
        whatever.subscribe(() => {});
      `,
      options: [{ allowNext: false }],
    },
  ],
  invalid: [
    fromFixture(
      stripIndent`
        // default
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 0]
          value => console.log(value),
          error => console.log(error)
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 1]
          value => console.log(value),
          error => console.log(error),
          () => console.log("complete")
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 2]
          value => console.log(value),
          undefined,
          () => console.log("complete")
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 3]
          undefined,
          error => console.log(error)
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 4]
          undefined,
          error => console.log(error),
          () => console.log("complete")
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 5]
          undefined,
          undefined,
          () => console.log("complete")
        );

        source.pipe(tap(
                    ~~~ [forbidden suggest 6]
          value => console.log(value),
          error => console.log(error)
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 7]
          value => console.log(value),
          error => console.log(error),
          () => console.log("complete")
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 8]
          value => console.log(value),
          undefined,
          () => console.log("complete")
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 9]
          undefined,
          error => console.log(error)
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 10]
          undefined,
          error => console.log(error),
          () => console.log("complete")
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 11]
          undefined,
          undefined,
          () => console.log("complete")
        )).subscribe();
      `,
      {
        output: stripIndent`
        // default
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe(
          { next: value => console.log(value), error: error => console.log(error) }
        );
        source.subscribe(
          { next: value => console.log(value), error: error => console.log(error), complete: () => console.log("complete") }
        );
        source.subscribe(
          { next: value => console.log(value), complete: () => console.log("complete") }
        );
        source.subscribe(
          { error: error => console.log(error) }
        );
        source.subscribe(
          { error: error => console.log(error), complete: () => console.log("complete") }
        );
        source.subscribe(
          { complete: () => console.log("complete") }
        );

        source.pipe(tap(
          { next: value => console.log(value), error: error => console.log(error) }
        )).subscribe();
        source.pipe(tap(
          { next: value => console.log(value), error: error => console.log(error), complete: () => console.log("complete") }
        )).subscribe();
        source.pipe(tap(
          { next: value => console.log(value), complete: () => console.log("complete") }
        )).subscribe();
        source.pipe(tap(
          { error: error => console.log(error) }
        )).subscribe();
        source.pipe(tap(
          { error: error => console.log(error), complete: () => console.log("complete") }
        )).subscribe();
        source.pipe(tap(
          { complete: () => console.log("complete") }
        )).subscribe();
      `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                { next: value => console.log(value), error: error => console.log(error) }
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                { next: value => console.log(value), error: error => console.log(error), complete: () => console.log("complete") }
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          // Continuing with all 12 suggestions...
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                { next: value => console.log(value), complete: () => console.log("complete") }
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                { error: error => console.log(error) }
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                { error: error => console.log(error), complete: () => console.log("complete") }
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                { complete: () => console.log("complete") }
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                { next: value => console.log(value), error: error => console.log(error) }
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                { next: value => console.log(value), error: error => console.log(error), complete: () => console.log("complete") }
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                { next: value => console.log(value), complete: () => console.log("complete") }
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                { error: error => console.log(error) }
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                { error: error => console.log(error), complete: () => console.log("complete") }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                () => console.log("complete")
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // default
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value),
                error => console.log(error)
              );
              source.subscribe(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                error => console.log(error)
              );
              source.subscribe(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              );
              source.subscribe(
                undefined,
                undefined,
                () => console.log("complete")
              );

              source.pipe(tap(
                value => console.log(value),
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                value => console.log(value),
                undefined,
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error)
              )).subscribe();
              source.pipe(tap(
                undefined,
                error => console.log(error),
                () => console.log("complete")
              )).subscribe();
              source.pipe(tap(
                { complete: () => console.log("complete") }
              )).subscribe();
            `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        // disallow-next
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 0]
          value => console.log(value)
        );

        source.pipe(tap(
                    ~~~ [forbidden suggest 1]
          value => console.log(value)
        )).subscribe();
      `,
      {
        options: [{ allowNext: false }],
        output: stripIndent`
        // disallow-next
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe(
          { next: value => console.log(value) }
        );

        source.pipe(tap(
          { next: value => console.log(value) }
        )).subscribe();
      `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
              // disallow-next
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                { next: value => console.log(value) }
              );

              source.pipe(tap(
                value => console.log(value)
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // disallow-next
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                value => console.log(value)
              );

              source.pipe(tap(
                { next: value => console.log(value) }
              )).subscribe();
            `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        // named
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const nextArrow = (value: number) => { console.log(value); };
        function nextNamed(value: number): void { console.log(value); }
        const nextNonArrow = nextNamed;

        const source = of(42);

        source.subscribe(nextArrow);
               ~~~~~~~~~ [forbidden suggest 0]
        source.subscribe(nextNamed);
               ~~~~~~~~~ [forbidden suggest 1]
        source.subscribe(nextNonArrow);
               ~~~~~~~~~ [forbidden suggest 2]

        source.pipe(tap(nextArrow));
                    ~~~ [forbidden suggest 3]
        source.pipe(tap(nextNamed));
                    ~~~ [forbidden suggest 4]
        source.pipe(tap(nextNonArrow));
                    ~~~ [forbidden suggest 5]
      `,
      {
        options: [{ allowNext: false }],
        output: stripIndent`
        // named
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const nextArrow = (value: number) => { console.log(value); };
        function nextNamed(value: number): void { console.log(value); }
        const nextNonArrow = nextNamed;

        const source = of(42);

        source.subscribe({ next: nextArrow });
        source.subscribe({ next: nextNamed });
        source.subscribe({ next: nextNonArrow });

        source.pipe(tap({ next: nextArrow }));
        source.pipe(tap({ next: nextNamed }));
        source.pipe(tap({ next: nextNonArrow }));
      `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
              // named
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const nextArrow = (value: number) => { console.log(value); };
              function nextNamed(value: number): void { console.log(value); }
              const nextNonArrow = nextNamed;

              const source = of(42);

              source.subscribe({ next: nextArrow });
              source.subscribe(nextNamed);
              source.subscribe(nextNonArrow);

              source.pipe(tap(nextArrow));
              source.pipe(tap(nextNamed));
              source.pipe(tap(nextNonArrow));
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // named
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const nextArrow = (value: number) => { console.log(value); };
              function nextNamed(value: number): void { console.log(value); }
              const nextNonArrow = nextNamed;

              const source = of(42);

              source.subscribe(nextArrow);
              source.subscribe({ next: nextNamed });
              source.subscribe(nextNonArrow);

              source.pipe(tap(nextArrow));
              source.pipe(tap(nextNamed));
              source.pipe(tap(nextNonArrow));
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // named
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const nextArrow = (value: number) => { console.log(value); };
              function nextNamed(value: number): void { console.log(value); }
              const nextNonArrow = nextNamed;

              const source = of(42);

              source.subscribe(nextArrow);
              source.subscribe(nextNamed);
              source.subscribe({ next: nextNonArrow });

              source.pipe(tap(nextArrow));
              source.pipe(tap(nextNamed));
              source.pipe(tap(nextNonArrow));
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // named
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const nextArrow = (value: number) => { console.log(value); };
              function nextNamed(value: number): void { console.log(value); }
              const nextNonArrow = nextNamed;

              const source = of(42);

              source.subscribe(nextArrow);
              source.subscribe(nextNamed);
              source.subscribe(nextNonArrow);

              source.pipe(tap({ next: nextArrow }));
              source.pipe(tap(nextNamed));
              source.pipe(tap(nextNonArrow));
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // named
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const nextArrow = (value: number) => { console.log(value); };
              function nextNamed(value: number): void { console.log(value); }
              const nextNonArrow = nextNamed;

              const source = of(42);

              source.subscribe(nextArrow);
              source.subscribe(nextNamed);
              source.subscribe(nextNonArrow);

              source.pipe(tap(nextArrow));
              source.pipe(tap({ next: nextNamed }));
              source.pipe(tap(nextNonArrow));
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // named
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const nextArrow = (value: number) => { console.log(value); };
              function nextNamed(value: number): void { console.log(value); }
              const nextNonArrow = nextNamed;

              const source = of(42);

              source.subscribe(nextArrow);
              source.subscribe(nextNamed);
              source.subscribe(nextNonArrow);

              source.pipe(tap(nextArrow));
              source.pipe(tap(nextNamed));
              source.pipe(tap({ next: nextNonArrow }));
            `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        // non-arrow functions
        import { of } from "rxjs";
        import { tap } from "rxjs/operators";

        const source = of(42);

        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 0]
          function (value) { console.log(value); },
          function (error) { console.log(error); }
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 1]
          function (value) { console.log(value); },
          function (error) { console.log(error); },
          function () { console.log("complete"); }
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 2]
          function (value) { console.log(value); },
          undefined,
          function () { console.log("complete"); }
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 3]
          undefined,
          function (error) { console.log(error); }
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 4]
          undefined,
          function (error) { console.log(error); },
          function () { console.log("complete"); }
        );
        source.subscribe(
               ~~~~~~~~~ [forbidden suggest 5]
          undefined,
          undefined,
          function () { console.log("complete"); }
        );

        source.pipe(tap(
                    ~~~ [forbidden suggest 6]
          function (value) { console.log(value); },
          function (error) { console.log(error); }
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 7]
          function (value) { console.log(value); },
          function (error) { console.log(error); },
          function () { console.log("complete"); }
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 8]
          function (value) { console.log(value); },
          undefined,
          function () { console.log("complete"); }
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 9]
          undefined,
          function (error) { console.log(error); }
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 10]
          undefined,
          function (error) { console.log(error); },
          function () { console.log("complete"); }
        )).subscribe();
        source.pipe(tap(
                    ~~~ [forbidden suggest 11]
          undefined,
          undefined,
          function () { console.log("complete"); }
        )).subscribe();
      `,
      {
        output: stripIndent`
          // non-arrow functions
          import { of } from "rxjs";
          import { tap } from "rxjs/operators";

          const source = of(42);

          source.subscribe(
            { next: function (value) { console.log(value); }, error: function (error) { console.log(error); } }
          );
          source.subscribe(
            { next: function (value) { console.log(value); }, error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
          );
          source.subscribe(
            { next: function (value) { console.log(value); }, complete: function () { console.log("complete"); } }
          );
          source.subscribe(
            { error: function (error) { console.log(error); } }
          );
          source.subscribe(
            { error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
          );
          source.subscribe(
            { complete: function () { console.log("complete"); } }
          );

          source.pipe(tap(
            { next: function (value) { console.log(value); }, error: function (error) { console.log(error); } }
          )).subscribe();
          source.pipe(tap(
            { next: function (value) { console.log(value); }, error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
          )).subscribe();
          source.pipe(tap(
            { next: function (value) { console.log(value); }, complete: function () { console.log("complete"); } }
          )).subscribe();
          source.pipe(tap(
            { error: function (error) { console.log(error); } }
          )).subscribe();
          source.pipe(tap(
            { error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
          )).subscribe();
          source.pipe(tap(
            { complete: function () { console.log("complete"); } }
          )).subscribe();
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                { next: function (value) { console.log(value); }, error: function (error) { console.log(error); } }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                { next: function (value) { console.log(value); }, error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                { next: function (value) { console.log(value); }, complete: function () { console.log("complete"); } }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                { error: function (error) { console.log(error); } }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                { error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                { complete: function () { console.log("complete"); } }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                { next: function (value) { console.log(value); }, error: function (error) { console.log(error); } }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                { next: function (value) { console.log(value); }, error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                { next: function (value) { console.log(value); }, complete: function () { console.log("complete"); } }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                { error: function (error) { console.log(error); } }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                { error: function (error) { console.log(error); }, complete: function () { console.log("complete"); } }
              )).subscribe();
              source.pipe(tap(
                undefined,
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
            `,
          },
          {
            messageId: "forbidden",
            output: stripIndent`
              // non-arrow functions
              import { of } from "rxjs";
              import { tap } from "rxjs/operators";

              const source = of(42);

              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); }
              );
              source.subscribe(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              );
              source.subscribe(
                undefined,
                undefined,
                function () { console.log("complete"); }
              );

              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                function (value) { console.log(value); },
                undefined,
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); }
              )).subscribe();
              source.pipe(tap(
                undefined,
                function (error) { console.log(error); },
                function () { console.log("complete"); }
              )).subscribe();
              source.pipe(tap(
                { complete: function () { console.log("complete"); } }
              )).subscribe();
            `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of } from "rxjs";
        const fn = () => {};

        of(42).subscribe(fn, fn, fn);
               ~~~~~~~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of } from "rxjs";
          const fn = () => {};

          of(42).subscribe({ next: fn, error: fn, complete: fn });
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of } from "rxjs";
                const fn = () => {};

                of(42).subscribe({ next: fn, error: fn, complete: fn });
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of } from "rxjs";
        const fn = () => {};

        of(42).subscribe(fn, null, fn);
               ~~~~~~~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of } from "rxjs";
          const fn = () => {};

          of(42).subscribe({ next: fn, complete: fn });
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of } from "rxjs";
                const fn = () => {};

                of(42).subscribe({ next: fn, complete: fn });
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of } from "rxjs";
        const fn = () => {};

        of(42).subscribe(null, undefined, fn);
               ~~~~~~~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of } from "rxjs";
          const fn = () => {};

          of(42).subscribe({ complete: fn });
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of } from "rxjs";
                const fn = () => {};

                of(42).subscribe({ complete: fn });
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of } from "rxjs";
        const fn = () => {};

        of(42).subscribe(undefined, fn);
               ~~~~~~~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of } from "rxjs";
          const fn = () => {};

          of(42).subscribe({ error: fn });
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of } from "rxjs";
                const fn = () => {};

                of(42).subscribe({ error: fn });
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of } from "rxjs";
        const fn = () => {};

        of(42).subscribe(undefined, fn, null);
               ~~~~~~~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of } from "rxjs";
          const fn = () => {};

          of(42).subscribe({ error: fn });
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of } from "rxjs";
                const fn = () => {};

                of(42).subscribe({ error: fn });
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of } from "rxjs";
        const fn = () => {};

        // super wrong
        of(42).subscribe(undefined, fn, fn, fn, fn, fn, fn);
               ~~~~~~~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of } from "rxjs";
          const fn = () => {};

          // super wrong
          of(42).subscribe({ error: fn, complete: fn });
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of } from "rxjs";
                const fn = () => {};

                // super wrong
                of(42).subscribe({ error: fn, complete: fn });
              `,
          },
        ],
      },
    ),

    // tap
    fromFixture(
      stripIndent`
        import { of, tap } from "rxjs";
        const fn = () => {};

        of(42).pipe(tap(fn, fn, fn));
                    ~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of, tap } from "rxjs";
          const fn = () => {};

          of(42).pipe(tap({ next: fn, error: fn, complete: fn }));
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of, tap } from "rxjs";
                const fn = () => {};

                of(42).pipe(tap({ next: fn, error: fn, complete: fn }));
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of, tap } from "rxjs";
        const fn = () => {};

        of(42).pipe(tap(fn, null, fn));
                    ~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of, tap } from "rxjs";
          const fn = () => {};

          of(42).pipe(tap({ next: fn, complete: fn }));
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of, tap } from "rxjs";
                const fn = () => {};

                of(42).pipe(tap({ next: fn, complete: fn }));
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of, tap } from "rxjs";
        const fn = () => {};

        of(42).pipe(tap(null, undefined, fn));
                    ~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of, tap } from "rxjs";
          const fn = () => {};

          of(42).pipe(tap({ complete: fn }));
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of, tap } from "rxjs";
                const fn = () => {};

                of(42).pipe(tap({ complete: fn }));
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of, tap } from "rxjs";
        const fn = () => {};

        of(42).pipe(tap(undefined, fn));
                    ~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of, tap } from "rxjs";
          const fn = () => {};

          of(42).pipe(tap({ error: fn }));
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of, tap } from "rxjs";
                const fn = () => {};

                of(42).pipe(tap({ error: fn }));
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of, tap } from "rxjs";
        const fn = () => {};

        of(42).pipe(tap(undefined, fn, null));
                    ~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of, tap } from "rxjs";
          const fn = () => {};

          of(42).pipe(tap({ error: fn }));
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of, tap } from "rxjs";
                const fn = () => {};

                of(42).pipe(tap({ error: fn }));
              `,
          },
        ],
      },
    ),
    fromFixture(
      stripIndent`
        import { of, tap } from "rxjs";
        const fn = () => {};

        // super wrong
        of(42).pipe(tap(undefined, fn, fn, fn, fn, fn, fn));
                    ~~~ [forbidden suggest]
      `,
      {
        output: stripIndent`
          import { of, tap } from "rxjs";
          const fn = () => {};

          // super wrong
          of(42).pipe(tap({ error: fn, complete: fn }));
        `,
        suggestions: [
          {
            messageId: "forbidden",
            output: stripIndent`
                import { of, tap } from "rxjs";
                const fn = () => {};

                // super wrong
                of(42).pipe(tap({ error: fn, complete: fn }));
              `,
          },
        ],
      },
    ),
  ],
});
