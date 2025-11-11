import type { TSESLint } from '@typescript-eslint/utils';
import * as parser from '@typescript-eslint/parser';

import * as banObservablesRuleDef from './rules/ban-observables';
import * as banOperatorsRuleDef from './rules/ban-operators';
import * as finnishRuleDef from './rules/finnish';
import * as justRuleDef from './rules/just';
import * as macroRuleDef from './rules/macro';
import * as noAsyncSubscribeRuleDef from './rules/no-async-subscribe';
import * as noCompatRuleDef from './rules/no-compat';
import * as noConnectableRuleDef from './rules/no-connectable';
import * as noCreateRuleDef from './rules/no-create';
import * as noCyclicActionRuleDef from './rules/no-cyclic-action';
import * as noExplicitGenericsRuleDef from './rules/no-explicit-generics';
import * as noExposedSubjectsRuleDef from './rules/no-exposed-subjects';
import * as noFinnishRuleDef from './rules/no-finnish';
import * as noIgnoredErrorRuleDef from './rules/no-ignored-error';
import * as noIgnoredNotifierRuleDef from './rules/no-ignored-notifier';
import * as noIgnoredObservableRuleDef from './rules/no-ignored-observable';
import * as noIgnoredReplayBufferRuleDef from './rules/no-ignored-replay-buffer';
import * as noIgnoredSubscribeRuleDef from './rules/no-ignored-subscribe';
import * as noIgnoredSubscriptionRuleDef from './rules/no-ignored-subscription';
import * as noIgnoredTakewhileValueRuleDef from './rules/no-ignored-takewhile-value';
import * as noImplicitAnyCatchRuleDef from './rules/no-implicit-any-catch';
import * as noIndexRuleDef from './rules/no-index';
import * as noInternalRuleDef from './rules/no-internal';
import * as noNestedSubscribeRuleDef from './rules/no-nested-subscribe';
import * as noRedundantNotifyRuleDef from './rules/no-redundant-notify';
import * as noSharereplayRuleDef from './rules/no-sharereplay';
import * as noSubclassRuleDef from './rules/no-subclass';
import * as noSubjectUnsubscribeRuleDef from './rules/no-subject-unsubscribe';
import * as noSubjectValueRuleDef from './rules/no-subject-value';
import * as noSubscribeHandlersRuleDef from './rules/no-subscribe-handlers';
import * as noTapRuleDef from './rules/no-tap';
import * as noTopromiseRuleDef from './rules/no-topromise';
import * as noUnboundMethodsRuleDef from './rules/no-unbound-methods';
import * as noUnsafeCatchRuleDef from './rules/no-unsafe-catch';
import * as noUnsafeFirstRuleDef from './rules/no-unsafe-first';
import * as noUnsafeSubjectNextRuleDef from './rules/no-unsafe-subject-next';
import * as noUnsafeSwitchmapRuleDef from './rules/no-unsafe-switchmap';
import * as noUnsafeTakeuntilRuleDef from './rules/no-unsafe-takeuntil';
import * as preferObserverRuleDef from './rules/prefer-observer';
import * as suffixSubjectsRuleDef from './rules/suffix-subjects';
import * as throwErrorRuleDef from './rules/throw-error';

export const plugin: TSESLint.FlatConfig.Plugin = {
  rules: {
    [banObservablesRuleDef.name]: banObservablesRuleDef.rule,
    [banOperatorsRuleDef.name]: banOperatorsRuleDef.rule,
    [finnishRuleDef.name]: finnishRuleDef.rule,
    [justRuleDef.name]: justRuleDef.rule,
    [macroRuleDef.name]: macroRuleDef.rule,
    [noAsyncSubscribeRuleDef.name]: noAsyncSubscribeRuleDef.rule,
    [noCompatRuleDef.name]: noCompatRuleDef.rule,
    [noConnectableRuleDef.name]: noConnectableRuleDef.rule,
    [noCreateRuleDef.name]: noCreateRuleDef.rule,
    [noCyclicActionRuleDef.name]: noCyclicActionRuleDef.rule,
    [noExplicitGenericsRuleDef.name]: noExplicitGenericsRuleDef.rule,
    [noExposedSubjectsRuleDef.name]: noExposedSubjectsRuleDef.rule,
    [noFinnishRuleDef.name]: noFinnishRuleDef.rule,
    [noIgnoredErrorRuleDef.name]: noIgnoredErrorRuleDef.rule,
    [noIgnoredNotifierRuleDef.name]: noIgnoredNotifierRuleDef.rule,
    [noIgnoredObservableRuleDef.name]: noIgnoredObservableRuleDef.rule,
    [noIgnoredReplayBufferRuleDef.name]: noIgnoredReplayBufferRuleDef.rule,
    [noIgnoredSubscribeRuleDef.name]: noIgnoredSubscribeRuleDef.rule,
    [noIgnoredSubscriptionRuleDef.name]: noIgnoredSubscriptionRuleDef.rule,
    [noIgnoredTakewhileValueRuleDef.name]: noIgnoredTakewhileValueRuleDef.rule,
    [noImplicitAnyCatchRuleDef.name]: noImplicitAnyCatchRuleDef.rule,
    [noIndexRuleDef.name]: noIndexRuleDef.rule,
    [noInternalRuleDef.name]: noInternalRuleDef.rule,
    [noNestedSubscribeRuleDef.name]: noNestedSubscribeRuleDef.rule,
    [noRedundantNotifyRuleDef.name]: noRedundantNotifyRuleDef.rule,
    [noSharereplayRuleDef.name]: noSharereplayRuleDef.rule,
    [noSubclassRuleDef.name]: noSubclassRuleDef.rule,
    [noSubjectUnsubscribeRuleDef.name]: noSubjectUnsubscribeRuleDef.rule,
    [noSubjectValueRuleDef.name]: noSubjectValueRuleDef.rule,
    [noSubscribeHandlersRuleDef.name]: noSubscribeHandlersRuleDef.rule,
    [noTapRuleDef.name]: noTapRuleDef.rule,
    [noTopromiseRuleDef.name]: noTopromiseRuleDef.rule,
    [noUnboundMethodsRuleDef.name]: noUnboundMethodsRuleDef.rule,
    [noUnsafeCatchRuleDef.name]: noUnsafeCatchRuleDef.rule,
    [noUnsafeFirstRuleDef.name]: noUnsafeFirstRuleDef.rule,
    [noUnsafeSubjectNextRuleDef.name]: noUnsafeSubjectNextRuleDef.rule,
    [noUnsafeSwitchmapRuleDef.name]: noUnsafeSwitchmapRuleDef.rule,
    [noUnsafeTakeuntilRuleDef.name]: noUnsafeTakeuntilRuleDef.rule,
    [preferObserverRuleDef.name]: preferObserverRuleDef.rule,
    [suffixSubjectsRuleDef.name]: suffixSubjectsRuleDef.rule,
    [throwErrorRuleDef.name]: throwErrorRuleDef.rule,
  },
}

export const configs = {
  recommended: [{
    name: 'rxjs/base',
    languageOptions: {
      parser,
      sourceType: 'module',
    },
    plugins: {
      'rxjs': plugin,
    },
  }, {
    name: 'rxjs/recommended', languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      "rxjs/no-async-subscribe": "error",
      "rxjs/no-create": "error",
      "rxjs/no-ignored-notifier": "error",
      "rxjs/no-ignored-replay-buffer": "error",
      "rxjs/no-ignored-takewhile-value": "error",
      "rxjs/no-implicit-any-catch": "error",
      "rxjs/no-index": "error",
      "rxjs/no-internal": "error",
      "rxjs/no-nested-subscribe": "error",
      "rxjs/no-redundant-notify": "error",
      "rxjs/no-sharereplay": ["error", { allowConfig: true }],
      "rxjs/no-subject-unsubscribe": "error",
      "rxjs/no-unbound-methods": "error",
      "rxjs/no-unsafe-subject-next": "error",
      "rxjs/no-unsafe-takeuntil": "error",
    },
  }] satisfies TSESLint.FlatConfig.ConfigArray,
}
