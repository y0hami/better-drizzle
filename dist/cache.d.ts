import { a as CacheInvalidateTarget, c as CacheOptions, d as CacheSerializer, f as CacheStore, h as CacheWriteArg, i as CacheInvalidateHint, l as CacheReadArg, m as CacheVaryContext, n as CacheClientExtension, o as CacheModelOptions, p as CacheStoreEntry, r as CacheDuration, s as CacheOperationArgs, t as CacheClient, u as CacheReadOptions } from "./types-DEnpN5HJ.js";
//#region src/plugins/cache/version.d.ts
/**
 * Your current version of [better-drizzle/cache](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/cache/index.d.ts
export declare const cache: (options: CacheOptions) => import("better-drizzle").Plugin<CacheOptions, CacheClientExtension, Record<never, never>, Record<string, unknown>, CacheOperationArgs, never, never>;
declare module 'better-drizzle' {
  interface RawOptionsExtensions {
    /** Cache invalidation applied after the raw call succeeds or commits. */
    cache?: CacheWriteArg;
  }
}
//#endregion
export { type CacheClient, type CacheClientExtension, type CacheDuration, type CacheInvalidateHint, type CacheInvalidateTarget, type CacheModelOptions, type CacheOperationArgs, type CacheOptions, type CacheReadArg, type CacheReadOptions, type CacheSerializer, type CacheStore, type CacheStoreEntry, type CacheVaryContext, type CacheWriteArg, cache as default };