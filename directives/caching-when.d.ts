/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Directive, NodePart } from '../lit-html.js';
import { CaseMap, WhenValue } from './when';
/**
 * Directive for handling conditional logic inside templates. The logic
 * is identical to the regular when directive, with the addition that
 * nodes are cached between switching conditions. This prevents re-creating
 * the nodes of a template each switch, and can help improve render performance.
 *
 * Use this directive only when you need the caching, for example when
 * frequently switching cases or when switching between large dom trees. In
 * other cases use the regular when directive.
 *
 * @param condition the condition to check for truthiness
 * @param caseMap object where keys are cases and values are functions which
 *     return the value to render
 * @param trueValue function that returns the value to render in case of
 *     truthiness
 * @param falseValue function that returns the value to render in case of
 *     falsiness
 */
export declare function cachingWhen(condition: any, trueValue: WhenValue, falseValue?: WhenValue): Directive<NodePart>;
export declare function cachingWhen(condition: any, caseMap: CaseMap): Directive<NodePart>;
//# sourceMappingURL=caching-when.d.ts.map