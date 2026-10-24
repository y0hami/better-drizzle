import { PluginGeneratedColumns } from "better-drizzle";
//#region src/plugins/timestamps/types.d.ts
/**
 * Supported timestamp management modes.
 *
 * - `'app'`: Better Drizzle sets `createdAt` / `updatedAt` in plugin hooks.
 * - `'database'`: the database is responsible for populating and updating the
 *   timestamp columns, so the plugin stays as a no-op.
 */
type TimestampMode = 'app' | 'database';
/**
 * Per-model override. `false` turns the plugin off for that model.
 */
type TimestampModelOptions = false | {
  /** Creation timestamp column for this model. Must exist. */
  createdAt?: string;
  /** Update timestamp column for this model. Must exist. */
  updatedAt?: string;
};
/**
 * Configuration accepted by {@link timestamps}.
 */
type TimestampsOptions<CreatedAt extends string = string, UpdatedAt extends string = string, Models extends Readonly<Record<string, TimestampModelOptions>> = Readonly<Record<string, TimestampModelOptions>>, Mode extends TimestampMode = TimestampMode> = {
  /**
   * Column name used for the creation timestamp.
   *
   * @default 'createdAt'
   */
  createdAt?: CreatedAt;
  /**
   * Timestamp management strategy.
   *
   * @default 'app'
   */
  mode?: Mode;
  /**
   * Overrides keyed by table key. Unknown keys are ignored.
   */
  models?: Models;
  /**
   * Clock used for every timestamp the plugin writes. Called once per
   * operation, so `createdAt` and `updatedAt` match.
   *
   * @default () => new Date()
   */
  now?: () => Date;
  /**
   * Column name used for the update timestamp.
   *
   * @default 'updatedAt'
   */
  updatedAt?: UpdatedAt;
};
//#endregion
//#region src/plugins/timestamps/version.d.ts
/**
 * Your current version of [better-drizzle/timestamps](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/timestamps/index.d.ts
type GeneratedModels<CreatedAt extends string, UpdatedAt extends string, Models extends Readonly<Record<string, TimestampModelOptions>>> = { [Name in keyof Models]: Models[Name] extends false ? false : readonly [Models[Name] extends {
  createdAt: infer Column extends string;
} ? Column : CreatedAt, Models[Name] extends {
  updatedAt: infer Column extends string;
} ? Column : UpdatedAt]; };
/**
 * Adds automatic `createdAt` / `updatedAt` handling to Better Drizzle models.
 *
 * In `app` mode the plugin updates the payload before the database call:
 * - `create` / `createMany`: sets both `createdAt` and `updatedAt`
 * - `update` / `updateEach`: sets `updatedAt`
 * - `upsert`: sets both on the create payload and `updatedAt` on the update payload
 * - `upsertMany`: stamps insert rows and keeps only `updatedAt` on conflict updates
 *
 * In `database` mode the plugin does nothing, which is useful when the schema
 * already relies on DB defaults or triggers.
 *
 * Every write reads `now()` once, so `createdAt` and `updatedAt` match.
 * `models` overrides column names per table key, or disables a model with
 * `false`; overridden columns must exist.
 *
 * @param options - Optional column names, clock, per-model overrides, and mode.
 * @returns A Better Drizzle plugin definition.
 */
export declare const timestamps: <const CreatedAt extends string = "createdAt", const UpdatedAt extends string = "updatedAt", const Models extends Readonly<Record<string, TimestampModelOptions>> = Record<never, never>, const Mode extends TimestampMode = "app">(options?: TimestampsOptions<CreatedAt, UpdatedAt, Models, Mode>) => NoInfer<Omit<import("better-drizzle").Plugin<TimestampsOptions<CreatedAt, UpdatedAt, Models, Mode>, Record<never, never>, Record<never, never>, import("better-drizzle").PluginState, Record<never, never>, never, never>, "generated"> & {
  generated?: "database" extends Mode ? never : PluginGeneratedColumns<readonly [CreatedAt, UpdatedAt], GeneratedModels<CreatedAt, UpdatedAt, Models>, Date | string>;
}>;
//#endregion
export { type TimestampModelOptions, type TimestampsOptions, timestamps as default };