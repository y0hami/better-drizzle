//#region src/plugins/uuid/mysql.d.ts
/**
 * MySQL `binary(16)` UUID column typed as `string`. Values are written and
 * filtered as hyphenated strings and stored as 16 bytes; `uuids()` fills it
 * like any string id column.
 *
 * @example
 * ```ts
 * import { buuid } from 'better-drizzle/uuid/mysql';
 *
 * export const users = mysqlTable('users', {
 *   id: buuid('id').primaryKey(),
 * });
 * ```
 */
export declare const buuid: {
  <TConfig extends Record<string, any>>(fieldConfig?: TConfig | undefined): import("drizzle-orm/mysql-core").MySqlCustomColumnBuilder<{
    dataType: "custom";
    data: string;
    driverParam: Buffer<ArrayBufferLike>;
  }>;
  (dbName: string, fieldConfig?: unknown): import("drizzle-orm/mysql-core").MySqlCustomColumnBuilder<{
    dataType: "custom";
    data: string;
    driverParam: Buffer<ArrayBufferLike>;
  }>;
};
//#endregion