import { ESLintUtils, TSESLint } from '@typescript-eslint/utils';

export interface RxjsXRuleDocs<Options extends readonly unknown[], Desc extends string> {
  description: Desc;
  recommended?: TSESLint.RuleRecommendation | TSESLint.RuleRecommendationAcrossConfigs<Options>;
  requiresTypeChecking?: boolean;
}

const REPO_URL = 'https://github.com/robyte-ctrl/eslint-plugin-rxjs';

export const ruleCreator = ESLintUtils.RuleCreator<RxjsXRuleDocs<unknown[], string>>(
  (name) =>
    `${REPO_URL}/tree/main/docs/rules/${name}.md`,
  // Ensure the resulting types are narrowed to exactly what each rule declares.
) as <
  Options extends readonly unknown[],
  MessageIds extends string,
  Desc extends string,
  Docs extends RxjsXRuleDocs<Options, Desc>,
>({ meta, name, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<Options, MessageIds, Docs>>) => TSESLint.RuleModule<MessageIds, Options, Docs>;


export function createRegExpForWords(
  config: string | string[]
): RegExp | undefined {
  if (!config || !config.length) {
    return undefined;
  }
  const flags = "i";
  if (typeof config === "string") {
    return new RegExp(config, flags);
  }
  const words = config;
  const joined = words.map((word) => String.raw`(\b|_)${word}(\b|_)`).join("|");
  return new RegExp(`(${joined})`, flags);
}

export function escapeRegExp(text: string): string {
  // https://stackoverflow.com/a/3561711/6680611
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
