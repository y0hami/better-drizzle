//#region src/plugins/uuid/sqlite.d.ts
/**
 * SQLite `blob` UUID column typed as `string`. Values are written and
 * filtered as hyphenated strings and stored as 16 bytes; `uuids()` fills it
 * like any string id column.
 *
 * @example
 * ```ts
 * import { buuid } from 'better-drizzle/uuid/sqlite';
 *
 * export const users = sqliteTable('users', {
 *   id: buuid('id').primaryKey(),
 * });
 * ```
 */
export declare const buuid: {
  (): import("drizzle-orm/sqlite-core").SQLiteCustomColumnBuilder<{
    dataType: "custom";
    data: string;
    driverParam: Buffer<ArrayBufferLike>;
  }>;
  <TConfig extends Record<string, any>>(fieldConfig?: TConfig | undefined): import("drizzle-orm/sqlite-core").SQLiteCustomColumnBuilder<{
    dataType: "custom";
    data: string;
    driverParam: Buffer<ArrayBufferLike>;
  }>;
  (dbname: string, fieldConfig?: unknown): import("drizzle-orm/sqlite-core").SQLiteCustomColumnBuilder<{
    dataType: "custom";
    data: string;
    driverParam: Buffer<ArrayBufferLike>;
  }>;
};
//#endregion