# Experiment: TS Chain

## Problem Introduction

This experiment is to explore the optimal way to write a chaining API in TypeScript.

The problem with chaining APIs in TypeScript is that they are recursive which makes them prone to hitting TypeScript's internal limits, namely (to my knowledge) the three listed in this [article](https://medium.com/@hchan_nvim/into-the-chamber-of-secrets-break-through-the-limits-of-typescript-3532c6dd080):

1. Tail recursion count: the maximum number of recursive calls in a conditional type.
2. Type instantiation depth: the maximum depth when we instantiate a generic type alias.
3. Type instantiation count: the maximum number of type instantiations.

## Experiment Setup

- One module that has an example chaining api followed by excessive usage of it to the point of hitting the TypeScript limit.
- Different versions of the chaining api, one usable at a time, the others commented out.

## Findings

- No way found to never hit the limits.
- Different approaches yield different points at which limits are hit.
- Approach that yielded maximum chain size was "explicit recreate + type parameter".

## References

1. https://github.com/microsoft/TypeScript/issues/30020
2. https://stackoverflow.com/questions/79232154/how-to-build-context-in-chaining-api-without-instantiation-limit?noredirect=1#comment139717622_79232154
3. https://www.reddit.com/r/typescript/comments/1c3r9gx/what_are_some_good_strategies_to_avoid_type/
4. https://stackoverflow.com/questions/70545982/why-am-i-getting-type-instantiation-is-excessively-deep-and-possibly-infinite
