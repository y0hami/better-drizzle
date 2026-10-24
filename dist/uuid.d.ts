import { PluginGeneratedColumns } from "better-drizzle";
//#region src/plugins/uuid/types.d.ts
/**
 * UUID version written by {@link uuids}.
 *
 * - `7`: time-ordered (RFC 9562), monotonic within the process.
 * - `4`: random, through `crypto.randomUUID()`.
 */
type UuidVersion = 4 | 7;
/**
 * Configuration accepted by {@link uuids}.
 */
type UuidsOptions<Column extends string = 'id', Models extends Readonly<Record<string, string | false>> = Record<never, never>> = {
  /**
   * Column key filled on every model that has it as a string or `buuid()`
   * column. Models where it is missing or not a string are skipped.
   *
   * @default 'id'
   */
  column?: Column;
  /**
   * Overrides keyed by table key: a column key, or `false` to skip the
   * model. Overridden columns must exist and be string or `buuid()` columns.
   */
  models?: Models;
  /**
   * UUID version to generate.
   *
   * @default 7
   */
  version?: UuidVersion;
};
//#endregion
//#region src/plugins/uuid/version.d.ts
/**
 * Your current version of [better-drizzle/uuid](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/uuid/shared/generate.d.ts
/**
 * Generates a UUIDv7 (RFC 9562): a 48-bit Unix millisecond timestamp, a 42-bit
 * counter seeded randomly every millisecond, and 32 random bits. Values from
 * one process sort in creation order, including several in the same
 * millisecond or after the clock moves backwards.
 *
 * @returns A lowercase, hyphenated UUIDv7 string.
 */
export declare const uuidv7: () => string;
/**
 * Generates a random UUIDv4 through `crypto.randomUUID()`.
 *
 * @returns A lowercase, hyphenated UUIDv4 string.
 */
export declare const uuidv4: () => `${string}-${string}-${string}-${string}-${string}`;
//#endregion
//#region src/plugins/uuid/index.d.ts
/**
 * Fills UUID id columns on create.
 *
 * Every model with the configured column (`id` by default) as a string or
 * `buuid()` column gets a UUID whenever the value is `undefined` in:
 * - `create` / `createMany`
 * - the `create` branch of `upsert`
 * - `upsertMany` rows; `update: 'all'` and column lists never update the
 *   column on conflict
 *
 * Explicit values always win. The column becomes optional in the create input
 * types, and the `zod` / `ata` plugins treat it as optional in create schemas
 * regardless of plugin order.
 *
 * @param options - Column name, per-model overrides, and UUID version.
 * @returns A Better Drizzle plugin definition.
 */
export declare const uuids: <const Column extends string = "id", const Models extends Readonly<Record<string, string | false>> = Record<never, never>>(options?: UuidsOptions<Column, Models>) => NoInfer<Omit<import("better-drizzle").Plugin<UuidsOptions<Column, Models>, Record<never, never>, Record<never, never>, import("better-drizzle").PluginState, Record<never, never>, never, never>, "generated"> & {
  generated: PluginGeneratedColumns<Column, Models, string>;
}>;
//#endregion
export { type UuidVersion, type UuidsOptions, uuids as default };