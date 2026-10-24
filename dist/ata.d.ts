import { AnyColumn } from "drizzle-orm";
import { AnySchema, TableKey } from "better-drizzle";
//#region src/plugins/ata/shared/column.d.ts
/**
 * What a drizzle column becomes for ata.
 *
 * ata validates JSON-shaped data, so three of drizzle's column kinds have no
 * spelling in a schema: `date` is a `Date` instance, `bigint` is a `BigInt`, and
 * `buffer` is a `Buffer`. Rather than reach for a custom keyword, which would put
 * the whole schema on ata's interpreted engine and give up most of the reason to
 * use it, those columns ask the schema for nothing and name a `residue` instead:
 * a predicate run only on values ata has already accepted.
 *
 * That is the split `@ata-project/zod` already makes for `z.date()` and friends.
 * ata rejecting is final and fast; ata accepting hands the value on to the one
 * check it cannot express.
 */
type ResidueKind = 'bigint' | 'buffer' | 'date';
//#endregion
//#region src/plugins/ata/types.d.ts
/**
 * The plugin's public types.
 *
 * Deliberately smaller than the zod plugin's. Most of that file tracks an input
 * type separately from an output type, because `z.coerce` accepts one thing and
 * produces another. ata validates and does not transform, so a value that passes
 * is the value you handed in, and one type describes both ends.
 */
/** A JSON Schema, as this plugin builds them. */
type JsonSchema = Record<string, unknown>;
/** Every operation whose validation can be turned on or off. */
type AtaValidateKey = 'count' | 'create' | 'createMany' | 'cursor' | 'delete' | 'deleteMany' | 'exists' | 'findFirst' | 'findMany' | 'findOne' | 'findUnique' | 'paginate' | 'query' | 'result' | 'update' | 'updateEach' | 'updateMany' | 'upsert' | 'upsertMany';
/**
 * Which operations to validate. Anything left out keeps its default: payloads
 * and results are checked, reads are not.
 */
type AtaPluginValidateOptions = Partial<Record<AtaValidateKey, boolean>>;
/**
 * Per-table overrides.
 *
 * `columns` replaces what this plugin derived for one column. A JSON Schema of
 * your own goes in as-is; `false` drops the column from the generated schemas,
 * which is how you stop claiming anything about a type the classifier got wrong.
 */
type AtaPluginTableConfig = {
  columns?: Record<string, false | JsonSchema>;
};
type AtaPluginOptions<Schema extends AnySchema = AnySchema> = {
  /**
   * Build the standalone modules ahead of time instead of compiling on first
   * use. Off by default, because it only pays for itself when the schema is
   * large and the process is short-lived.
   */
  precompile?: boolean;
  tables?: Partial<Record<TableKey<Schema> & string, AtaPluginTableConfig>>;
  validate?: AtaPluginValidateOptions;
};
/** A compiled validator, as the registry hands it out. */
type AtaCompiledSchema = {
  /** The JSON Schema itself, which is a plain object you can print or ship. */
  schema: JsonSchema;
  validate(value: unknown): {
    errors?: readonly {
      message?: string;
      path?: string;
    }[];
    valid: boolean;
  };
};
/**
 * The schemas a model carries, reachable as `db.user.$ata`.
 *
 * Every one of these is a plain JSON Schema object as well as a compiled
 * validator, so the same value can be handed to an HTTP layer, written to a
 * file, or used to generate types, which is most of the reason to describe a
 * table in JSON Schema rather than in a validator's own vocabulary.
 */
type BetterDrizzleAtaModelSchemas = {
  count: AtaCompiledSchema;
  create: AtaCompiledSchema;
  cursor: AtaCompiledSchema;
  delete: AtaCompiledSchema;
  deleteMany: AtaCompiledSchema;
  orderBy: AtaCompiledSchema;
  pagination: AtaCompiledSchema;
  query: AtaCompiledSchema;
  /** A row as it comes back from the database. This is what a result is. */
  row: AtaCompiledSchema;
  /** The `select` projection: which columns and relations to return. */
  select: AtaCompiledSchema;
  update: AtaCompiledSchema;
  where: AtaCompiledSchema;
  /** Column name to the check JSON Schema cannot express. */
  residues: Record<string, ResidueKind>;
};
type BetterDrizzleAtaModelExtension = {
  $ata: BetterDrizzleAtaModelSchemas;
};
//#endregion
//#region src/plugins/ata/version.d.ts
/**
 * Your current version of [better-drizzle/ata](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/ata/shared/registry.d.ts
/**
 * The compiled schemas for every table, built once.
 *
 * Each table's schemas are compiled the first time something asks for them
 * rather than at setup. A process that only ever writes to one table should not
 * pay to compile the query arguments of forty others, and compiling every shape
 * of every table eagerly is the one thing that would make this plugin slower to
 * start than the validator it replaces.
 */
type TableEntry = {
  columns: Record<string, AnyColumn>;
  residueArrays: Record<string, number>;
  relations: readonly string[];
  schemas: BetterDrizzleAtaModelSchemas;
  tableName: string;
};
type AtaSchemasRegistry = {
  get(tableName: string): TableEntry | undefined;
  getCountArgs(tableName: string): AtaCompiledSchema;
  getCreate(tableName: string): AtaCompiledSchema;
  getCursorArgs(tableName: string): AtaCompiledSchema;
  getDeleteArgs(tableName: string, many: boolean): AtaCompiledSchema;
  getPaginationArgs(tableName: string): AtaCompiledSchema;
  getQueryArgs(tableName: string): AtaCompiledSchema;
  getResult(tableName: string, many: boolean, args?: unknown): AtaCompiledSchema;
  getUpdate(tableName: string): AtaCompiledSchema;
  tables(): readonly string[];
};
//#endregion
//#region src/plugins/ata/shared/row.d.ts
type RowError = {
  instancePath: string;
  keyword: string;
  message: string;
};
/**
 * Which row a validator is for.
 *
 * `select` is a row as it comes back: every non-nullable column is present.
 * `create` is a row on the way in: a column the database fills in, a default or
 * a generated key, is optional even though it is not nullable. `update` is a
 * patch, so nothing is required.
 */
type RowMode = 'create' | 'select' | 'update';
type RowValidator = {
  /** The JSON Schema ata compiles. Residue columns constrain only nullability. */
  schema: {
    type: 'object';
    properties: Record<string, Record<string, unknown>>;
    required: string[];
  };
  /** Column name to the kind of check ata cannot express. */
  residues: Record<string, ResidueKind>;
  /** Of those, the columns whose residue applies to each array element. */
  residueArrays: Record<string, number>;
  validate(row: unknown): {
    valid: boolean;
    errors?: RowError[];
  };
};
//#endregion
//#region src/plugins/ata/shared/validation.d.ts
/** One thing that was wrong, in the shape the zod plugin reports. */
type AtaIssue = {
  /** ata's stable error code, e.g. `ATA1001`. */
  code: string;
  /** A page describing that code. */
  docUrl?: string;
  message: string;
  /** Dot-joined path to the value, `''` for the root. */
  path: string;
};
//#endregion
//#region src/plugins/ata/index.d.ts
/**
 * Validate Better Drizzle operations with ata.
 *
 * The plugin describes each table as JSON Schema and compiles it once. What that
 * buys over a validator built from objects is that the description is data: the
 * same schema reaches `db.user.$ata.create.schema` as a plain object, so it can
 * go to an HTTP layer, a form, or a file without being rewritten.
 *
 * Three column kinds have no spelling in JSON Schema, `Date`, `BigInt` and
 * `Buffer`, so the schema asks nothing of them and a predicate checks them after
 * ata has accepted the row. That split is the plugin's one compromise and it is
 * visible: `db.user.$ata.residues` names every column it applies to.
 */
export declare const ata: <Schema extends AnySchema, const Options extends AtaPluginOptions<Schema> = AtaPluginOptions<Schema>>(options?: Options) => import("better-drizzle").Plugin<Options, Record<never, never>, BetterDrizzleAtaModelExtension, Record<never, never>, {
  count: {
    validate?: boolean;
  };
  create: {
    validate?: boolean;
  };
  createMany: {
    validate?: boolean;
  };
  cursor: {
    validate?: boolean;
  };
  delete: {
    validate?: boolean;
  };
  deleteMany: {
    validate?: boolean;
  };
  exists: {
    validate?: boolean;
  };
  findFirst: {
    validate?: boolean;
  };
  findMany: {
    validate?: boolean;
  };
  findOne: {
    validate?: boolean;
  };
  findUnique: {
    validate?: boolean;
  };
  paginate: {
    validate?: boolean;
  };
  update: {
    validate?: boolean;
  };
  updateEach: {
    validate?: boolean;
  };
  updateMany: {
    validate?: boolean;
  };
  upsert: {
    validate?: boolean;
  };
  upsertMany: {
    validate?: boolean;
  };
}, never, never>;
//#endregion
export { type AtaCompiledSchema, type AtaIssue, type AtaPluginOptions, type AtaPluginTableConfig, type AtaPluginValidateOptions, type AtaSchemasRegistry, type AtaValidateKey, type BetterDrizzleAtaModelExtension, type BetterDrizzleAtaModelSchemas, type JsonSchema, type ResidueKind, type RowMode, type RowValidator, type TableEntry, ata as default };