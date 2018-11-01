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
import { directive, NodePart, reparentNodes } from '../lit-html.js';
const partCaches = new WeakMap();
export function cachingWhen(condition, trueValueOrCaseMap, falseValue) {
    let caseMap;
    let trueValue;
    let nextCondition;
    // test whether we are in case or in if/else mode
    if (typeof trueValueOrCaseMap === 'object') {
        caseMap = trueValueOrCaseMap;
        nextCondition = condition;
    }
    else {
        trueValue = trueValueOrCaseMap;
        // in if or if/else mode, the condition is checked on truthiness
        // so we coerce the condition to a boolean
        nextCondition = Boolean(condition);
    }
    return directive((parentPart) => {
        let cache = partCaches.get(parentPart);
        // create a new PartCache if this is the first render
        if (cache === undefined) {
            cache = { conditions: new Map() };
            partCaches.set(parentPart, cache);
        }
        const { prevCondition } = cache;
        const prevCache = cache.conditions.get(prevCondition);
        let nextCache = cache.conditions.get(nextCondition);
        // create a new ConditionCache if this is the first time rendering
        // this condition
        if (!nextCache) {
            nextCache = {
                part: new NodePart(parentPart.options),
                cacheContainer: document.createDocumentFragment(),
            };
            cache.conditions.set(nextCondition, nextCache);
            nextCache.part.appendIntoPart(parentPart);
        }
        // determine what the next render value is, based on case or if/else mode
        let nextValue;
        if (caseMap) {
            nextValue = caseMap[nextCondition] || caseMap.default;
        }
        else {
            nextValue = condition ? trueValue : falseValue;
        }
        // if we switched conditions, swap nodes to/from the cache.
        if (nextCondition !== prevCondition) {
            // take next part from the cache, if it was rendered before
            if (nextCache.part.value) {
                parentPart.startNode.parentNode.insertBefore(nextCache.cacheContainer, parentPart.endNode);
            }
            // move the prev part from the cache, if it was rendered before
            if (prevCache && prevCache.part.value) {
                reparentNodes(prevCache.cacheContainer, prevCache.part.startNode, prevCache.part.endNode.nextSibling);
            }
        }
        nextCache.part.setValue(nextValue ? nextValue() : undefined);
        nextCache.part.commit();
        cache.prevCondition = nextCondition;
    });
}
//# sourceMappingURL=caching-when.js.map