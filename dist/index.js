"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.plugin = void 0;
const tslib_1 = require("tslib");
const parser = tslib_1.__importStar(require("@typescript-eslint/parser"));
const banObservablesRuleDef = tslib_1.__importStar(require("./rules/ban-observables"));
const banOperatorsRuleDef = tslib_1.__importStar(require("./rules/ban-operators"));
const finnishRuleDef = tslib_1.__importStar(require("./rules/finnish"));
const justRuleDef = tslib_1.__importStar(require("./rules/just"));
const macroRuleDef = tslib_1.__importStar(require("./rules/macro"));
const noAsyncSubscribeRuleDef = tslib_1.__importStar(require("./rules/no-async-subscribe"));
const noCompatRuleDef = tslib_1.__importStar(require("./rules/no-compat"));
const noConnectableRuleDef = tslib_1.__importStar(require("./rules/no-connectable"));
const noCreateRuleDef = tslib_1.__importStar(require("./rules/no-create"));
const noCyclicActionRuleDef = tslib_1.__importStar(require("./rules/no-cyclic-action"));
const noExplicitGenericsRuleDef = tslib_1.__importStar(require("./rules/no-explicit-generics"));
const noExposedSubjectsRuleDef = tslib_1.__importStar(require("./rules/no-exposed-subjects"));
const noFinnishRuleDef = tslib_1.__importStar(require("./rules/no-finnish"));
const noIgnoredErrorRuleDef = tslib_1.__importStar(require("./rules/no-ignored-error"));
const noIgnoredNotifierRuleDef = tslib_1.__importStar(require("./rules/no-ignored-notifier"));
const noIgnoredObservableRuleDef = tslib_1.__importStar(require("./rules/no-ignored-observable"));
const noIgnoredReplayBufferRuleDef = tslib_1.__importStar(require("./rules/no-ignored-replay-buffer"));
const noIgnoredSubscribeRuleDef = tslib_1.__importStar(require("./rules/no-ignored-subscribe"));
const noIgnoredSubscriptionRuleDef = tslib_1.__importStar(require("./rules/no-ignored-subscription"));
const noIgnoredTakewhileValueRuleDef = tslib_1.__importStar(require("./rules/no-ignored-takewhile-value"));
const noImplicitAnyCatchRuleDef = tslib_1.__importStar(require("./rules/no-implicit-any-catch"));
const noIndexRuleDef = tslib_1.__importStar(require("./rules/no-index"));
const noInternalRuleDef = tslib_1.__importStar(require("./rules/no-internal"));
const noNestedSubscribeRuleDef = tslib_1.__importStar(require("./rules/no-nested-subscribe"));
const noRedundantNotifyRuleDef = tslib_1.__importStar(require("./rules/no-redundant-notify"));
const noSharereplayRuleDef = tslib_1.__importStar(require("./rules/no-sharereplay"));
const noSubclassRuleDef = tslib_1.__importStar(require("./rules/no-subclass"));
const noSubjectUnsubscribeRuleDef = tslib_1.__importStar(require("./rules/no-subject-unsubscribe"));
const noSubjectValueRuleDef = tslib_1.__importStar(require("./rules/no-subject-value"));
const noSubscribeHandlersRuleDef = tslib_1.__importStar(require("./rules/no-subscribe-handlers"));
const noTapRuleDef = tslib_1.__importStar(require("./rules/no-tap"));
const noTopromiseRuleDef = tslib_1.__importStar(require("./rules/no-topromise"));
const noUnboundMethodsRuleDef = tslib_1.__importStar(require("./rules/no-unbound-methods"));
const noUnsafeCatchRuleDef = tslib_1.__importStar(require("./rules/no-unsafe-catch"));
const noUnsafeFirstRuleDef = tslib_1.__importStar(require("./rules/no-unsafe-first"));
const noUnsafeSubjectNextRuleDef = tslib_1.__importStar(require("./rules/no-unsafe-subject-next"));
const noUnsafeSwitchmapRuleDef = tslib_1.__importStar(require("./rules/no-unsafe-switchmap"));
const noUnsafeTakeuntilRuleDef = tslib_1.__importStar(require("./rules/no-unsafe-takeuntil"));
const preferObserverRuleDef = tslib_1.__importStar(require("./rules/prefer-observer"));
const suffixSubjectsRuleDef = tslib_1.__importStar(require("./rules/suffix-subjects"));
const throwErrorRuleDef = tslib_1.__importStar(require("./rules/throw-error"));
exports.plugin = {
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
};
exports.configs = {
    recommended: [{
            name: 'rxjs/base',
            languageOptions: {
                parser,
                sourceType: 'module',
            },
            plugins: {
                'rxjs': exports.plugin,
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
        }],
};
