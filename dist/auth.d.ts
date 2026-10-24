import { DBAdapterDebugLogOption } from "better-auth/adapters";
//#region src/plugins/auth/types.d.ts
/**
 * Options accepted by {@link adapter}.
 */
interface AuthAdapterOptions {
  /**
   * Table keys are plural (`users` instead of `user`). Detected from the
   * client when omitted: `true` when there is a `users` table and no `user`.
   */
  usePlural?: boolean;
  /** Better Auth adapter debug logs. @default false */
  debugLogs?: DBAdapterDebugLogOption;
  /**
   * Runs multi-step Better Auth writes (sign-up creates a user and an
   * account) in one `db.transaction()`. @default true
   */
  transaction?: boolean;
  /** Metadata merged into every adapter operation, like `$withContext()`. */
  meta?: Record<string, unknown>;
  /**
   * Lets adapter reads use the `cache()` plugin. Writes always invalidate.
   * @default false
   */
  cache?: boolean;
  /**
   * Schema generation only (`npx auth generate`): camelCase table and
   * column names instead of snake_case. @default false
   */
  camelCase?: boolean;
  /**
   * Schema generation only (`npx auth generate`): PostgreSQL schema the
   * generated tables live in.
   */
  schemaName?: string;
}
//#endregion
//#region src/plugins/auth/version.d.ts
/**
 * Your current version of [better-drizzle/auth](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/auth/index.d.ts
/**
 * Better Auth database adapter backed by a Better Drizzle client, so auth
 * reads and writes run through the client's plugins, hooks, scopes, and
 * error normalization.
 *
 * ```ts
 * export const auth = betterAuth({ database: adapter(db) });
 * ```
 *
 * The provider comes from the client's dialect and the tables and relations
 * from `drizzle({ relations })`, so no `provider` or `schema` option exists.
 *
 * @param db - The Better Drizzle client (`better(drizzle(...))`).
 * @param options - Adapter options.
 * @returns The `database` value for `betterAuth()`.
 */
export declare const adapter: (db: object, options?: AuthAdapterOptions) => import("better-auth/adapters").AdapterFactory<import("better-auth").BetterAuthOptions>;
/** Alias of {@link adapter}. */
export declare const betterDrizzleAdapter: (db: object, options?: AuthAdapterOptions) => import("better-auth/adapters").AdapterFactory<import("better-auth").BetterAuthOptions>;
//#endregion
export { type AuthAdapterOptions, adapter as default };