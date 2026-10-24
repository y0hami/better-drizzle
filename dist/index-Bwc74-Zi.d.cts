import { AnyColumn, InferInsertModel, InferSelectModel, Many, One, Placeholder, SQL, SQLWrapper, Table, TableRelationalConfig } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";
import { Many as Many$1 } from "drizzle-orm/relations";
//#region src/shared/errors.d.ts
/**
 * The database driver type detected from error patterns.
 *
 * - `'pg'` – PostgreSQL
 * - `'sqlite'` – SQLite
 * - `'mysql'` – MySQL / MariaDB
 * - `'unknown'` – Could not be detected
 */
type DatabaseDriver = 'pg' | 'sqlite' | 'mysql' | 'unknown';
type ErrorWithFields = {
  code?: unknown;
  errno?: unknown;
  message?: unknown;
  constraint?: unknown;
  table?: unknown;
  column?: unknown;
  sqlState?: unknown;
  sqlMessage?: unknown;
  cause?: unknown;
};
/**
 * Error codes used by Better Drizzle to classify errors programmatically.
 *
 * Each code maps to a default HTTP-like status code and can be used
 * in `catch` blocks to handle specific error scenarios.
 *
 * @example
 * ```ts
 * import { BetterDrizzleError, BetterDrizzleErrorCode } from 'better-drizzle';
 *
 * try {
 *   await db.user.findUnique({ where: { id: 1 } }).throw();
 * } catch (error) {
 *   if (error instanceof BetterDrizzleError) {
 *     if (error.code === BetterDrizzleErrorCode.ResultNotFound) {
 *       console.log('User not found');
 *     }
 *   }
 * }
 * ```
 */
declare enum BetterDrizzleErrorCode {
  /** `afterCommit()` was called outside a transaction. */
  AfterCommitOutsideTransaction = "AFTER_COMMIT_OUTSIDE_TRANSACTION",
  /** `afterRollback()` was called outside a transaction. */
  AfterRollbackOutsideTransaction = "AFTER_ROLLBACK_OUTSIDE_TRANSACTION",
  /** The cache plugin received invalid options. */
  CacheInvalidOptions = "CACHE_INVALID_OPTIONS",
  /** A cached value could not be serialized or deserialized. */
  CacheSerializationError = "CACHE_SERIALIZATION_ERROR",
  /** The cache store failed to read, write, or delete keys. */
  CacheStoreError = "CACHE_STORE_ERROR",
  /** A serialized value exceeded the cache plugin's `maxSize`. */
  CacheValueTooLarge = "CACHE_VALUE_TOO_LARGE",
  /** A database-level error occurred (unique violation, NOT NULL, etc.). */
  DatabaseError = "DATABASE_ERROR",
  /** The SQL dialect could not be inferred from the Drizzle client. */
  DialectInferenceFailed = "DIALECT_INFERENCE_FAILED",
  /** JSONB path filters are only supported by PostgreSQL. */
  JsonbQueryUnsupported = "JSONB_QUERY_UNSUPPORTED",
  /** JSONB path mutations are only supported by PostgreSQL. */
  JsonbMutationUnsupported = "JSONB_MUTATION_UNSUPPORTED",
  /** Native PostgreSQL array filters are only supported by PostgreSQL. */
  ArrayQueryUnsupported = "ARRAY_QUERY_UNSUPPORTED",
  /** Native PostgreSQL array mutations are only supported by PostgreSQL. */
  ArrayMutationUnsupported = "ARRAY_MUTATION_UNSUPPORTED",
  /** A lifecycle hook threw an error. */
  HookError = "HOOK_ERROR",
  /** The caller passed invalid operation arguments (bad shape, conflicting options, unknown fields, invalid values). */
  InvalidArgs = "INVALID_ARGS",
  /** Row locking is not supported for the current dialect or query shape. */
  LockNotSupported = "LOCK_NOT_SUPPORTED",
  /** Row locking is only allowed inside a transaction. */
  LockRequiresTransaction = "LOCK_REQUIRES_TRANSACTION",
  /** Row locking failed because the lock could not be acquired in time. */
  LockTimeout = "LOCK_TIMEOUT",
  /** An operation (CRUD, query, transaction) failed for a reason other than invalid arguments. */
  OperationError = "OPERATION_ERROR",
  /** A prepared statement was executed without a value for one of its params. */
  PreparedParamMissing = "PREPARED_PARAM_MISSING",
  /** A prepared statement was executed with a value for an unknown param. */
  PreparedParamUnknown = "PREPARED_PARAM_UNKNOWN",
  /** The query shape or dialect cannot be prepared. */
  PreparedUnsupported = "PREPARED_UNSUPPORTED",
  /** A plugin does not support the current SQL dialect. */
  PluginDialectUnsupported = "PLUGIN_DIALECT_UNSUPPORTED",
  /** Two plugins share the same `id`. */
  PluginDuplicateId = "PLUGIN_DUPLICATE_ID",
  /** Two plugins try to add the same client extension property. */
  PluginExtensionConflict = "PLUGIN_EXTENSION_CONFLICT",
  /** Two plugins try to add the same operation arg field. */
  PluginOperationArgConflict = "PLUGIN_OPERATION_ARG_CONFLICT",
  /** A required column is missing on a model. */
  PluginRequiredColumnMissing = "PLUGIN_REQUIRED_COLUMN_MISSING",
  /** A required column exists but its Drizzle `columnType`/`dataType` does not match. */
  PluginRequiredColumnType = "PLUGIN_REQUIRED_COLUMN_TYPE",
  /** `options.comment` is required when `raw.requireComment` is enabled. */
  RawCommentRequired = "RAW_COMMENT_REQUIRED",
  /** A raw query was aborted via `AbortSignal`. */
  RawAborted = "RAW_ABORTED",
  /** Raw SQL is disabled for this client. */
  RawDisabled = "RAW_DISABLED",
  /** The raw SQL input is not a valid tagged template or SQL object. */
  RawInvalidQuery = "RAW_INVALID_QUERY",
  /** A raw query timed out. */
  RawTimeout = "RAW_TIMEOUT",
  /** `$rawUnsafe()` is disabled. Set `raw.allowUnsafe: true` to enable. */
  RawUnsafeDisabled = "RAW_UNSAFE_DISABLED",
  /** The `?` placeholder count does not match the parameter count. */
  RawUnsafePlaceholderMismatch = "RAW_UNSAFE_PLACEHOLDER_MISMATCH",
  /** A raw SQL option is not supported by the current dialect. */
  RawUnsupportedOption = "RAW_UNSUPPORTED_OPTION",
  /** No repository matches the given name. */
  RepositoryNotFound = "REPOSITORY_NOT_FOUND",
  /** A `.throw()` call found no matching record. */
  ResultNotFound = "RESULT_NOT_FOUND",
  /** Internal: the table runtime metadata was not found. */
  TableRuntimeNotFound = "TABLE_RUNTIME_NOT_FOUND",
  /** `$tenant()` tried to change a tenant column that is already set. */
  TenantAlreadyScoped = "TENANT_ALREADY_SCOPED",
  /** A write set a tenant column to a value other than the active tenant. */
  TenantMismatch = "TENANT_MISMATCH",
  /** Raw SQL ran on a tenant-scoped client without the per-call opt-in. */
  TenantRawDenied = "TENANT_RAW_DENIED",
  /** An operation on a tenant-scoped model ran without the required tenant values. */
  TenantRequired = "TENANT_REQUIRED",
  /** A transaction was aborted via `AbortSignal` or timeout. */
  TransactionAborted = "TRANSACTION_ABORTED",
  /** Internal: transaction lifecycle state is missing. */
  TransactionLifecycleStateMissing = "TRANSACTION_LIFECYCLE_STATE_MISSING",
  /** Internal: transaction runtime was not initialized. */
  TransactionRuntimeNotInitialized = "TRANSACTION_RUNTIME_NOT_INITIALIZED",
  /** The transaction was explicitly rolled back via `rollback()`. */
  TransactionRollback = "TRANSACTION_ROLLBACK",
  /** The Drizzle client does not support transactions. */
  TransactionsUnsupported = "TRANSACTIONS_UNSUPPORTED",
  /** A transaction timed out. */
  TransactionTimeout = "TRANSACTION_TIMEOUT",
  /** A transaction option is not supported by the current dialect. */
  TransactionUnsupportedOption = "TRANSACTION_UNSUPPORTED_OPTION",
  /** A `findUnique` `where` does not pin one row by a primary or unique key. */
  UniqueWhereRequired = "UNIQUE_WHERE_REQUIRED",
  /** An unknown or uncategorised error occurred. */
  Unknown = "UNKNOWN"
}
/**
 * Configuration options for creating a {@link BetterDrizzleError}.
 *
 * @example
 * ```ts
 * const error = new BetterDrizzleError({
 *   code: BetterDrizzleErrorCode.DatabaseError,
 *   message: 'Unique constraint violated',
 *   table: 'users',
 *   constraint: 'users_email_unique',
 *   driver: 'pg',
 *   details: { operation: 'create', userId: 42 },
 * });
 * ```
 */
interface BetterDrizzleErrorOptions {
  /** The error code identifying the error category. */
  code: BetterDrizzleErrorCode;
  /** A human-readable error message. */
  message: string;
  /** Optional HTTP-like status code (derived from `code` when omitted). */
  status?: number;
  /** The detected database driver. */
  driver?: DatabaseDriver;
  /** The original error that caused this error. */
  cause?: unknown;
  /** The column involved in the error. */
  column?: string;
  /** The constraint that was violated. */
  constraint?: string;
  /** Additional structured error details. */
  details?: Record<string, unknown>;
  /** The SQL dialect in use. */
  dialect?: string;
  /** Driver-specific errno value. */
  errno?: number;
  /** The name of the hook that failed. */
  hookName?: string;
  /** The operation that failed. */
  operation?: string;
  /** SQLSTATE code from the database. */
  sqlState?: string;
  /** The lifecycle stage where the error occurred. */
  stage?: string;
  /** The table involved in the error. */
  table?: string;
}
/**
 * Parsed information about a database error. Normalises the various
 * error shapes from PostgreSQL, SQLite, and MySQL into a single
 * deterministic structure.
 */
interface DatabaseErrorInfo {
  /** The detected database driver (`'pg'`, `'sqlite'`, `'mysql'`, or `'unknown'`). */
  driver: DatabaseDriver;
  /** Driver-specific error code (e.g. `'23505'` for PostgreSQL unique violation). */
  code?: string;
  /** Errno value from MySQL errors, when available. */
  errno?: number;
  /** Name of the constraint that was violated, when detectable. */
  constraint?: string;
  /** The table involved in the error, when detectable. */
  table?: string;
  /** The column involved in the error, when detectable. */
  column?: string;
  /** The original error message. */
  message: string;
}
/**
 * The primary error class thrown by Better Drizzle operations.
 *
 * Extends `Error` with structured metadata including `code`, `status`,
 * `driver`, `table`, `column`, `constraint`, and more. Use the static
 * helpers to normalise external errors into this shape.
 *
 * @example
 * ```ts
 * import { BetterDrizzleError, BetterDrizzleErrorCode } from 'better-drizzle';
 *
 * // Throwing a custom error
 * throw new BetterDrizzleError({
 *   code: BetterDrizzleErrorCode.DatabaseError,
 *   message: 'Unique constraint violated',
 *   table: 'users',
 *   constraint: 'users_email_unique',
 * });
 *
 * // Normalising an external error
 * const betterError = BetterDrizzleError.from(originalError);
 *
 * // Checking error type
 * if (BetterDrizzleError.is(error)) {
 *   console.log(error.code, error.status);
 * }
 * ```
 */
declare class BetterDrizzleError extends Error {
  /** The error code identifying the error category. */
  code: BetterDrizzleErrorCode;
  /** HTTP-like status code derived from the error code. */
  status: number;
  /** The detected database driver, if applicable. */
  driver?: DatabaseDriver;
  /** The column involved in the error, if detectable. */
  column?: string;
  /** The constraint that was violated, if detectable. */
  constraint?: string;
  /** Additional structured error details. */
  details?: Record<string, unknown>;
  /** The SQL dialect in use, if known. */
  dialect?: string;
  /** Driver-specific errno value, if available. */
  errno?: number;
  /** The name of the hook that failed, if the error originated from a hook. */
  hookName?: string;
  /** The operation that failed (e.g. `'create'`, `'transaction'`). */
  operation?: string;
  /** SQLSTATE code from the database, if available. */
  sqlState?: string;
  /** The lifecycle stage where the error occurred (e.g. `'beforeHook'`). */
  stage?: string;
  /** The table involved in the error, if detectable. */
  table?: string;
  /**
   * Creates a new `BetterDrizzleError`.
   *
   * @param options - Error configuration including `code`, `message`, and
   *   optional metadata fields.
   */
  constructor(options: BetterDrizzleErrorOptions);
  /**
   * Type guard that checks whether a value is a `BetterDrizzleError`.
   *
   * @param error - The value to check.
   * @returns `true` when the value is an instance of `BetterDrizzleError`.
   *
   * @example
   * ```ts
   * try {
   *   await db.user.findUnique({ where: { id: 1 } }).throw();
   * } catch (error) {
   *   if (BetterDrizzleError.is(error)) {
   *     console.log(error.code); // 'RESULT_NOT_FOUND'
   *   }
   * }
   * ```
   */
  static is(error: unknown): error is BetterDrizzleError;
  /**
   * Normalises any error value into a `BetterDrizzleError`.
   *
   * If the input is already a `BetterDrizzleError`, clones it with
   * optional overrides. Otherwise, inspects the error for database
   * driver information and creates a new instance.
   *
   * @param error - The original error value.
   * @param overrides - Optional fields to override on the resulting error.
   * @returns A new `BetterDrizzleError` instance.
   *
   * @example
   * ```ts
   * try {
   *   await db.insert(users).values(data);
   * } catch (error) {
   *   const betterError = BetterDrizzleError.from(error, {
   *     operation: 'create',
   *     table: 'users',
   *   });
   *   throw betterError;
   * }
   * ```
   */
  static from(error: unknown, overrides?: Partial<BetterDrizzleErrorOptions>): BetterDrizzleError;
  /**
   * Normalises a database-specific error into a `BetterDrizzleError`.
   *
   * Inspects the error for PostgreSQL, SQLite, or MySQL patterns and
   * extracts the driver, code, constraint, table, column, and message.
   *
   * @param error - The raw database error.
   * @param overrides - Optional fields to override on the resulting error.
   * @returns A new `BetterDrizzleError` with `code: DATABASE_ERROR`.
   *
   * @example
   * ```ts
   * try {
   *   await db.insert(users).values({ email: 'duplicate@example.com' });
   * } catch (error) {
   *   const dbError = BetterDrizzleError.fromDatabaseError(error);
   *   if (isUniqueViolation(error)) {
   *     console.log('Duplicate email:', dbError.constraint);
   *   }
   * }
   * ```
   */
  static fromDatabaseError(error: unknown, overrides?: Partial<BetterDrizzleErrorOptions>): BetterDrizzleError;
  /**
   * Creates a clone of this error with an additional `cause`.
   *
   * @param cause - The underlying cause to attach.
   * @returns A new `BetterDrizzleError` with the updated cause.
   *
   * @example
   * ```ts
   * const original = BetterDrizzleError.from(error);
   * const wrapped = original.withCause(new Error('retry failed'));
   * ```
   */
  withCause(cause: unknown): BetterDrizzleError;
  /**
   * Creates a clone of this error with merged detail fields.
   *
   * @param details - Additional details to merge into the existing details.
   * @returns A new `BetterDrizzleError` with the merged details.
   *
   * @example
   * ```ts
   * const error = BetterDrizzleError.from(original).withDetails({
   *   userId: 123,
   *   requestId: 'abc-456',
   * });
   * ```
   */
  withDetails(details: Record<string, unknown>): BetterDrizzleError;
  /**
   * Serialises the error to a plain JSON-safe object.
   *
   * @returns A plain object with all error fields.
   *
   * @example
   * ```ts
   * const error = BetterDrizzleError.from(original);
   * console.log(JSON.stringify(error.toJSON()));
   * ```
   */
  toJSON(): {
    name: string;
    message: string;
    code: BetterDrizzleErrorCode;
    status: number;
    driver: DatabaseDriver | undefined;
    column: string | undefined;
    constraint: string | undefined;
    details: Record<string, unknown> | undefined;
    dialect: string | undefined;
    errno: number | undefined;
    hookName: string | undefined;
    operation: string | undefined;
    sqlState: string | undefined;
    stage: string | undefined;
    table: string | undefined;
  };
}
/**
 * Checks whether the given value looks like a database error (has a
 * `message`, `code`, `errno`, or `sqlState` property).
 *
 * @param error - The value to check.
 * @returns `true` when the value matches the database error shape.
 *
 * @example
 * ```ts
 * try {
 *   await db.insert(users).values(data);
 * } catch (error) {
 *   if (isDatabaseError(error)) {
 *     console.error(error.code);
 *   }
 * }
 * ```
 */
declare const isDatabaseError: (error: unknown) => error is ErrorWithFields;
/**
 * Parses a raw error value into a normalised {@link DatabaseErrorInfo}
 * object. Detects the database driver and extracts the error code,
 * constraint name, table, column, and message.
 *
 * @param error - The raw error value (typically caught from a Drizzle operation).
 * @returns A normalised error info object.
 */
declare const getDatabaseErrorInfo: (error: unknown) => DatabaseErrorInfo;
/**
 * Checks whether the error is a unique constraint violation. Supports
 * PostgreSQL (`23505`), SQLite (`SQLITE_CONSTRAINT_UNIQUE`), and MySQL
 * (`ER_DUP_ENTRY` / errno `1062`).
 *
 * @param error      - The raw error value.
 * @param constraint - Optional constraint name to match against.
 * @returns `true` when the error is a unique violation (optionally for
 *   the specified constraint).
 */
declare const isUniqueViolation: (error: unknown, constraint?: string) => boolean;
/**
 * Checks whether the error is a foreign key constraint violation. Supports
 * PostgreSQL (`23503`), SQLite (`SQLITE_CONSTRAINT_FOREIGNKEY`), and MySQL
 * (`ER_NO_REFERENCED_ROW_2` / `ER_ROW_IS_REFERENCED_2`).
 *
 * @param error      - The raw error value.
 * @param constraint - Optional constraint name to match against.
 * @returns `true` when the error is a foreign key violation (optionally
 *   for the specified constraint).
 */
declare const isForeignKeyViolation: (error: unknown, constraint?: string) => boolean;
/**
 * Checks whether the error is a NOT NULL constraint violation. Supports
 * PostgreSQL (`23502`), SQLite (`SQLITE_CONSTRAINT_NOTNULL`), and MySQL
 * (`ER_BAD_NULL_ERROR` / errno `1048`).
 *
 * @param error  - The raw error value.
 * @param column - Optional column name to match against.
 * @returns `true` when the error is a NOT NULL violation (optionally for
 *   the specified column).
 */
declare const isNotNullViolation: (error: unknown, column?: string) => boolean;
/**
 * Checks whether the error is a CHECK constraint violation. Supports
 * PostgreSQL (`23514`), SQLite (`SQLITE_CONSTRAINT_CHECK`), and MySQL
 * (`ER_CHECK_CONSTRAINT_VIOLATED` / errno `3819`).
 *
 * @param error      - The raw error value.
 * @param constraint - Optional constraint name to match against.
 * @returns `true` when the error is a CHECK violation (optionally for
 *   the specified constraint).
 */
declare const isCheckViolation: (error: unknown, constraint?: string) => boolean;
//#endregion
//#region src/types/explain.d.ts
/**
 * Options that control how `EXPLAIN` is executed and what metadata is returned.
 *
 * Not every driver supports every option. Unsupported options are silently
 * ignored and reported in {@link ExplainStatement.ignoredOptions} so callers
 * can detect when a flag had no effect.
 *
 * @example
 * ```ts
 * const result = await db.repository('users')
 *   .findMany({ where: { active: true } })
 *   .explain({ analyze: true, verbose: true });
 * ```
 */
type ExplainOptions = {
  /**
   * When `true`, the database runs the query and reports actual execution
   * statistics instead of estimates.
   *
   * - **PostgreSQL**: supported - maps to `EXPLAIN (ANALYZE true)`.
   * - **MySQL**: supported - maps to `EXPLAIN ANALYZE`.
   * - **SQLite**: not supported - reported as ignored.
   */
  analyze?: boolean;
  /**
   * When `true`, the output includes additional columns such as the
   * output schema of each plan node.
   *
   * - **PostgreSQL**: supported - maps to `EXPLAIN (VERBOSE true)`.
   * - **MySQL**: not supported - reported as ignored.
   * - **SQLite**: not supported - reported as ignored.
   */
  verbose?: boolean;
  /**
   * When `false`, the estimated startup and total cost of each plan node
   * are omitted from the output.
   *
   * - **PostgreSQL**: supported - maps to `EXPLAIN (COSTS false)`.
   * - **MySQL**: not supported - reported as ignored.
   * - **SQLite**: not supported - reported as ignored.
   */
  costs?: boolean;
  /**
   * When `false`, the actual time spent in each plan node is omitted even
   * when `analyze` is `true`.
   *
   * - **PostgreSQL**: supported - maps to `EXPLAIN (TIMING false)`.
   * - **MySQL**: not supported - reported as ignored.
   * - **SQLite**: not supported - reported as ignored.
   */
  timing?: boolean;
  /**
   * When `false`, the summary line (e.g. "Planning Time", "Execution Time")
   * is omitted from the output.
   *
   * - **PostgreSQL**: supported - maps to `EXPLAIN (SUMMARY false)`.
   * - **MySQL**: not supported - reported as ignored.
   * - **SQLite**: not supported - reported as ignored.
   */
  summary?: boolean;
  /**
   * Optional timeout in milliseconds for the `EXPLAIN` execution itself.
   *
   * If the database does not return within this window the operation is
   * rejected with a `BetterDrizzleError` whose code is `RAW_TIMEOUT`.
   * A value of `0` or less throws immediately without running the query.
   *
   * This option is driver-agnostic and applies to all dialects.
   */
  timeoutMs?: number;
  /**
   * Optional name for the prepared statement created by `EXPLAIN`.
   *
   * - **PostgreSQL**: supported - maps to `EXPLAIN (NAME '...')`.
   * - **MySQL**: not supported - reported as ignored.
   * - **SQLite**: not supported - reported as ignored.
   */
  name?: string;
  /**
   * Optional SQL comment that is prepended to the explained query.
   *
   * The comment is sanitized to prevent SQL injection via comment
   * termination: the star-slash sequence is split with a space.
   *
   * - **PostgreSQL**: supported -- prepended as a block comment before the query.
   * - **MySQL**: not supported -- reported as ignored.
   * - **SQLite**: not supported -- reported as ignored.
   */
  comment?: string;
};
/**
 * The set of read operations that support `.explain()`.
 *
 * Write operations (`create`, `update`, `delete`, etc.) do **not** support
 * explain and will throw if `.explain()` is called on their results.
 */
type ExplainOperation = 'count' | 'cursor' | 'exists' | 'findFirst' | 'findMany' | 'findOne' | 'findUnique' | 'paginate';
/**
 * A single statement inside an {@link ExplainResult}.
 *
 * Complex operations such as `paginate` and `cursor` may produce multiple
 * statements (e.g. one for the data query one for the total count, or
 * probe queries for `hasNext`/`hasPrevious`).
 *
 * @example
 * ```ts
 * const result = await client.users
 *   .findMany({ where: { active: true } })
 *   .explain();
 *
 * const stmt = result.statements[0];
 * console.log(stmt.key);            // "data"
 * console.log(stmt.sql);            // "select ... from users where ..."
 * console.log(stmt.params);         // []
 * console.log(stmt.appliedOptions); // {}
 * console.log(stmt.ignoredOptions); // []
 * console.log(stmt.raw);            // [{ "QUERY PLAN": "Seq Scan on users" }]
 * ```
 */
interface ExplainStatement {
  /** When present, this statement runs only under the stated condition. */
  condition?: string;
  /**
   * A stable key identifying the role of this statement within the
   * operation (e.g. `"data"`, `"total"`, `"probe:hasNext"`).
   */
  key: string;
  /**
   * The compiled SQL string that was sent to the database, **without**
   * the `EXPLAIN` prefix.
   */
  sql: string;
  /**
   * The ordered list of parameter values bound to the SQL string.
   */
  params: unknown[];
  /**
   * The subset of {@link ExplainOptions} that were actually applied by
   * the driver. Options unsupported by the current dialect are excluded.
   */
  appliedOptions: Partial<ExplainOptions>;
  /**
   * The {@link ExplainOptions} keys that were provided but are not
   * supported by the current driver and were therefore ignored.
   */
  ignoredOptions: Array<keyof ExplainOptions>;
  /**
   * The raw result returned by the database driver for this `EXPLAIN`
   * statement. The shape varies by driver:
   *
   * - **PostgreSQL**: an array of row objects from `pg`'s `EXPLAIN` output.
   * - **MySQL**: an array of row objects from `EXPLAIN [ANALYZE]`.
   * - **SQLite**: an array of `{ id, parent, detail }` objects from
   *   `EXPLAIN QUERY PLAN`.
   */
  raw: unknown;
}
/**
 * The full result of an `.explain()` call on a read operation.
 *
 * Contains the dialect, the operation name, and one or more
 * {@link ExplainStatement}s that describe the queries executed.
 *
 * @example
 * ```ts
 * const result = await client.users
 *   .findMany({ where: { active: true } })
 *   .explain({ analyze: true });
 *
 * console.log(result.driver);      // "sqlite" | "pg" | "mysql"
 * console.log(result.operation);   // "findMany"
 * console.log(result.statements);  // [{ key: "data", sql: "...", ... }]
 * ```
 *
 * @example
 * ```ts
 * // paginate() produces two statements
 * const result = await client.users
 *   .paginate({ limit: 10, orderBy: { id: "asc" } })
 *   .explain();
 *
 * console.log(result.statements.map(s => s.key));
 * // ["data", "total"]
 * ```
 */
interface ExplainResult {
  /**
   * The database driver that was used to execute the `EXPLAIN`.
   */
  driver: Exclude<DatabaseDriver, 'unknown'>;
  /**
   * The operation that was explained (e.g. `"findMany"`, `"paginate"`).
   */
  operation: ExplainOperation;
  /**
   * Relation queries whose bindings depend on keys returned by the root
   * statement. They are described without executing the root read.
   */
  deferredRelations: {
    cardinality: 'many' | 'one';
    filtered: boolean;
    paginated: boolean;
    path: string;
    sorted: boolean;
    table: string;
    through?: string;
  }[];
  /**
   * Cursor probes whose SQL depends on a row returned by the data query.
   * They cannot be explained without running that read first.
   */
  deferredProbes?: {
    key: string;
    reason: string;
  }[];
  /**
   * The statements produced by the `EXPLAIN`. Most operations yield a
   * single statement; `paginate` yields two (`data` + `total`), and
   * `cursor` may yield additional probe statements.
   */
  statements: ExplainStatement[];
}
/**
 * A `Promise<T>` augmented with an `.explain()` method.
 *
 * Calling `.explain()` does **not** start the underlying database operation.
 * `analyze: true` asks PostgreSQL and MySQL to execute the explained SQL.
 * It runs the `EXPLAIN` path independently while preserving native promise
 * behavior for `await`, `.then()`, and test helpers such as
 * `expect(...).resolves` / `expect(...).rejects`.
 *
 * @typeParam T - The resolved type of the underlying operation.
 *
 * @example
 * ```ts
 * const result = db.repository('users').findMany({ where: { active: true } });
 *
 * // Inspect the plan without running the query
 * const plan = await result.explain({ analyze: true });
 * console.log(plan.statements[0].sql);
 *
 * // Now actually run the query
 * const users = await result;
 * ```
 */
type ExplainableResult<T> = Promise<T> & {
  /**
   * Returns the `EXPLAIN` plan for the underlying operation without
   * executing it.
   *
   * @param options - Optional flags that control the `EXPLAIN` output.
   *   See {@link ExplainOptions} for per-dialect support details.
   * @returns A promise that resolves to an {@link ExplainResult} containing
   *   the dialect, operation name, and statement details.
   */
  explain(options?: ExplainOptions): Promise<ExplainResult>;
};
//#endregion
//#region src/types/query.d.ts
type JsonbKeysFor<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in ScalarKeysFor<Schema, Name>]: K extends keyof TableFor<Schema, Name> ? IsPgJsonColumn<TableFor<Schema, Name>[K]> extends true ? K : never : never; }[ScalarKeysFor<Schema, Name>];
type JsonbWhereField<T> = T | ScalarFilter<T> | JsonDottedWhereInput<T> | {
  /** Path filters, including root-level keys; dotted paths directly on the column are the shorthand for nested paths. */
  json: JsonWhereInput<T>;
};
type RelationWhereInput<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = RelationFor<Schema, Name, RelationName> extends Many<string> ? {
  some?: WhereInput<Schema, RelatedNameFor<Schema, Name, RelationName>>;
  every?: WhereInput<Schema, RelatedNameFor<Schema, Name, RelationName>>;
  none?: WhereInput<Schema, RelatedNameFor<Schema, Name, RelationName>>;
} : RelationFor<Schema, Name, RelationName> extends One<string, boolean> ? {
  is?: WhereInput<Schema, RelatedNameFor<Schema, Name, RelationName>> | null;
  isNot?: WhereInput<Schema, RelatedNameFor<Schema, Name, RelationName>> | null;
} : never;
/**
 * Comprehensive where-clause input for a specific table. Supports scalar
 * filters, logical combinators (`AND`, `OR`, `NOT`), and nested relation
 * filters (`some`, `every`, `none` for one-to-many; `is`, `isNot` for
 * many-to-one / one-to-one).
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * // Simple equality
 * const users = await db.user.findMany({
 *   where: { active: true },
 * });
 *
 * // Comparison operators
 * const users = await db.user.findMany({
 *   where: { age: { gte: 18, lt: 65 } },
 * });
 *
 * // Logical combinators
 * const users = await db.user.findMany({
 *   where: {
 *     AND: [{ active: true }, { role: 'admin' }],
 *   },
 * });
 *
 * // Relation filters (one-to-many)
 * const users = await db.user.findMany({
 *   where: {
 *     posts: { some: { title: { contains: 'TypeScript' } } },
 *   },
 * });
 *
 * // Relation filters (many-to-one)
 * const posts = await db.post.findMany({
 *   where: {
 *     author: { is: { name: 'Alice' } },
 *   },
 * });
 * ```
 */
type WhereInput<Schema extends AnySchema, Name extends TableKey<Schema>> = {
  /** Logical AND – all sub-conditions must match. */
  AND?: WhereInput<Schema, Name>[];
  /** Logical OR – at least one sub-condition must match. */
  OR?: WhereInput<Schema, Name>[];
  /** Logical NOT – negates the sub-condition(s). */
  NOT?: WhereInput<Schema, Name> | WhereInput<Schema, Name>[];
} & { [K in ScalarKeysFor<Schema, Name>]?: K extends JsonbKeysFor<Schema, Name> ? JsonbWhereField<SelectModelFor<Schema, Name>[K]> : K extends PgArrayKeysFor<Schema, Name> ? ArrayWhereField<SelectModelFor<Schema, Name>[K]> : ScalarWhereField<SelectModelFor<Schema, Name>[K]>; } & { [K in RelationKeysFor<Schema, Name>]?: RelationWhereInput<Schema, Name, K>; };
/**
 * Accepted where-clause value. May be a structured {@link WhereInput}, a raw
 * Drizzle `SQL` expression, or any `SQLWrapper`.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * import { sql } from 'drizzle-orm';
 *
 * // Structured where
 * const users = await db.user.findMany({
 *   where: { active: true },
 * });
 *
 * // Raw SQL expression
 * const users = await db.user.findMany({
 *   where: sql`active = ${true}`,
 * });
 * ```
 */
type WhereArg<Schema extends AnySchema, Name extends TableKey<Schema>> = WhereInput<Schema, Name> | SQL | SQLWrapper;
type SelectRelationArg<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = true | (Omit<QueryArgs<Schema, RelatedNameFor<Schema, Name, RelationName>>, 'comment'> & {
  lock?: never;
});
type CountRelationArg<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = true | {
  where?: WhereArg<Schema, RelatedNameFor<Schema, Name, RelationName>>;
};
type CountSelectInput<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in RelationKeysFor<Schema, Name>]?: CountRelationArg<Schema, Name, K>; };
/**
 * Select projection for a query. Keys represent scalar columns (set to `true`
 * to include) or relations (set to `true` or a nested {@link QueryArgs}).
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * // Select specific columns
 * const users = await db.user.findMany({
 *   select: { id: true, name: true },
 * });
 * // Returns: { id: number; name: string }[]
 *
 * // Select columns and relations
 * const users = await db.user.findMany({
 *   select: {
 *     id: true,
 *     name: true,
 *     posts: { where: { published: true } },
 *   },
 * });
 * ```
 */
type SelectInput<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in ScalarKeysFor<Schema, Name>]?: boolean; } & { [K in RelationKeysFor<Schema, Name>]?: SelectRelationArg<Schema, Name, K>; };
/** Scalar-only projection for native batch mutations. */
type ScalarSelectInput<Schema extends AnySchema, Name extends TableKey<Schema>> = SelectInput<Schema, Name> & { [K in RelationKeysFor<Schema, Name>]?: never; };
/**
 * Include projection for a query. Only relations are selectable here; scalar
 * columns are always included in the result when `include` is used.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * // Include all posts
 * const users = await db.user.findMany({
 *   include: { posts: true },
 * });
 *
 * // Include with filter
 * const users = await db.user.findMany({
 *   include: {
 *     posts: { where: { published: true }, orderBy: { createdAt: 'desc' } },
 *   },
 * });
 * ```
 */
type IncludeInput<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in RelationKeysFor<Schema, Name>]?: SelectRelationArg<Schema, Name, K>; } & {
  count?: {
    select: CountSelectInput<Schema, Name>;
  };
  /** @deprecated Use `count`. Removed in 0.5.0. */
  _count?: {
    select: CountSelectInput<Schema, Name>;
  };
};
type RelationOrderBy<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = RelationFor<Schema, Name, RelationName> extends Many<string> ? {
  count: SortOrder;
} | {
  /** @deprecated Use `count`. Removed in 0.5.0. */
  _count: SortOrder;
} : RelationFor<Schema, Name, RelationName> extends One<string, boolean> ? OrderByField<Schema, RelatedNameFor<Schema, Name, RelationName>> : never;
type OrderByField<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in ScalarKeysFor<Schema, Name>]?: SortOrder | SortConfig; } & { [K in RelationKeysFor<Schema, Name>]?: RelationOrderBy<Schema, Name, K>; };
/**
 * Sort specification for a query result set. Can be a single field map or an
 * array of field maps for multi-column ordering.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * // Single field
 * const users = await db.user.findMany({
 *   orderBy: { name: 'asc' },
 * });
 *
 * // Control NULL placement
 * const activeUsers = await db.user.findMany({
 *   orderBy: { lastSeenAt: { direction: 'desc', nulls: 'last' } },
 * });
 *
 * // Multiple fields
 * const users = await db.user.findMany({
 *   orderBy: [{ role: 'asc' }, { name: 'desc' }],
 * });
 * ```
 */
type OrderByInput<Schema extends AnySchema, Name extends TableKey<Schema>> = OrderByField<Schema, Name> | OrderByField<Schema, Name>[];
/**
 * Custom metadata object attached to every operation. Extend this to carry
 * request-scoped context (e.g. user ID, trace ID) through hooks.
 *
 * @example
 * ```ts
 * // Pass metadata to operations
 * await db.user.create({
 *   data: { name: 'Alice' },
 *   meta: { userId: 1, requestId: 'abc-123' },
 * });
 *
 * // Access in hooks
 * const db = better(drizzle, {
 *   hooks: {
 *     beforeCreate(ctx) {
 *       console.log(ctx.meta); // { userId: 1, requestId: 'abc-123' }
 *     },
 *   },
 * });
 * ```
 */
type BetterMeta = Record<string, unknown>;
/**
 * Cursor position used for cursor-based pagination. Contains the scalar
 * column values that identify a specific row. Reads return only rows
 * strictly after the position in `orderBy` direction. `cursor()` returns
 * this shape as `nextCursor` / `previousCursor`.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   orderBy: { createdAt: 'desc' },
 *   cursor: { createdAt: new Date('2024-01-01') },
 *   take: 10,
 * });
 * ```
 */
type CursorInput<Schema extends AnySchema, Name extends TableKey<Schema>> = Partial<Pick<SelectModelFor<Schema, Name>, ScalarKeysFor<Schema, Name>>>;
/**
 * Row lock strength mode. Determines the type of lock acquired on matched rows.
 *
 * - `'update'` – `FOR UPDATE` – exclusive lock for writing.
 * - `'share'` – `FOR SHARE` – shared lock that prevents updates but allows reads.
 * - `'noKeyUpdate'` – `FOR NO KEY UPDATE` – like update but does not block key share locks (PostgreSQL only).
 * - `'keyShare'` – `FOR KEY SHARE` – like share but does not block update locks (PostgreSQL only).
 */
type LockMode = 'update' | 'share' | 'noKeyUpdate' | 'keyShare';
/**
 * Valid table name for the `lock.tables` option. Accepts either the
 * TypeScript table key or the database table name from the schema.
 *
 * @typeParam Schema - The Drizzle schema type.
 */
type LockTableName<Schema extends AnySchema> = Extract<TableKey<Schema> | DbNameKey<Schema>, string>;
/**
 * Row lock configuration for read operations. Can be a string shorthand
 * (`'update'` or `'share'`) or a full configuration object.
 *
 * Supported on PostgreSQL and MySQL only. SQLite will throw `LOCK_NOT_SUPPORTED`.
 *
 * @typeParam Schema - The Drizzle schema type.
 *
 * @example
 * ```ts
 * // String shorthand
 * await db.user.findMany({ lock: 'update' });
 *
 * // Full object form
 * await db.user.findMany({
 *   lock: {
 *     mode: 'update',
 *     skipLocked: true,
 *     tables: ['user'],
 *   },
 * });
 * ```
 */
type LockOption<Schema extends AnySchema = AnySchema> = 'update' | 'share' | {
  /** The lock strength mode. */
  mode: LockMode;
  /** Skip rows that are already locked by another transaction. Mutually exclusive with `noWait`. */
  skipLocked?: boolean;
  /** Fail immediately if any requested row is locked. Mutually exclusive with `skipLocked`. */
  noWait?: boolean;
  /** PostgreSQL only: restrict the lock to specific tables. */
  tables?: readonly LockTableName<Schema>[];
};
/**
 * Client-level row lock configuration. Passed to {@link BetterClientOptions}
 * via the `locks` property.
 *
 * @example
 * ```ts
 * const db = better(drizzle, {
 *   locks: { transactionsOnly: true },
 * });
 * ```
 */
interface BetterLockClientOptions {
  /** When `true`, row locks are only allowed inside a transaction. */
  transactionsOnly?: boolean;
}
/**
 * Arguments accepted by read operations (`findMany`, `findFirst`, `findOne`,
 * `findUnique`). Controls filtering, projection, ordering, pagination, and
 * cursor position.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   where: { active: true },
 *   select: { id: true, name: true },
 *   orderBy: { name: 'asc' },
 *   take: 10,
 *   skip: 0,
 * });
 *
 * // With relations
 * const users = await db.user.findMany({
 *   include: { posts: { where: { published: true } } },
 * });
 *
 * // Rows after a cursor position, in `orderBy` direction
 * const users = await db.user.findMany({
 *   cursor: { id: lastId },
 *   orderBy: { id: 'asc' },
 *   take: 10,
 * });
 * ```
 */
interface QueryArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> {
  /** Filter to restrict which rows are returned. */
  where?: WhereArg<Schema, Name>;
  /** Column and relation projection for the result set. */
  select?: SelectInput<Schema, Name>;
  /** Relation-only projection (all scalar columns are included). */
  include?: IncludeInput<Schema, Name>;
  /** Sort order for the result set. */
  orderBy?: OrderByInput<Schema, Name>;
  /** Maximum number of rows to return. A negative value does not reverse the order; use `orderBy` with `'desc'`. */
  take?: Bindable<number>;
  /** Number of rows to skip from the start of the result set. */
  skip?: Bindable<number>;
  /** Cursor position for cursor-based pagination. */
  cursor?: Bindable<CursorInput<Schema, Name>>;
  /** Row locking clause for supported dialects and query shapes. */
  lock?: LockOption<Schema>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `count` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * // Count all rows
 * const total = await db.user.count();
 *
 * // Count with filter
 * const activeCount = await db.user.count({
 *   where: { active: true },
 * });
 * ```
 */
type CountArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> = Pick<QueryArgs<Schema, Name, Meta>, 'where' | 'cursor' | 'meta' | 'comment'>;
/**
 * Arguments for the `exists` operation.
 * Identical in shape to {@link CountArgs}.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const hasAdmin = await db.user.exists({
 *   where: { role: 'admin' },
 * });
 * ```
 */
type ExistsArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> = CountArgs<Schema, Name, Meta>;
/**
 * Arguments for the `paginate` operation.
 * Offset-only pagination with count and page metadata.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const {
 *   data,
 *   pagination: { total, hasNext },
 * } = await db.user.paginate({
 *   page: 1,
 *   perPage: 10,
 *   orderBy: { name: 'asc' },
 *   where: { active: true },
 * });
 * ```
 */
type PaginationArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> = QueryArgs<Schema, Name, Meta> & OffsetPaginationOptions<SelectModelFor<Schema, Name>>;
/**
 * Arguments for the `cursor` operation.
 * Cursor-based pagination using `before` or `after`.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type CursorArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> = QueryArgs<Schema, Name, Meta> & CursorPaginationOptions<SelectModelFor<Schema, Name>> & {
  /** Cursor object (e.g. a previous `nextCursor`) to page forward from; `null` starts at the first page. */
  after?: Bindable<CursorInput<Schema, Name>> | null;
  /** Cursor object (e.g. a previous `previousCursor`) to page backward from; `null` is ignored. */
  before?: Bindable<CursorInput<Schema, Name>> | null;
};
type RelationPayloadFromArg<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>, Arg> = Arg extends true ? DefaultPayload<Schema, RelatedNameFor<Schema, Name, RelationName>> : Arg extends QueryArgs<Schema, RelatedNameFor<Schema, Name, RelationName>> ? PayloadForArgs<Schema, RelatedNameFor<Schema, Name, RelationName>, Arg> : never;
type SelectedScalarPayload<Schema extends AnySchema, Name extends TableKey<Schema>, Select extends SelectInput<Schema, Name>> = { [K in keyof SelectModelFor<Schema, Name> as K extends keyof Select ? Select[K] extends true ? K : never : never]: SelectModelFor<Schema, Name>[K]; };
type SelectedRelationPayload<Schema extends AnySchema, Name extends TableKey<Schema>, Select extends SelectInput<Schema, Name>> = { [K in RelationKeysFor<Schema, Name> as K extends keyof Select ? Select[K] extends true | QueryArgs<Schema, RelatedNameFor<Schema, Name, K>> ? K : never : never]: RelationFor<Schema, Name, K> extends Many<string> ? RelationPayloadFromArg<Schema, Name, K, Select[K]>[] : OneRelationPayload<RelationFor<Schema, Name, K>, Select[K], RelationPayloadFromArg<Schema, Name, K, Select[K]>>; };
/**
 * A one-relation payload is nullable unless Drizzle declares it with
 * `optional: false` and the nested args do not filter it with `where`.
 */
type OneRelationPayload<Relation, Arg, Payload> = Relation extends {
  optional: false;
} ? Arg extends {
  where: object;
} ? Payload | null : Payload : Payload | null;
type IncludedRelationPayload<Schema extends AnySchema, Name extends TableKey<Schema>, Include extends IncludeInput<Schema, Name>> = SelectModelFor<Schema, Name> & { [K in RelationKeysFor<Schema, Name> as K extends keyof Include ? Include[K] extends true | QueryArgs<Schema, RelatedNameFor<Schema, Name, K>> ? K : never : never]: RelationFor<Schema, Name, K> extends Many<string> ? RelationPayloadFromArg<Schema, Name, K, Include[K]>[] : OneRelationPayload<RelationFor<Schema, Name, K>, Include[K], RelationPayloadFromArg<Schema, Name, K, Include[K]>>; };
type IncludedCountPayload<Schema extends AnySchema, Name extends TableKey<Schema>, Include extends IncludeInput<Schema, Name>> = CountPayloadFor<Schema, Name, Include, 'count'> & CountPayloadFor<Schema, Name, Include, '_count'>;
type CountPayloadFor<Schema extends AnySchema, Name extends TableKey<Schema>, Include extends IncludeInput<Schema, Name>, Key extends 'count' | '_count'> = Include extends { [P in Key]: {
  select: infer Count;
}; } ? { [P in Key]: { [K in RelationKeysFor<Schema, Name> as K extends keyof Count ? Count[K] extends CountRelationArg<Schema, Name, K> ? K : never : never]: number; }; } : object;
type DefaultPayload<Schema extends AnySchema, Name extends TableKey<Schema>> = SelectModelFor<Schema, Name>;
/**
 * Resolves the result type for a query operation based on the provided args.
 * When `select` or `include` is specified, the returned shape is narrowed
 * accordingly.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Args - The concrete query arguments object.
 */
type PayloadForArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Args> = Args extends {
  select: infer Select extends SelectInput<Schema, Name>;
} ? SelectedScalarPayload<Schema, Name, Select> & SelectedRelationPayload<Schema, Name, Select> : Args extends {
  include: infer Include extends IncludeInput<Schema, Name>;
} ? IncludedRelationPayload<Schema, Name, Include> & IncludedCountPayload<Schema, Name, Include> : DefaultPayload<Schema, Name>;
//#endregion
//#region src/types/prepared.d.ts
/**
 * A named value of a prepared statement, created by `param(name)`. It is
 * Drizzle's `sql.placeholder(name)`, so the two are interchangeable.
 *
 * @typeParam Name - The param name passed to `execute()`.
 */
type PreparedParam<Name extends string = string, Value = unknown> = Placeholder<Name, Value>;
type UnionToIntersection$1<U> = (U extends unknown ? (value: U) => void : never) extends ((value: infer I) => void) ? I : never;
type Simplify<T> = { [K in keyof T]: T[K]; } & {};
type Depth = readonly unknown[];
type Params<T, D extends Depth = []> = D['length'] extends 10 ? never : T extends PreparedParam<infer Name, infer Value> ? string extends Name ? never : { [K in Name]: Value; } : T extends SQLWrapper | Date | ((...args: never[]) => unknown) ? never : T extends readonly (infer Entry)[] ? Params<Entry, readonly [...D, unknown]> : T extends object ? { [K in keyof T]-?: Params<NonNullable<T[K]>, readonly [...D, unknown]>; }[keyof T] : never;
/**
 * Values a prepared read expects, keyed by param name. Each value type is
 * inferred from the column, operator, or pagination option the param
 * stands in for.
 */
type PreparedParamsFor<Args> = Simplify<UnionToIntersection$1<Params<Args>>>;
/** Per-execution options of a prepared statement. */
interface PreparedExecuteOptions<Meta = BetterMeta> {
  /** Metadata merged over the `meta` captured at prepare time. */
  meta?: Meta;
}
type ValuesArgs<Params, Rest extends unknown[]> = {} extends Params ? [values?: Params, ...rest: Partial<Rest>] : [values: Params, ...rest: Partial<Rest>];
/**
 * A read compiled once into Drizzle prepared statements. `execute()` runs
 * it with new values and returns the same result as the regular read.
 *
 * @typeParam Result - The resolved result of `execute()`.
 * @typeParam Params - The values `execute()` expects.
 * @typeParam Meta   - Custom metadata type.
 */
interface PreparedStatement<Result, Params extends object = Record<never, never>, Meta = BetterMeta> {
  /** The name given to `.prepare(name)`; PostgreSQL uses it for the server-side statement. */
  readonly name: string | undefined;
  /**
   * Runs the statement with `values`. Missing or unknown values reject
   * with `PREPARED_PARAM_MISSING` / `PREPARED_PARAM_UNKNOWN`.
   */
  execute(...args: ValuesArgs<Params, [options: PreparedExecuteOptions<Meta>]>): Promise<Result>;
  /** Returns the query plan for the statement filled with `values`. */
  explain(...args: ValuesArgs<Params, [options: ExplainOptions]>): Promise<ExplainResult>;
}
/** Result of `execute()` on a single-row statement, with `.throw()`. */
type PreparedThrowingResult<T> = Promise<T | null> & {
  /** Throws a `BetterDrizzleError` with code `RESULT_NOT_FOUND` when the result is `null`. */
  throw(): Promise<NonNullish<T>>;
  /**
   * Throws the error returned by the factory function when the result is `null`.
   *
   * @param factory - A function that returns the error to throw.
   */
  throw(factory: () => unknown): Promise<NonNullish<T>>;
};
/** A prepared `findFirst` / `findOne` / `findUnique` statement. */
interface PreparedSingleStatement<T, Params extends object = Record<never, never>, Meta = BetterMeta> extends Omit<PreparedStatement<T | null, Params, Meta>, 'execute'> {
  /** Runs the statement; `.throw()` rejects when no row matches. */
  execute(...args: ValuesArgs<Params, [options: PreparedExecuteOptions<Meta>]>): PreparedThrowingResult<T>;
}
/** A read result that can also be compiled with `.prepare(name?)`. */
type PreparableResult<Statement> = {
  /**
   * Compiles this read once into a reusable statement. Plugins and the
   * client `beforeQuery` hook run here, once; result hooks and intercepts
   * run on every `execute()`.
   *
   * @param name - Statement name. PostgreSQL uses it for the server-side
   *   prepared statement; MySQL and SQLite ignore it.
   */
  prepare(name?: string): Statement;
};
/**
 * Values a prepared statement expects.
 *
 * @example
 * ```ts
 * type Values = PreparedParams<typeof findUserByEmail>; // { email: string }
 * ```
 */
type PreparedParams<Statement> = Statement extends {
  execute(...args: infer Args): unknown;
} ? NonNullable<Args[0]> : never;
/**
 * Resolved result of a prepared statement.
 *
 * @example
 * ```ts
 * type User = PreparedResult<typeof findUserByEmail>;
 * ```
 */
type PreparedResult<Statement> = Statement extends {
  execute(...args: never[]): PromiseLike<infer Result>;
} ? Result : never;
//#endregion
//#region src/types/utils.d.ts
/**
 * Represents any Better Drizzle schema: the relational config produced by
 * Drizzle's `defineRelations(...)` and exposed as `db._.relations`.
 */
type AnySchema = Record<string, unknown>;
/**
 * The relational table configuration map of a schema.
 *
 * @typeParam Schema - The relational config (`typeof relations`).
 */
type TablesConfig<Schema extends AnySchema> = Extract<Schema, Record<string, TableRelationalConfig>>;
/**
 * Union of all valid TypeScript table keys in a schema. Views are excluded.
 *
 * @typeParam Schema - The relational config.
 */
type TableKey<Schema extends AnySchema> = Extract<{ [K in keyof Schema]: Schema[K] extends {
  table: Table;
} ? K : never; }[keyof Schema], string>;
/**
 * Singularises a pluralised key name. Converts trailing `"ies"` to `"y"`
 * and trailing `"s"` to an empty string.
 *
 * @typeParam Key - The plural key to singularise.
 */
type Singularize<Key extends string> = Key extends `${infer Stem}ies` ? `${Stem}y` : Key extends `${infer Stem}s` ? Stem : Key;
/**
 * Singularised alias of each table key in the schema. For example,
 * `"users"` becomes `"user"`.
 *
 * @typeParam Schema - The relational config.
 */
type AliasKey<Schema extends AnySchema> = Singularize<Extract<TableKey<Schema>, string>>;
/**
 * Union of all database table names in the schema.
 *
 * @typeParam Schema - The relational config.
 */
type DbNameKey<Schema extends AnySchema> = Extract<{ [K in TableKey<Schema>]: TableFor<Schema, K>['_']['name']; }[TableKey<Schema>], string>;
/**
 * Given a database table name, extracts the corresponding TypeScript
 * table key from the schema.
 *
 * @typeParam Schema  - The relational config.
 * @typeParam DbName - The database table name to resolve.
 */
type SourceKeyFromDbName<Schema extends AnySchema, DbName extends string> = Extract<TableKey<Schema>, { [K in TableKey<Schema>]: TableFor<Schema, K>['_']['name'] extends DbName ? K : never; }[TableKey<Schema>]>;
/**
 * Extracts the relational configuration for a specific table from the schema.
 *
 * @typeParam Schema - The relational config.
 * @typeParam Name   - The table key within the schema.
 */
type TableConfigFor<Schema extends AnySchema, Name extends TableKey<Schema>> = Extract<Schema[Name], TableRelationalConfig>;
/**
 * Extracts string keys from `T`, but returns `never` when `T` is `never`.
 * Prevents `keyof never` from widening to `string | number | symbol`.
 *
 * @typeParam T - The type to extract keys from.
 */
type SafeKeys<T> = [T] extends [never] ? never : Extract<keyof T, string>;
/**
 * Extracts the Drizzle `Table` instance for a specific table from the schema.
 *
 * @typeParam Schema - The relational config.
 * @typeParam Name   - The table key within the schema.
 */
type TableFor<Schema extends AnySchema, Name extends TableKey<Schema>> = Extract<TableConfigFor<Schema, Name>['table'], Table>;
/**
 * Infers the select (read) model for a specific table. This is the shape
 * of a row returned from queries.
 *
 * @typeParam Schema - The relational config.
 * @typeParam Name   - The table key within the schema.
 */
type SelectModelFor<Schema extends AnySchema, Name extends TableKey<Schema>> = [Name] extends [never] ? Record<string, unknown> : InferSelectModel<TableFor<Schema, Name>>;
/**
 * Infers the insert model for a specific table. This is the shape
 * accepted by create operations. Optional columns become optional here.
 *
 * @typeParam Schema - The relational config.
 * @typeParam Name   - The table key within the schema.
 */
type InsertModelFor<Schema extends AnySchema, Name extends TableKey<Schema>> = [Name] extends [never] ? Record<string, unknown> : InferInsertModel<TableFor<Schema, Name>>;
/**
 * Insert model accepted by create operations once plugins fill some columns.
 * `Generated` columns become optional; with no generated columns this is
 * {@link InsertModelFor}.
 *
 * @typeParam Schema    - The relational config.
 * @typeParam Name      - The table key within the schema.
 * @typeParam Generated - Column keys filled by plugins.
 */
type InsertInputFor<Schema extends AnySchema, Name extends TableKey<Schema>, Generated extends string = never> = [Generated] extends [never] ? InsertModelFor<Schema, Name> : Omit<InsertModelFor<Schema, Name>, Generated> & Partial<Pick<InsertModelFor<Schema, Name>, Generated & keyof InsertModelFor<Schema, Name>>>;
/**
 * Union of all relation names defined on a specific table.
 *
 * @typeParam Schema - The relational config.
 * @typeParam Name   - The table key within the schema.
 */
type RelationKeysFor<Schema extends AnySchema, Name extends TableKey<Schema>> = SafeKeys<TableConfigFor<Schema, Name>['relations']>;
/**
 * Union of all scalar (non-relation) column keys for a specific table.
 * This is the set of keys available for filtering and ordering.
 *
 * @typeParam Schema - The relational config.
 * @typeParam Name   - The table key within the schema.
 */
type ScalarKeysFor<Schema extends AnySchema, Name extends TableKey<Schema>> = Exclude<keyof SelectModelFor<Schema, Name>, RelationKeysFor<Schema, Name>>;
/**
 * Extracts the Drizzle relation definition for a specific relation on a table.
 *
 * @typeParam Schema       - The relational config.
 * @typeParam Name         - The table key within the schema.
 * @typeParam RelationName - The relation name on the table.
 */
type RelationFor<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = TableConfigFor<Schema, Name>['relations'][RelationName];
/**
 * Resolves the TypeScript table key of the table referenced by a specific
 * relation on a table.
 *
 * @typeParam Schema       - The relational config.
 * @typeParam Name         - The table key within the schema.
 * @typeParam RelationName - The relation name on the table.
 */
type RelatedNameFor<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = Extract<RelationFor<Schema, Name, RelationName>['targetTableName'], TableKey<Schema>>;
/**
 * Extracts the relational configuration of the table referenced by a
 * specific relation on a table.
 *
 * @typeParam Schema       - The relational config.
 * @typeParam Name         - The table key within the schema.
 * @typeParam RelationName - The relation name on the table.
 */
type RelatedConfigFor<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = TableConfigFor<Schema, RelatedNameFor<Schema, Name, RelationName>>;
/**
 * `true` when a relation resolves to many rows.
 *
 * @typeParam Schema       - The relational config.
 * @typeParam Name         - The table key within the schema.
 * @typeParam RelationName - The relation name on the table.
 */
type IsManyRelation<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = RelationFor<Schema, Name, RelationName> extends Many<string> ? true : false;
/**
 * Removes `null` and `undefined` from `T`.
 *
 * @typeParam T - The type to refine.
 */
type NonNullish<T> = Exclude<T, null | undefined>;
/**
 * Sort direction for ordering results.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   orderBy: { name: 'asc' },
 * });
 * ```
 */
type SortOrder = 'asc' | 'desc';
/** Controls where SQL NULL values appear within a sort direction. */
type NullsOrder = 'first' | 'last';
/** Direction and optional SQL NULL placement for one ordered column. */
type SortConfig = {
  direction: SortOrder;
  nulls?: NullsOrder;
};
/**
 * Query mode controlling case sensitivity for string comparisons.
 * - `'default'` - case-sensitive
 * - `'insensitive'` - case-insensitive
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   where: {
 *     name: { contains: 'alice', mode: 'insensitive' },
 *   },
 * });
 * ```
 */
type QueryMode = 'default' | 'insensitive';
/** A literal value or a prepared statement `param()` standing in for it. */
type Bindable<T> = T | PreparedParam<string, T>;
/**
 * Filter operators for string columns. Supports equality, membership,
 * pattern matching, and case-insensitive mode.
 *
 * @typeParam T - The string column type.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   where: {
 *     name: { contains: 'alice', mode: 'insensitive' },
 *     email: { endsWith: '@example.com' },
 *     role: { in: ['admin', 'moderator'] },
 *   },
 * });
 * ```
 */
type StringFilter<T> = {
  /** Exact match. */
  equals?: Bindable<T>;
  /** Match any value in the array. */
  in?: Bindable<T[]>;
  /** Match none of the values in the array. */
  notIn?: Bindable<T[]>;
  /** Substring match. */
  contains?: Bindable<string>;
  /** Prefix match. */
  startsWith?: Bindable<string>;
  /** Suffix match. */
  endsWith?: Bindable<string>;
  /** Case sensitivity mode. */
  mode?: QueryMode;
  /** Negation filter. */
  not?: Bindable<T> | Omit<StringFilter<T>, 'not'>;
};
/**
 * Filter operators for comparable scalar columns (numbers, bigints, dates).
 * Supports equality, membership, and range comparisons.
 *
 * @typeParam T - The comparable column type.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   where: {
 *     age: { gte: 18, lt: 65 },
 *     score: { gt: 90 },
 *     createdAt: { gte: new Date('2024-01-01') },
 *   },
 * });
 * ```
 */
type ComparableFilter<T> = {
  /** Exact match. */
  equals?: Bindable<T>;
  /** Match any value in the array. */
  in?: Bindable<T[]>;
  /** Match none of the values in the array. */
  notIn?: Bindable<T[]>;
  /** Less than. */
  lt?: Bindable<T>;
  /** Less than or equal. */
  lte?: Bindable<T>;
  /** Greater than. */
  gt?: Bindable<T>;
  /** Greater than or equal. */
  gte?: Bindable<T>;
  /** Negation filter. */
  not?: Bindable<T> | Omit<ComparableFilter<T>, 'not'>;
};
/**
 * Filter operators for boolean columns.
 *
 * @typeParam T - The boolean column type.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   where: { active: true },
 * });
 * ```
 */
type BooleanFilter<T> = {
  /** Exact match. */
  equals?: Bindable<T>;
  /** Negation filter. */
  not?: Bindable<T> | Omit<BooleanFilter<T>, 'not'>;
};
/**
 * Resolves the appropriate filter type for a scalar column based on its
 * underlying type: {@link StringFilter} for strings, {@link ComparableFilter}
 * for numbers/bigints/dates, {@link BooleanFilter} for booleans, and a
 * simple equality filter for everything else.
 *
 * @typeParam T - The scalar column type.
 *
 * @example
 * ```ts
 * // Automatically resolves to the correct filter type
 * const users = await db.user.findMany({
 *   where: {
 *     name: 'Alice',              // StringFilter
 *     age: { gte: 18 },           // ComparableFilter
 *     active: true,               // BooleanFilter
 *   },
 * });
 * ```
 */
type ScalarFilter<T> = NonNullish<T> extends string ? StringFilter<T> : NonNullish<T> extends number | bigint | Date ? ComparableFilter<T> : NonNullish<T> extends boolean ? BooleanFilter<T> : {
  equals?: Bindable<T>;
  not?: Bindable<T> | {
    equals?: Bindable<T>;
  };
};
/**
 * Accepted value for a scalar where-clause field. Can be a raw value
 * (direct equality), a {@link ScalarFilter} object, or `null` when the
 * column is nullable.
 *
 * @typeParam T - The scalar column type.
 *
 * @example
 * ```ts
 * const users = await db.user.findMany({
 *   where: {
 *     name: 'Alice',                  // raw value (equality)
 *     age: { gte: 18, lt: 65 },       // filter object
 *     deletedAt: null,                 // null check
 *   },
 * });
 * ```
 */
type ScalarWhereField<T> = Bindable<T> | ScalarFilter<T> | (null extends T ? null : never);
type ArrayElement<T> = NonNullish<T> extends readonly (infer Value)[] ? ArrayElement<Value> : NonNullish<T>;
type ArrayValue<T> = Exclude<ArrayElement<T>, null>;
/** Filter operators for native PostgreSQL array columns. */
type ArrayFilter<T> = {
  equals?: Bindable<T>;
  has?: Bindable<ArrayValue<T>>;
  hasEvery?: Bindable<readonly ArrayValue<T>[]>;
  hasNone?: Bindable<readonly ArrayValue<T>[]>;
  hasSome?: Bindable<readonly ArrayValue<T>[]>;
  containedBy?: Bindable<readonly ArrayValue<T>[]>;
  isEmpty?: boolean;
  length?: Bindable<number> | ComparableFilter<number>;
  not?: Bindable<T> | Omit<ArrayFilter<T>, 'not'>;
  none?: ScalarFilter<ArrayValue<T>>;
  some?: ScalarFilter<ArrayValue<T>>;
  every?: ScalarFilter<ArrayValue<T>>;
};
/** Accepted where value for a native PostgreSQL array column. */
type ArrayWhereField<T> = Bindable<NonNullish<T>> | (ArrayFilter<T> & {
  charAt?: never;
}) | (null extends T ? null : never);
/**
 * `true` for PostgreSQL columns declared with `.array()`. Drizzle 1.x keeps
 * the element's `dataType`, so JSON columns (`object json`) and vector-like
 * types (`array ...`) are excluded even when their data is an array.
 */
type IsPgArrayColumn<Column> = Column extends PgColumn ? Column['_']['dataType'] extends 'object json' | 'array' | `array ${string}` ? false : NonNullable<Column['_']['data']> extends readonly unknown[] ? true : false : false;
/** `true` for PostgreSQL JSON/JSONB columns. */
type IsPgJsonColumn<Column> = Column extends PgColumn ? Column['_']['dataType'] extends 'object json' ? true : false : false;
/** Keys backed by Drizzle's native PostgreSQL array column. */
type PgArrayKeysFor<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in ScalarKeysFor<Schema, Name>]: K extends keyof TableFor<Schema, Name> ? IsPgArrayColumn<TableFor<Schema, Name>[K]> extends true ? K : never : never; }[ScalarKeysFor<Schema, Name>];
type IsUnknown<T> = unknown extends T ? [keyof T] extends [never] ? true : false : false;
type JsonPathPrefix<Prefix extends string, Key extends string> = Prefix extends '' ? Key : `${Prefix}.${Key}`;
type JsonScalarPath<T, Prefix extends string = ''> = IsUnknown<T> extends true ? never : NonNullish<T> extends readonly unknown[] ? never : NonNullish<T> extends object ? { [K in Extract<keyof NonNullish<T>, string>]: NonNullish<NonNullish<T>[K]> extends readonly unknown[] ? never : NonNullish<NonNullish<T>[K]> extends object ? JsonScalarPath<NonNullish<T>[K], JsonPathPrefix<Prefix, K>> : JsonPathPrefix<Prefix, K>; }[Extract<keyof NonNullish<T>, string>] : never;
type JsonPathValue<T, Path extends string> = Path extends `${infer Key}.${infer Rest}` ? Key extends keyof NonNullish<T> ? JsonPathValue<NonNullish<T>[Key], Rest> : never : Path extends keyof NonNullish<T> ? Exclude<NonNullish<T>[Path], undefined> : never;
type JsonWhereInput<T> = IsUnknown<T> extends true ? never : { [Path in JsonScalarPath<T>]?: ScalarWhereField<JsonPathValue<T, Path>>; };
type JsonDottedPathValue = PreparedParam | string | number | bigint | boolean | null | StringFilter<string> | ComparableFilter<number | bigint> | BooleanFilter<boolean>;
/**
 * Dotted JSONB path filters. Paths and value types follow `$type<T>()`;
 * untyped columns accept any dotted path with JSON scalar filters.
 */
type JsonDottedWhereInput<T = unknown> = IsUnknown<T> extends true ? {
  [path: `${string}.${string}`]: JsonDottedPathValue;
  json?: never;
} : [Extract<JsonScalarPath<T>, `${string}.${string}`>] extends [never] ? never : { [Path in Extract<JsonScalarPath<T>, `${string}.${string}`> | 'json']?: Path extends 'json' ? never : ScalarWhereField<JsonPathValue<T, Path>>; };
/**
 * A JSON-compatible mutation value for a single JSONB path.
 * Excludes `undefined`, functions, symbols, and bigint to match the
 * runtime, which throws on values `JSON.stringify` cannot encode.
 */
type JsonMutationValue = string | number | boolean | null | readonly JsonMutationValue[] | {
  readonly [key: string]: JsonMutationValue;
};
type JsonMutationPath<T, Prefix extends string = ''> = IsUnknown<T> extends true ? never : NonNullish<T> extends readonly unknown[] ? never : NonNullish<T> extends object ? { [K in Extract<keyof NonNullish<T>, string>]: JsonPathPrefix<Prefix, K> | JsonMutationPath<NonNullish<T>[K], JsonPathPrefix<Prefix, K>>; }[Extract<keyof NonNullish<T>, string>] : never;
/**
 * Typed JSONB path assignments for the `{ json: ... }` mutation wrapper.
 * Maps every addressable path (including intermediate objects and
 * single-level keys) to its declared value type. Dotted shorthand uses the
 * same types but only permits multi-segment paths. Untyped (`$type`-less)
 * columns fall back to an open record so the wrapper stays usable without
 * declared paths.
 */
type JsonMutationInput<T> = IsUnknown<T> extends true ? Record<string, JsonMutationValue> : { [Path in JsonMutationPath<T>]?: JsonPathValue<T, Path>; };
/** Typed multi-segment JSONB path assignments for mutation. */
type JsonDottedMutationInput<T = unknown> = IsUnknown<T> extends true ? {
  [path: `${string}.${string}`]: JsonMutationValue;
  json?: never;
} : { [Path in Extract<JsonMutationPath<T>, `${string}.${string}`>]?: JsonPathValue<T, Path>; } & {
  json?: never;
};
//#endregion
//#region src/types/database.d.ts
/**
 * Result returned by update operations that report the number of affected rows.
 *
 * @example
 * ```ts
 * const result = await db.user.updateMany({
 *   where: { role: 'guest' },
 *   data: { active: false },
 * });
 * console.log(result.count); // number of updated rows
 * ```
 */
interface UpdateResult {
  /** Number of rows that were modified. */
  count: number;
}
/**
 * Result returned by delete operations that report the number of affected rows.
 *
 * @example
 * ```ts
 * const result = await db.user.deleteMany({
 *   where: { role: 'guest' },
 * });
 * console.log(result.count); // number of deleted rows
 * ```
 */
interface DeleteResult {
  /** Number of rows that were deleted. */
  count: number;
}
/**
 * Result returned by the `paginate()` operation. Contains the page of data
 * and offset-based pagination metadata.
 *
 * @typeParam Columns - The row type returned by the query.
 *
 * @example
 * ```ts
 * const {
 *   data,
 *   pagination: { page, total, hasNext },
 * } = await db.user.paginate({ page: 1, perPage: 10 });
 * ```
 */
interface OffsetPaginationResult<Columns extends Record<string, unknown>> {
  /** The page of rows matching the query. */
  data: Columns[];
  /** Offset-based pagination metadata. */
  pagination: {
    /** Always `'offset'` to distinguish from cursor pagination. */
    type: 'offset';
    /** Current page number (1-indexed). */
    page: number;
    /** Maximum rows per page. */
    perPage: number;
    /** Total number of matching rows across all pages. */
    total: number;
    /** Total number of pages. */
    pageCount: number;
    /** `true` when a next page exists. */
    hasNext: boolean;
    /** `true` when a previous page exists. */
    hasPrevious: boolean;
  };
}
/**
 * Result returned by the `cursor()` operation. Contains the page of data
 * and cursor-based navigation metadata.
 *
 * @typeParam Columns - The row type returned by the query.
 * @typeParam Cursor - The raw cursor object, keyed by the `orderBy` fields.
 *
 * @example
 * ```ts
 * const {
 *   data,
 *   pagination: { nextCursor },
 * } = await db.user.cursor({ limit: 10, orderBy: { id: 'asc' } });
 * const { data: next } = await db.user.cursor({
 *   limit: 10,
 *   orderBy: { id: 'asc' },
 *   after: nextCursor,
 * });
 * ```
 */
interface CursorPaginationResult<Columns extends Record<string, unknown>, Cursor extends object = Record<string, unknown>> {
  /** The page of rows matching the query. */
  data: Columns[];
  /** Cursor-based pagination metadata. */
  pagination: {
    /** Always `'cursor'` to distinguish from offset pagination. */
    type: 'cursor';
    /** `true` when more rows exist after the current page. */
    hasNext: boolean;
    /** `true` when more rows exist before the current page. */
    hasPrevious: boolean;
    /** Cursor object (last row's `orderBy` fields) to pass as `after`, or `null` when `hasNext` is `false`. */
    nextCursor: Cursor | null;
    /** Cursor object (first row's `orderBy` fields) to pass as `before`, or `null` when `hasPrevious` is `false`. */
    previousCursor: Cursor | null;
  };
}
/**
 * Options for offset-based pagination. Used by the `paginate()` operation.
 *
 * @typeParam Columns - The row type of the result set.
 */
interface OffsetPaginationOptions<Columns extends Record<string, unknown>> {
  /** Maximum number of rows to return per page. */
  limit?: Bindable<number>;
  /** Rows per page; an alias of `limit`. */
  perPage?: Bindable<number>;
  /** 1-based page number; computes `skip`, so it cannot be combined with it. */
  page?: Bindable<number>;
  /** Sort order for the result set. */
  orderBy?: OrderBy<Columns>;
}
/**
 * Options for cursor-based pagination. Used by the `cursor()` operation,
 * whose `CursorArgs` add the `after` / `before` cursor objects.
 *
 * @typeParam Columns - The row type of the result set.
 */
interface CursorPaginationOptions<Columns extends Record<string, unknown>> {
  /** Maximum number of rows to return per page. */
  limit?: Bindable<number>;
  /** Sort order for the result set. */
  orderBy?: OrderBy<Columns>;
}
/**
 * Sort specification for a result set. Each key is a column name and the value
 * indicates the sort direction.
 *
 * @typeParam Columns - The shape of each row in the result set.
 */
type OrderBy<Columns extends Record<string, unknown>> = Partial<Record<keyof Columns, SortOrder | SortConfig>> | Partial<Record<keyof Columns, SortOrder | SortConfig>>[];
//#endregion
//#region src/types/raw.d.ts
/**
 * Options supported by raw SQL client methods.
 *
 * @typeParam Row - Input row shape returned by the driver before mapping.
 * @typeParam Mapped - Output row shape returned after `map()` runs.
 * @typeParam Meta - Custom metadata type forwarded to raw hooks.
 *
 * @example
 * ```ts
 * const users = await db.$raw(
 *   sql`SELECT * FROM users WHERE active = ${true}`,
 *   {
 *     name: 'active-users',
 *     comment: 'Fetch active users',
 *     meta: { requestId: 'abc-123' },
 *     timeoutMs: 5000,
 *     map: (row) => ({ ...row, name: row.name.toUpperCase() }),
 *   },
 * );
 * ```
 */
type RawOptions<Row = unknown, Mapped = Row, Meta = BetterMeta> = {
  /**
   * Optional human-readable name for logs or debugging.
   */
  name?: string;
  /**
   * Optional SQL comment metadata. Only supported on PostgreSQL.
   */
  comment?: string;
  /**
   * Maximum duration in ms before the raw query is aborted.
   */
  timeoutMs?: number;
  /**
   * AbortSignal used to cancel the raw query.
   */
  signal?: AbortSignal;
  /**
   * Optional metadata merged over any client-scoped context.
   */
  meta?: Meta;
  /**
   * Optional row mapper applied to each returned row.
   *
   * @param row - The raw row from the driver.
   * @returns The mapped row.
   */
  map?: (row: Row) => Mapped;
} & RawOptionsExtensions;
/**
 * Extra raw options contributed by plugins through module augmentation.
 * Raw hooks receive them unchanged in `rawOptions`.
 *
 * @example
 * ```ts
 * declare module 'better-drizzle' {
 *   interface RawOptionsExtensions {
 *     audit?: boolean;
 *   }
 * }
 * ```
 */
interface RawOptionsExtensions {}
/**
 * Global raw SQL configuration. Passed to {@link better} via `options.raw`.
 *
 * @example
 * ```ts
 * const db = better(drizzle, {
 *   raw: {
 *     enabled: true,
 *     allowUnsafe: true,
 *     requireComment: false,
 *     timeoutMs: 10000,
 *   },
 * });
 * ```
 */
type RawClientOptions = {
  /** Enables raw SQL methods on the client. Defaults to `true`. */
  enabled?: boolean;
  /** Allows calling `$rawUnsafe()`. Defaults to `false`. */
  allowUnsafe?: boolean;
  /** Requires every raw call to provide `options.comment`. Defaults to `false`. */
  requireComment?: boolean;
  /** Default timeout in ms applied when a raw call omits `timeoutMs`. */
  timeoutMs?: number;
  /** Enables raw-query logging metadata. */
  log?: boolean;
  /** How unsupported raw options should behave. Defaults to `'warn'`. */
  unsupportedOptions?: 'warn' | 'throw' | 'ignore';
};
/**
 * Normalized result returned by `$executeRaw()`.
 *
 * @example
 * ```ts
 * const result = await db.$executeRaw`UPDATE users SET active = false`;
 * console.log(result.rowsAffected); // number of updated rows
 * ```
 */
type RawExecutionResult = {
  /** The number of rows affected by the statement, when available. */
  rowsAffected?: number;
};
/**
 * Safe raw SQL input accepted by `$raw()` and `$executeRaw()`.
 *
 * Can be a Drizzle `SQL` instance or any object implementing `getSQL()`.
 *
 * @example
 * ```ts
 * import { sql } from 'drizzle-orm';
 * const query = sql`SELECT * FROM users WHERE id = ${1}`;
 * const rows = await db.$raw(query);
 * ```
 */
type RawSql = SQL | SQLWrapper;
//#endregion
//#region src/types/transaction.d.ts
/**
 * SQL isolation levels supported by transaction options.
 *
 * - `'readUncommitted'` – lowest isolation; allows dirty reads.
 * - `'readCommitted'` – default for most databases.
 * - `'repeatableRead'` – prevents non-repeatable reads.
 * - `'serializable'` – highest isolation; fully serializable.
 *
 * @example
 * ```ts
 * await db.transaction(async (tx) => {
 *   // ...
 * }, { isolationLevel: 'serializable' });
 * ```
 */
type TransactionIsolationLevel = 'readUncommitted' | 'readCommitted' | 'repeatableRead' | 'serializable';
/**
 * Categorises the reason a transaction attempt failed. Used by the retry
 * logic to decide whether a failed attempt should be retried.
 *
 * - `'connectionError'` – the database connection was lost or refused.
 * - `'deadlock'` – the database detected a deadlock.
 * - `'serializationFailure'` – a serializable transaction conflicted.
 *
 * @example
 * ```ts
 * await db.transaction(async (tx) => {
 *   // ...
 * }, {
 *   retries: {
 *     attempts: 3,
 *     on: ['deadlock', 'serializationFailure'],
 *   },
 * });
 * ```
 */
type TransactionRetryReason = 'connectionError' | 'deadlock' | 'serializationFailure';
/**
 * Configuration for automatic transaction retries.
 *
 * @example
 * ```ts
 * await db.transaction(async (tx) => {
 *   // ...
 * }, {
 *   retries: {
 *     attempts: 3,
 *     on: ['deadlock', 'connectionError'],
 *     delayMs: (attempt) => attempt * 100,
 *   },
 * });
 * ```
 */
type TransactionRetryOptions = {
  /** Maximum number of attempts (must be >= 2 to enable retries). */
  attempts: number;
  /** Retry reasons that trigger a retry. Defaults to all three reasons. */
  on?: TransactionRetryReason[];
  /** Delay between attempts in ms, or a function that receives the attempt
   *  number (1-indexed) and returns the delay. Defaults to `0`. */
  delayMs?: number | ((attempt: number) => number);
};
/**
 * Options passed to {@link BetterDrizzleClient.transaction}. Controls
 * isolation, read-only mode, retries, timeouts, and lifecycle context.
 *
 * @example
 * ```ts
 * // Basic transaction
 * await db.transaction(async (tx) => {
 *   const user = await tx.user.findFirst({ where: { id: 1 } });
 *   await tx.user.update({ where: { id: 1 }, data: { active: false } });
 * });
 *
 * // With options
 * await db.transaction(async (tx) => {
 *   // ...
 * }, {
 *   isolationLevel: 'serializable',
 *   readOnly: false,
 *   timeoutMs: 10000,
 *   retries: { attempts: 3 },
 *   context: { requestId: 'abc-123' },
 * });
 *
 * // With AbortSignal
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 5000);
 * await db.transaction(async (tx) => {
 *   // ...
 * }, { signal: controller.signal });
 * ```
 */
type TransactionOptions = {
  /** SQL isolation level for the transaction. Ignored on SQLite. */
  isolationLevel?: TransactionIsolationLevel;
  /** When `true`, opens the transaction in read-only mode. Ignored on SQLite. */
  readOnly?: boolean;
  /** Automatic retry configuration. */
  retries?: TransactionRetryOptions;
  /** Maximum duration in ms before the transaction is aborted. */
  timeoutMs?: number;
  /** An `AbortSignal` whose abort event rolls back the transaction. */
  signal?: AbortSignal;
  /** Optional metadata merged over any client-scoped context. */
  meta?: BetterMeta;
  /** Custom context object merged into the transaction-scoped context. */
  context?: Record<string, unknown>;
  /** Optional name for named transactions (PostgreSQL SAVEPOINT). */
  name?: string;
  /** Comment attached to the transaction (PostgreSQL only). */
  comment?: string;
};
/**
 * How the client behaves when a transaction option is not supported by the
 * current SQL dialect (e.g. `isolationLevel` on SQLite).
 *
 * - `'ignore'` – silently skip the option.
 * - `'throw'` – throw an error.
 * - `'warn'` – log a `console.warn`. This is the default.
 *
 * @example
 * ```ts
 * const db = better(drizzle, {
 *   transaction: { unsupportedOptions: 'throw' },
 * });
 * ```
 */
type TransactionUnsupportedOptionsBehavior = 'ignore' | 'throw' | 'warn';
/**
 * Error thrown when a transaction is explicitly rolled back via the
 * `rollback()` method on a transaction client.
 *
 * The optional `reason` property carries the value passed to `rollback()`.
 *
 * @example
 * ```ts
 * await db.transaction(async (tx) => {
 *   // ...
 *   tx.rollback('Something went wrong');
 *   // This line is never reached
 * });
 * // Catching the rollback error
 * try {
 *   await db.transaction(async (tx) => {
 *     tx.rollback(new Error('Aborted'));
 *   });
 * } catch (error) {
 *   if (error instanceof BetterDrizzleTransactionRollbackError) {
 *     console.log('Rollback reason:', error.reason);
 *   }
 * }
 * ```
 */
declare class BetterDrizzleTransactionRollbackError extends BetterDrizzleError {
  /** The optional reason supplied to `rollback()`. */
  reason?: unknown;
  /**
   * Creates a new `BetterDrizzleTransactionRollbackError`.
   *
   * @param reason - The optional reason passed to `rollback()`.
   */
  constructor(reason?: unknown);
}
/**
 * A full Better Drizzle client available inside a transaction callback.
 * Extends {@link BetterDrizzleClient} with transaction-specific methods:
 * `transaction()` for nested savepoints, `rollback()` to abort,
 * `afterCommit()` and `afterRollback()` for lifecycle callbacks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to `BetterMeta`.
 * @typeParam Plugins - The plugin tuple.
 *
 * @example
 * ```ts
 * await db.transaction(async (tx) => {
 *   // Full CRUD access
 *   const user = await tx.user.findFirst({ where: { id: 1 } });
 *   await tx.user.update({ where: { id: 1 }, data: { active: false } });
 *
 *   // Nested transaction (savepoint)
 *   await tx.transaction(async (nestedTx) => {
 *     await nestedTx.post.create({ data: { title: 'Hello', authorId: 1 } });
 *   });
 *
 *   // Lifecycle callbacks
 *   tx.afterCommit(() => console.log('Committed!'));
 *   tx.afterRollback(() => console.log('Rolled back!'));
 *
 *   // Explicit rollback
 *   tx.rollback('Something went wrong');
 * });
 * ```
 */
type BetterDrizzleTransactionClient<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = []> = Omit<BetterDrizzleClient<Schema, Meta, Plugins>, '$withContext' | 'afterCommit' | 'afterRollback' | 'extends' | 'transaction'> & {
  /**
   * Extends the current transaction client with custom properties and helper
   * methods. The extension is reapplied to nested transactions and scoped
   * clones derived from this transaction client.
   */
  extends: BetterDrizzleExtendsMethod<BetterDrizzleTransactionClient<Schema, Meta, Plugins>>;
  /**
   * Returns a cloned transaction client with default metadata merged into
   * every subsequent operation, raw query, and nested transaction.
   */
  $withContext(meta: Partial<Meta>): BetterDrizzleTransactionClient<Schema, Meta, Plugins>;
  /**
   * Starts a nested transaction (savepoint) inside the current one.
   *
   * On SQLite, savepoints are managed explicitly with `SAVEPOINT` SQL.
   * On other dialects, this delegates to the Drizzle transaction runner.
   *
   * @typeParam T - The return type of the callback.
   * @param callback - A function receiving the nested transaction client.
   * @param options - Optional nested transaction options.
   * @returns A promise resolving to the callback's return value.
   */
  transaction<T>(callback: (tx: BetterDrizzleTransactionClient<Schema, Meta, Plugins>) => Promise<T> | T, options?: TransactionOptions & {
    meta?: Meta;
  }): Promise<T>;
  /**
   * Rolls back the current transaction, optionally with a reason.
   *
   * Throws a {@link BetterDrizzleTransactionRollbackError} that propagates
   * out of the transaction callback. Code after `rollback()` is unreachable.
   *
   * @param reason - An optional value describing why the transaction was rolled back.
   */
  rollback(reason?: unknown): never;
  /**
   * Registers a callback to run after the transaction commits.
   *
   * Inside nested transactions, the callback is deferred to the root commit.
   *
   * @param callback - A function to run after commit. May be async.
   *
   * @example
   * ```ts
   * await db.transaction(async (tx) => {
   *   await tx.user.create({ data: { name: 'Alice' } });
   *   tx.afterCommit(() => sendWelcomeEmail('alice@example.com'));
   * });
   * ```
   */
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  /**
   * Registers a callback to run after the transaction rolls back.
   *
   * @param callback - A function to run after rollback. May be async.
   *
   * @example
   * ```ts
   * await db.transaction(async (tx) => {
   *   tx.afterRollback(() => console.log('Transaction failed, cleaning up...'));
   *   // ...
   * });
   * ```
   */
  afterRollback(callback: () => unknown | Promise<unknown>): void;
};
//#endregion
//#region src/types/plugins.d.ts
type MaybePromise<T> = T | Promise<T>;
/**
 * Supported SQL dialects that plugins can target.
 * - `'pg'` - PostgreSQL
 * - `'mysql'` - MySQL / MariaDB
 * - `'sqlite'` - SQLite
 */
type PluginDialect = 'pg' | 'mysql' | 'sqlite';
/**
 * Arbitrary key-value state carried by a plugin instance and forwarded to
 * every hook and transform invocation. Plugins use this to share data
 * across operations within a single request lifecycle.
 */
type PluginState = Record<string, unknown>;
/**
 * Shape of the object returned by a plugin's `extendClient` or
 * `extendModel` methods. Each key becomes a property on the delegate
 * or client instance.
 */
type PluginExtension = Record<string, unknown>;
/**
 * Describes a column that a plugin requires on a model. Used in
 * {@link PluginConfig.requires.columns} to fail fast during bootstrap
 * when a model is missing a required column.
 */
type PluginColumnRequirement = {
  /** The column name that must exist. */
  column: string;
  /** When `true`, models without this column are allowed; `type` is still checked when the column exists. */
  optional?: boolean;
  /**
   * Expected Drizzle column type, matched against the column's `columnType`
   * (e.g. `'PgTimestamp'`), its full `dataType` (e.g. `'object date'`), or
   * one part of it (e.g. `'date'`, `'string'`).
   */
  type?: string;
};
/**
 * Static configuration for a plugin. Controls which dialects the plugin
 * supports and which model requirements must be satisfied.
 */
type PluginConfig = {
  /** Restrict the plugin to specific SQL dialects. When omitted the plugin runs on all dialects. */
  dialects?: PluginDialect[];
  /** Model-level requirements that must be met before the plugin can initialise. */
  requires?: {
    /** Columns that must be present on every model the plugin operates on. */
    columns?: PluginColumnRequirement[];
  };
};
/**
 * Columns a plugin fills on create. Better Drizzle resolves them per model
 * before any plugin `setup()` runs, exposes the result as
 * {@link PluginModelInfo.generated}, and makes them optional in the create
 * input types of `create`, `createMany`, `upsert`, and `upsertMany`.
 *
 * @typeParam Column - Default column key.
 * @typeParam Models - Per-model overrides keyed by table key.
 * @typeParam Value  - Value the plugin writes; columns whose insert type does
 *   not accept it stay required.
 */
type PluginGeneratedColumns<Column extends string | readonly string[] = string | readonly string[], Models extends Readonly<Record<string, string | readonly (string | undefined)[] | false>> = Readonly<Record<string, string | readonly (string | undefined)[] | false>>, Value = unknown> = {
  /**
   * Filters columns the plugin can fill. Models whose default column is
   * rejected are skipped; a rejected override throws.
   */
  accepts?(column: AnyColumn): boolean;
  /** Column keys filled on every model that has them. */
  column: Column;
  /** Overrides keyed by table key: column keys, or `false` to skip the model. In an array, `undefined` keeps the default at that position. Explicit columns must exist. */
  models?: Models;
  /** Type-only: carries `Value`; never read at runtime. */
  readonly value?: Value;
};
/**
 * Descriptive metadata for a plugin. Returned by {@link definePlugin} and
 * forwarded to setup contexts and extension callbacks.
 *
 * @typeParam Options - The options shape accepted by the plugin.
 */
type PluginMeta<Options = unknown> = {
  /** Human-readable description of what the plugin does. */
  description?: string;
  /** Unique identifier for the plugin (e.g. `"soft-delete"`). */
  id: string;
  /** Human-readable display name. */
  name?: string;
  /** Plugin-specific options stored for later reference. */
  options?: Options;
  /** Semver version string. */
  version?: string;
};
/**
 * Per-model information exposed to plugins during setup, hooks, and
 * extension callbacks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name  - The table key within the schema.
 */
type PluginModelInfo<Schema extends AnySchema = AnySchema, Name extends string = Extract<TableKey<Schema>, string>> = {
  /** Map of column name to Drizzle column instance. */
  columns: Record<string, AnyColumn>;
  /** The database table name. */
  dbName: string;
  /** Column keys filled by plugins on create (see {@link PluginGeneratedColumns}). */
  generated: readonly string[];
  /** Checks whether a column with the given name exists on this model. */
  hasColumn(column: string): boolean;
  /** The TypeScript table key. */
  name: Name;
  /** Primary key column keys. */
  primaryKey: readonly string[];
  /** Loadable relations keyed by relation name. */
  relations: Readonly<Record<string, PluginModelRelation>>;
};
/**
 * A relation Better Drizzle can load, as exposed on {@link PluginModelInfo}.
 */
type PluginModelRelation = {
  /** Which table holds the linking columns. */
  foreignKey: 'junction' | 'source' | 'target';
  /** `manyToMany` relations come from `.through()`. */
  kind: 'many' | 'manyToMany' | 'one';
  /** Target table key. */
  model: string;
  /** Junction table key for `.through()` relations. */
  through?: string;
};
/**
 * Scope of one model, resolved once at bootstrap by
 * {@link PluginScopeDefinition.model}. The core ANDs it into every statement
 * that reads or writes the model, nested relation stages included.
 */
type PluginScopeModel = {
  /** Columns matched by equality against the scope state (`{ [column]: value }`). */
  columns?: readonly string[];
  /** Rejects updates that change `columns`. */
  immutable?: boolean;
  /** `columns` also match `NULL`. */
  nullable?: boolean;
  /** Writes the state values of `columns` on insert and rejects other values. */
  stamp?: boolean;
  /** Applies the scope to upsert conflict updates. Defaults to `true`. */
  upsert?: boolean;
  /** Static filter, in the structured `where` shape, applied while the scope is active. */
  where?: Record<string, unknown>;
};
/**
 * Declares a model scope. The client carries one state value per scope
 * `key`; `$withoutPlugins()` drops every state unless `keepScopes` is set.
 *
 * @typeParam State - Value stored under `key` in the client scope state.
 */
type PluginScopeDefinition<State = unknown> = {
  /** Meta merged into operations when `$withoutPlugins()` drops a set state. */
  bypass?(state: State): Record<string, unknown> | undefined;
  /** Key of this scope in the client scope state. */
  key: string;
  /** Error for a write that sets a scoped column to another value. */
  mismatch?(model: PluginModelInfo, column: string): Error;
  /** Error for `columns` without a state value; `undefined` leaves them unfiltered. */
  missing?(model: PluginModelInfo, columns: readonly string[]): Error | undefined;
  /** Resolves the scope of one model; `undefined` leaves it unscoped. */
  model(model: PluginModelInfo): PluginScopeModel | undefined;
  /** Root-query override of `where` from the operation args; `null` drops it. */
  root?(args: Record<string, unknown>, model: PluginModelInfo): Record<string, unknown> | null | undefined;
  /** Statements run at the start of each transaction while the state is set. */
  session?(state: State, dialect: PluginDialect): SQL[] | undefined;
  /**
   * Also runs `session()` statements for raw calls: a standalone raw call
   * opens a transaction. Defaults to `false` (raw SQL runs as written).
   */
  rawSession?: boolean;
};
/**
 * Registry mapping TypeScript table keys to their {@link PluginModelInfo}
 * descriptors. Provided to plugins during setup and extension callbacks.
 *
 * @typeParam Schema - The Drizzle schema type.
 */
type ModelRegistry<Schema extends AnySchema = AnySchema> = Record<string, PluginModelInfo<Schema, string>>;
/**
 * Discriminated union of all operation kinds that plugin hooks can
 * intercept. Each kind maps to its corresponding argument and result
 * types in {@link PluginOperationInput}.
 */
type PluginHookKind = 'count' | 'create' | 'createMany' | 'delete' | 'deleteMany' | 'exists' | 'findFirst' | 'findMany' | 'findOne' | 'findUnique' | 'cursor' | 'paginate' | 'update' | 'updateEach' | 'updateMany' | 'upsert' | 'upsertMany';
/**
 * Maps each {@link PluginHookKind} to a record of extra operation-argument
 * keys that a plugin can declare. Plugins use this to type-safely extend
 * delegate method signatures with additional fields (e.g. a `traced`
 * flag on every operation).
 */
type PluginOperationArgsExtensionMap = { [K in PluginHookKind]: Record<string, unknown>; };
type OperationArgsForKind<OperationArgs, Kind extends PluginHookKind> = OperationArgs extends Partial<PluginOperationArgsExtensionMap> ? Kind extends keyof OperationArgs ? OperationArgs[Kind] extends Record<string, unknown> ? OperationArgs[Kind] : Record<never, never> : Record<never, never> : Record<never, never>;
type PluginOperationArgsMap<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, OperationArgs extends Partial<PluginOperationArgsExtensionMap>> = {
  count: CountArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'count'>;
  create: CreateArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'create'>;
  createMany: CreateManyArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'createMany'>;
  delete: DeleteArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'delete'>;
  deleteMany: DeleteManyArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'deleteMany'>;
  exists: ExistsArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'exists'>;
  findFirst: QueryArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'findFirst'>;
  findMany: QueryArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'findMany'>;
  findOne: QueryArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'findOne'>;
  findUnique: QueryArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'findUnique'>;
  cursor: CursorArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'cursor'>;
  paginate: PaginationArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'paginate'>;
  update: UpdateArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'update'>;
  updateEach: UpdateEachArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'updateEach'>;
  updateMany: UpdateManyArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'updateMany'>;
  upsert: UpsertArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'upsert'>;
  upsertMany: UpsertManyArgs<Schema, Name, Meta> & OperationArgsForKind<OperationArgs, 'upsertMany'>;
};
type PluginOperationResultMap<Schema extends AnySchema, _Name extends TableKey<Schema>, _Meta> = {
  count: number;
  create: unknown;
  createMany: BatchResult<unknown>;
  delete: unknown;
  deleteMany: BatchResult<unknown>;
  exists: boolean;
  findFirst: unknown;
  findMany: unknown[];
  findOne: unknown;
  findUnique: unknown;
  cursor: unknown;
  paginate: unknown;
  update: unknown;
  updateEach: BatchResult<unknown>;
  updateMany: BatchResult<unknown>;
  upsert: unknown;
  upsertMany: BatchResult<unknown>;
};
/**
 * Fully-typed input passed to plugin hooks and transforms for every
 * operation. The shape is narrowed by the `Kind` type parameter so that
 * `args`, `data`, `select`, `include`, `where`, etc. reflect the
 * concrete operation being performed.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name   - The table key within the schema.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam State  - Plugin state type. Defaults to {@link PluginState}.
 * @typeParam Kind   - The operation kind discriminant.
 */
type PluginOperationInputBase<Schema extends AnySchema = AnySchema, Name extends TableKey<Schema> = TableKey<Schema>, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>, Kind extends PluginHookKind = PluginHookKind> = {
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  args: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind];
  data?: Kind extends 'create' ? InsertModelFor<Schema, Name> : Kind extends 'createMany' ? InsertModelFor<Schema, Name>[] : Kind extends 'upsertMany' ? InsertModelFor<Schema, Name>[] : Kind extends 'updateEach' ? UpdateEachArgs<Schema, Name, Meta>['data'] : Kind extends 'update' ? UpdateDataInput<Schema, Name> : Kind extends 'updateMany' ? UpdateScalarDataInput<Schema, Name> : Kind extends 'upsert' ? {
    create: InsertModelFor<Schema, Name>;
    update: UpdateDataInput<Schema, Name>;
  } : never;
  db: unknown;
  dialect: PluginDialect;
  isInTransaction: boolean;
  include?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    include?: infer Include;
  } ? Include : never;
  kind: Kind;
  meta: Meta | undefined;
  model: PluginModelInfo<Schema, Name>;
  options: BetterClientOptions<Schema, Meta, readonly AnyPlugin[]>;
  orderBy?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    orderBy?: infer OrderBy;
  } ? OrderBy : never;
  cursor?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    cursor?: infer Cursor;
  } ? Cursor : never;
  schema: Schema;
  /** Active model scope state keyed by scope key; `undefined` without scopes. */
  scopes: Readonly<Record<string, unknown>> | undefined;
  select?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    select?: infer Select;
  } ? Select : never;
  skip?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    skip?: infer Skip;
  } ? Skip : never;
  state: State;
  table: Name;
  transaction: BetterDrizzleTransactionClient<Schema, Meta, readonly AnyPlugin[]> | null;
  transactionContext: Record<string, unknown> | undefined;
  take?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    take?: infer Take;
  } ? Take : never;
  where?: PluginOperationArgsMap<Schema, Name, Meta, OperationArgs>[Kind] extends {
    where?: infer Where;
  } ? Where : never;
};
/**
 * Full operation input passed to plugin hooks and transforms. Wraps the
 * internal base type with a discriminated kind to provide type-safe
 * access to operation-specific fields.
 *
 * @typeParam Schema      - The Drizzle schema type.
 * @typeParam Name        - The table key within the schema.
 * @typeParam Meta        - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam State       - Plugin state type. Defaults to {@link PluginState}.
 * @typeParam OperationArgs - Plugin-provided operation arg extensions.
 * @typeParam Kind        - The specific operation kind being performed.
 */
type PluginOperationInput<Schema extends AnySchema = AnySchema, Name extends TableKey<Schema> = TableKey<Schema>, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>, Kind extends PluginHookKind = PluginHookKind> = Kind extends PluginHookKind ? PluginOperationInputBase<Schema, Name, Meta, State, OperationArgs, Kind> : never;
type PluginBeforeHookContext<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, State extends PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap>, Kind extends PluginHookKind> = PluginOperationInput<Schema, Name, Meta, State, OperationArgs, Kind> & {
  client: BetterDrizzleModelDelegate<Schema, Name, Meta>;
};
type PluginAfterHookContext<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, State extends PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap>, Kind extends PluginHookKind> = PluginBeforeHookContext<Schema, Name, Meta, State, OperationArgs, Kind> & {
  /** Values recorded by intercepts through `annotate()`. */
  annotations?: Readonly<Record<string, unknown>>;
  compiled?: Readonly<Record<string, unknown>>;
  result: PluginOperationResultMap<Schema, Name, Meta>[Kind];
};
/**
 * Context passed to a plugin `intercept`. The operation input is final:
 * before hooks, transforms, and the client before hook have already run.
 *
 * @typeParam Kind - The operation kind being performed.
 */
type PluginInterceptContext<Schema extends AnySchema = AnySchema, Name extends TableKey<Schema> = TableKey<Schema>, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>, Kind extends PluginHookKind = PluginHookKind> = PluginBeforeHookContext<Schema, Name, Meta, State, OperationArgs, Kind> & {
  /** Records a value that after hooks receive in `annotations`. */
  annotate(key: string, value: unknown): void;
  /** Runs the next intercept, or the operation for the innermost one. */
  next(): Promise<PluginOperationResultMap<Schema, Name, Meta>[Kind]>;
  /**
   * Values of a prepared statement execution. `args` then hold `param()`
   * markers and are the same object on every execution of the statement.
   * `undefined` for regular calls.
   */
  params?: Readonly<Record<string, unknown>>;
  /** Skips client and plugin after hooks for this call. */
  skipAfterHooks(): void;
};
/**
 * Wraps the execution of every operation. Call `next()` to run the
 * operation or return a result without running SQL. When a before hook
 * returned an override, `next()` resolves to it without running SQL.
 * Intercepts never run for `.explain()`.
 */
type PluginIntercept<Schema extends AnySchema = AnySchema, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>> = (context: PluginInterceptContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, PluginHookKind>) => Promise<unknown>;
/**
 * Context object provided to plugin transaction lifecycle hooks
 * (`beforeTransaction`, `afterTransactionCommit`, `afterTransactionRollback`).
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type PluginTransactionHookContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = {
  /** Register a callback to run after the transaction commits. */
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  /** Register a callback to run after the transaction rolls back. */
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  /** The current attempt number (1-indexed) when retries are enabled. */
  attempt: number;
  /** The transaction-scoped Better Drizzle client. */
  client: BetterDrizzleTransactionClient<Schema, Meta, Plugins>;
  /** Optional comment attached to the transaction. */
  comment?: string;
  /** The underlying Drizzle database instance. */
  db: unknown;
  /** The detected SQL dialect. */
  dialect: PluginDialect;
  /** Nesting depth (0 for top-level, 1 for first savepoint, etc.). */
  depth: number;
  /** Always `true` inside a transaction hook. */
  isInTransaction: true;
  /** Merged metadata from scoped context and transaction options. */
  meta: Meta | undefined;
  /** Per-model registry exposing columns, relations, and helper methods. */
  models: ModelRegistry<Schema>;
  /** Optional transaction name for savepoint identification. */
  name?: string;
  /** The original client options passed to `better()`. */
  options: BetterClientOptions<Schema, Meta, Plugins>;
  /** The full Drizzle schema object. */
  schema: Schema;
  /** Custom context object passed via `transaction({ context })`. */
  transactionContext: Record<string, unknown> | undefined;
  /** The full transaction options including meta overrides. */
  transactionOptions: TransactionOptions & {
    meta?: Meta;
  };
};
/**
 * Context object provided to the `onTransactionError` plugin hook.
 * Extends {@link PluginTransactionHookContext} with the caught error.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type PluginTransactionErrorHookContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = PluginTransactionHookContext<Schema, Meta, Plugins> & {
  /** The error that caused the transaction to fail. */
  error: unknown;
};
/**
 * Context object provided to the `afterTransactionRollback` plugin hook.
 * Extends {@link PluginTransactionHookContext} with an optional rollback reason.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type PluginTransactionRollbackHookContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = PluginTransactionHookContext<Schema, Meta, Plugins> & {
  /** The reason for the rollback (e.g., explicit `rollback()`, timeout, or abort). */
  reason?: unknown;
};
/**
 * Context object provided to plugin raw SQL hooks (`beforeRaw`, `afterRaw`).
 * Contains the raw query, execution options, and transaction context.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 * @typeParam Action - The raw operation type (`'raw'`, `'executeRaw'`, or `'rawUnsafe'`).
 * @typeParam Result - The result type of the raw query.
 */
type PluginRawHookContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[], Action extends 'raw' | 'executeRaw' | 'rawUnsafe' = 'raw' | 'executeRaw' | 'rawUnsafe', Result = unknown> = {
  /** The raw operation type being performed. */
  action: Action;
  /** Register a callback to run after the transaction commits. */
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  /** Register a callback to run after the transaction rolls back. */
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  /** Optional comment attached to the raw query. */
  comment?: string;
  /** The underlying Drizzle database instance. */
  db: unknown;
  /** The detected SQL dialect. */
  dialect: PluginDialect;
  /** Whether the query is executing inside a transaction. */
  isInTransaction: boolean;
  /** Optional row mapper that was passed to the raw call. */
  map?: RawOptions<unknown, unknown, Meta>['map'];
  /** Merged metadata from scoped context and per-call options. */
  meta: Meta | undefined;
  /** Optional query name for logging/debugging. */
  name?: string;
  /** The original client options passed to `better()`. */
  options: BetterClientOptions<Schema, Meta, Plugins>;
  /** The rendered SQL string sent to the driver. */
  query: string;
  /** The full raw options object passed to the raw call. */
  rawOptions: RawOptions<unknown, unknown, Meta>;
  /** The result returned by the raw query. */
  result: Result;
  /** The full Drizzle schema object. */
  schema: Schema;
  /** Active model scope state keyed by scope key; `undefined` without scopes. */
  scopes: Readonly<Record<string, unknown>> | undefined;
  /** Optional AbortSignal for query cancellation. */
  signal?: AbortSignal;
  /** The Drizzle SQL object (before rendering to string). */
  sql?: unknown;
  /** The timeout in milliseconds, if specified. */
  timeoutMs?: number;
  /** The transaction-scoped client, or `null` if outside a transaction. */
  transaction: BetterDrizzleTransactionClient<Schema, Meta, readonly AnyPlugin[]> | null;
  /** Custom context object passed via `transaction({ context })`. */
  transactionContext: Record<string, unknown> | undefined;
};
/**
 * Context object provided to the `onRawError` plugin hook.
 * Extends {@link PluginRawHookContext} with the caught error.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type PluginRawErrorHookContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = PluginRawHookContext<Schema, Meta, Plugins, 'raw' | 'executeRaw' | 'rawUnsafe', unknown> & {
  /** The error that caused the raw query to fail. */
  error: unknown;
};
/**
 * Lifecycle hooks that a plugin can register. Each hook receives a rich
 * context object containing the operation arguments, model info, plugin
 * state, and (for after-hooks) the operation result.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam State  - Plugin state type. Defaults to {@link PluginState}.
 */
type PluginHooks<Schema extends AnySchema = AnySchema, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>> = {
  afterCreate?(context: PluginAfterHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'create' | 'createMany' | 'upsert' | 'upsertMany'>): unknown;
  afterDelete?(context: PluginAfterHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'delete' | 'deleteMany'>): unknown;
  afterQuery?(context: PluginAfterHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'count' | 'exists' | 'findFirst' | 'findMany' | 'findOne' | 'findUnique' | 'cursor' | 'paginate'>): unknown;
  afterTransactionCommit?(context: PluginTransactionHookContext<Schema, Meta, readonly AnyPlugin[]>): unknown;
  afterRaw?(context: PluginRawHookContext<Schema, Meta, readonly AnyPlugin[], 'raw' | 'rawUnsafe', unknown[]> | PluginRawHookContext<Schema, Meta, readonly AnyPlugin[], 'executeRaw', RawExecutionResult>): unknown;
  afterTransactionRollback?(context: PluginTransactionRollbackHookContext<Schema, Meta, readonly AnyPlugin[]>): unknown;
  afterUpdate?(context: PluginAfterHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'update' | 'updateEach' | 'updateMany'>): unknown;
  beforeCreate?(context: PluginBeforeHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'create' | 'createMany' | 'upsert' | 'upsertMany'>): MaybePromise<PluginBeforeHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'create' | 'createMany' | 'upsert' | 'upsertMany'>['data'] | undefined | void>;
  beforeDelete?(context: PluginBeforeHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'delete' | 'deleteMany'>): PluginOperationResultMap<Schema, BetterTableKey<Schema>, Meta>['delete' | 'deleteMany'] | undefined;
  beforeQuery?(context: PluginBeforeHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'count' | 'exists' | 'findFirst' | 'findMany' | 'findOne' | 'findUnique' | 'cursor' | 'paginate'>): PluginOperationResultMap<Schema, BetterTableKey<Schema>, Meta>['count' | 'exists' | 'findFirst' | 'findMany' | 'findOne' | 'findUnique' | 'cursor' | 'paginate'] | undefined;
  beforeTransaction?(context: PluginTransactionHookContext<Schema, Meta, readonly AnyPlugin[]>): unknown;
  beforeRaw?(context: PluginRawHookContext<Schema, Meta, readonly AnyPlugin[], 'raw' | 'executeRaw' | 'rawUnsafe', unknown>): unknown;
  beforeUpdate?(context: PluginBeforeHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'update' | 'updateEach' | 'updateMany'>): MaybePromise<PluginBeforeHookContext<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, 'update' | 'updateEach' | 'updateMany'>['data'] | undefined | void>;
  onTransactionError?(context: PluginTransactionErrorHookContext<Schema, Meta, readonly AnyPlugin[]>): unknown;
  onRawError?(context: PluginRawErrorHookContext<Schema, Meta, readonly AnyPlugin[]>): unknown;
};
/**
 * Transform function that can modify an operation's input before it
 * reaches the database. Return `undefined` to skip the operation
 * entirely, or return a (possibly modified) {@link PluginOperationInput}.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam State  - Plugin state type. Defaults to {@link PluginState}.
 */
type PluginTransform<Schema extends AnySchema = AnySchema, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>> = (operation: PluginOperationInput<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, PluginHookKind>) => PluginOperationInput<Schema, BetterTableKey<Schema>, Meta, State, OperationArgs, PluginHookKind> | undefined;
/**
 * Context object passed to a plugin's `setup()` method during client
 * initialization. Provides helpers to register hooks and transforms, and
 * read-only access to the schema, dialect, and model registry.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam State  - Plugin state type. Defaults to {@link PluginState}.
 */
type PluginSetupContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>> = {
  addHook(hook: PluginHooks<Schema, Meta, State, OperationArgs>): void;
  addTransform(transform: PluginTransform<Schema, Meta, State, OperationArgs>): void;
  dialect: PluginDialect;
  isColumnExists(model: string, column: string): boolean;
  models: ModelRegistry<Schema>;
  plugin: PluginMeta;
  schema: Schema;
};
/**
 * Context passed to a plugin's `extendModel()` callback. Provides access
 * to the delegate, database instance, dialect, model info, and schema.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type PluginModelExtensionContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Name extends BetterTableKey<Schema> = BetterTableKey<Schema>, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = {
  client: BetterDrizzleModelDelegate<Schema, Name, Meta, Plugins>;
  db: unknown;
  dialect: PluginDialect;
  model: PluginModelInfo<Schema, Name>;
  plugin: PluginMeta;
  schema: Schema;
};
/**
 * Context passed to a plugin's `extendClient()` callback. Provides access
 * to the full client, database instance, dialect, model registry, and schema.
 *
 * @typeParam Schema  - The Drizzle schema type.
 * @typeParam Meta    - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple. Defaults to `readonly Plugin[]`.
 */
type PluginClientExtensionContext<Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = {
  client: BetterDrizzleClient<Schema, Meta, Plugins>;
  db: unknown;
  dialect: PluginDialect;
  models: ModelRegistry<Schema>;
  plugin: PluginMeta;
  schema: Schema;
  /** This plugin's scope state on the client, when it declares a `scope`. */
  scope: unknown;
  /**
   * Returns a client whose scope state for this plugin is `state`
   * (`undefined` clears it), with `meta` merged into its default meta.
   */
  withScope(state: unknown, meta?: Record<string, unknown>): BetterDrizzleClient<Schema, Meta, Plugins>;
};
/**
 * A Better Drizzle plugin definition. Plugins extend the client with
 * additional properties, per-model methods, lifecycle hooks, and
 * operation transforms.
 *
 * @typeParam Options          - Plugin-specific options shape.
 * @typeParam ClientExtension  - Properties added to the client by `extendClient`.
 * @typeParam ModelExtension   - Properties added to each delegate by `extendModel`.
 * @typeParam State            - Plugin state type carried through hooks and transforms.
 */
interface Plugin<Options = unknown, ClientExtension extends PluginExtension = Record<never, never>, ModelExtension extends PluginExtension = Record<never, never>, State extends PluginState = PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>, ModelExtensionResolver = never, ClientExtensionResolver = never> extends PluginMeta<Options> {
  /** Static configuration controlling dialect support and model requirements. */
  config?: PluginConfig;
  /** Columns filled on create; they become optional in create input types. */
  generated?: PluginGeneratedColumns;
  /** Extends the client with additional methods and properties. */
  extendClient?<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[]>(context: PluginClientExtensionContext<Schema, Meta, Plugins>): ClientExtension | ClientExtensionOfResolver<ClientExtensionResolver, Schema, Meta, Plugins> | undefined;
  /** Model scope applied by the core to every statement on scoped models. */
  scope?: PluginScopeDefinition;
  /** Type-only: carries the client extension resolver; never read at runtime. */
  readonly clientExtensionResolver?: ClientExtensionResolver;
  /** Extends each model delegate with additional methods and properties. */
  extendModel?<Schema extends AnySchema, Name extends BetterTableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[]>(context: PluginModelExtensionContext<Schema, Meta, Name, Plugins>): ModelExtension | ModelExtensionOfResolver<ModelExtensionResolver, Schema, Name, Meta, Plugins> | undefined;
  /** Lifecycle hooks for intercepting CRUD, query, transaction, and raw operations. */
  hooks?: PluginHooks<AnySchema, BetterMeta, State, NoInfer<OperationArgs>>;
  /** Wraps operation execution; runs in plugin array order, outermost first. */
  intercept?: PluginIntercept<AnySchema, BetterMeta, State, NoInfer<OperationArgs>>;
  /** Custom operation args fields added to every delegate method call. */
  operationArgs?: OperationArgs;
  /** Runs once during client initialization. Used to register hooks and transforms. */
  setup?<Schema extends AnySchema, Meta>(context: PluginSetupContext<Schema, Meta, State, NoInfer<OperationArgs>>): void;
  /** Transforms every operation before it reaches Drizzle. */
  transform?: PluginTransform<AnySchema, BetterMeta, State, NoInfer<OperationArgs>>;
}
/**
 * Erased plugin type used as a constraint in generic tuples. All plugin
 * generics are widened to `any` so that `readonly AnyPlugin[]` accepts
 * any combination of plugins.
 */
type Any = any;
type AnyPlugin = Plugin<Any, Any, Any, Any, Any, Any, Any>;
type PluginDefinition<Options, ClientExtension extends PluginExtension, ModelExtension extends PluginExtension, State extends PluginState, OperationArgs extends Partial<PluginOperationArgsExtensionMap>, ModelExtensionResolver, ClientExtensionResolver> = Omit<Plugin<Options, ClientExtension, ModelExtension, State, OperationArgs, ModelExtensionResolver, ClientExtensionResolver>, 'hooks' | 'operationArgs' | 'setup' | 'transform'> & {
  hooks?: PluginHooks<AnySchema, BetterMeta, State, NoInfer<OperationArgs>>;
  operationArgs?: OperationArgs;
  setup?<Schema extends AnySchema, Meta>(context: PluginSetupContext<Schema, Meta, State, NoInfer<OperationArgs>>): void;
  transform?: PluginTransform<AnySchema, BetterMeta, State, NoInfer<OperationArgs>>;
};
/**
 * Type-level resolver for per-table model extensions. A plugin declares an
 * interface extending this one and computes `extension` from `this['schema']`
 * and `this['name']`; Better Drizzle fills both in for every table. Unlike a
 * generic function resolver, it is evaluated without inferring against the
 * delegate type, so it cannot recurse through the model extensions it
 * produces.
 *
 * @example
 * ```ts
 * interface AuditExtension extends ModelExtensionTypeResolver {
 *   readonly extension: { table: this['name'] };
 * }
 * const audit = definePlugin<unknown, {}, {}, PluginState, {}, AuditExtension>({
 *   id: 'audit',
 *   extendModel: ({ model }) => ({ table: model.name }) as never,
 * });
 * ```
 */
interface ModelExtensionTypeResolver {
  readonly schema: unknown;
  readonly name: unknown;
  readonly extension: unknown;
}
/**
 * Type-level resolver for client extensions, like
 * {@link ModelExtensionTypeResolver}. Better Drizzle fills in `schema`,
 * `meta`, and `plugins` for the client; `extension` computes the properties
 * the plugin adds. `hidden`, when set, names table keys removed from the
 * client returned by `better()` (clients the plugin derives keep them).
 *
 * @example
 * ```ts
 * interface TablesExtension extends ClientExtensionTypeResolver {
 *   readonly extension: { tables: readonly (keyof this['schema'])[] };
 * }
 * ```
 */
interface ClientExtensionTypeResolver {
  readonly schema: unknown;
  readonly meta: unknown;
  readonly plugins: unknown;
  readonly extension: unknown;
  readonly hidden?: unknown;
}
type HiddenOfResolver<Resolver, Schema extends AnySchema> = [Resolver] extends [never] ? never : Resolver extends ClientExtensionTypeResolver ? Extract<(Resolver & {
  readonly schema: Schema;
})['hidden'], TableKey<Schema>> : never;
/**
 * Table keys that plugin client resolvers hide from the client returned by
 * `better()`.
 *
 * @typeParam Plugins - The plugin tuple.
 * @typeParam Schema  - The Drizzle schema type.
 */
type HiddenModelsOf<Plugins extends readonly AnyPlugin[], Schema extends AnySchema> = Plugins[number] extends (infer PluginDef) ? PluginDef extends {
  readonly clientExtensionResolver?: infer Resolver;
} ? HiddenOfResolver<NonNullable<Resolver>, Schema> : never : never;
type ClientExtensionOfResolver<Resolver, Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[]> = [Resolver] extends [never] ? Record<never, never> : Resolver extends ClientExtensionTypeResolver ? (Resolver & {
  readonly schema: Schema;
  readonly meta: Meta;
  readonly plugins: Plugins;
})['extension'] extends (infer Extension) ? Extension extends Record<string, unknown> ? Extension : Record<never, never> : Record<never, never> : Record<never, never>;
type ModelExtensionOfResolver<Resolver, Schema extends AnySchema, Name extends BetterTableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[]> = [Resolver] extends [never] ? Record<never, never> : Resolver extends ModelExtensionTypeResolver ? (Resolver & {
  readonly schema: Schema;
  readonly name: Name;
})['extension'] extends (infer Extension) ? Extension extends Record<string, unknown> ? Extension : Record<never, never> : Record<never, never> : Resolver extends (<TContext extends PluginModelExtensionContext<Schema, Meta, Name, Plugins>>(context: TContext) => infer Extension) ? Extension extends Record<string, unknown> ? Extension : Record<never, never> : Record<never, never>;
/**
 * Extracts the client-level extension type from a plugin definition.
 *
 * @typeParam PluginDef - The plugin type to extract from.
 */
type ClientExtensionOf<PluginDef, Schema extends AnySchema = AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = PluginDef extends Plugin<infer _Options, infer Extension, infer _ModelExtension, infer _State, infer _OperationArgs, infer _Resolver, infer Resolver> ? [Resolver] extends [never] ? Extension : ClientExtensionOfResolver<Resolver, Schema, Meta, Plugins> : Record<never, never>;
/**
 * Extracts the model-level extension type from a plugin definition.
 *
 * @typeParam PluginDef - The plugin type to extract from.
 */
type ModelExtensionOf<PluginDef, Schema extends AnySchema = AnySchema, Name extends BetterTableKey<Schema> = BetterTableKey<Schema>, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = PluginDef extends Plugin<infer _Options, infer _ClientExtension, infer Extension, infer _State, infer _OperationArgs, infer Resolver, infer _ClientResolver> ? (Extension extends Record<string, unknown> ? Extension : Record<never, never>) & ModelExtensionOfResolver<Resolver, Schema, Name, Meta, Plugins> : Record<never, never>;
/**
 * Extracts the operation-args extension map from a plugin definition.
 * Returns `Record<never, never>` when the plugin does not declare any
 * custom operation arguments.
 *
 * @typeParam PluginDef - The plugin type to extract from.
 */
type OperationArgsOf<PluginDef> = PluginDef extends Plugin<infer _Options, infer _ClientExtension, infer _ModelExtension, infer _State, infer OperationArgs> ? OperationArgs : Record<never, never>;
type ColumnKeys<Column> = Column extends readonly (infer Key)[] ? Key : Column;
type GeneratedColumnOf<Generated, Name extends string, Insert> = Generated extends PluginGeneratedColumns<infer Column, infer Models, infer Value> ? Extract<string extends keyof Models ? string extends ColumnKeys<Column> ? never : ColumnKeys<Column> : Name extends keyof Models ? Models[Name] extends false ? never : ColumnKeys<Models[Name]> : string extends ColumnKeys<Column> ? never : ColumnKeys<Column>, { [K in keyof Insert]-?: NonNullable<Insert[K]> extends Value ? K : never; }[keyof Insert]> : never;
/**
 * Union of the column keys that plugins in a tuple fill on create for one
 * table. Plugins without a literal `generated` declaration contribute none.
 *
 * @typeParam Plugins - The plugin tuple.
 * @typeParam Schema  - The Drizzle schema type.
 * @typeParam Name    - The table key within the schema.
 */
type GeneratedColumnsOf<Plugins extends readonly AnyPlugin[], Schema extends AnySchema, Name extends TableKey<Schema>> = Plugins[number] extends (infer PluginDef) ? PluginDef extends {
  generated?: infer Generated;
} ? GeneratedColumnOf<NonNullable<Generated>, Name & string, InsertModelFor<Schema, Name>> : never : never;
/**
 * Converts a union type `A | B` into an intersection type `A & B`.
 * Used internally to merge extension types from multiple plugins.
 *
 * @typeParam Value - The union type to convert.
 */
type UnionToIntersection<Value> = (Value extends unknown ? (input: Value) => void : never) extends ((input: infer Intersection) => void) ? Intersection : never;
/**
 * Merges the client-level extension types from all plugins in a tuple
 * into a single intersection type.
 *
 * @typeParam Plugins - The plugin tuple.
 */
type ClientExtensionsOf<Plugins extends readonly AnyPlugin[], Schema extends AnySchema = AnySchema, Meta = BetterMeta> = UnionToIntersection<ClientExtensionOf<Plugins[number], Schema, Meta, Plugins>> extends (infer Extension) ? Extension extends Record<string, unknown> ? Extension : Record<never, never> : Record<never, never>;
/**
 * Merges the operation-args extension types from all plugins in a tuple
 * for a specific operation kind into a single intersection type.
 *
 * @typeParam Plugins - The plugin tuple.
 * @typeParam Kind    - The operation kind to merge args for.
 */
type PluginOperationArgsFor<Plugins extends readonly AnyPlugin[], Kind extends PluginHookKind> = UnionToIntersection<OperationArgsForKind<OperationArgsOf<Plugins[number]>, Kind>> extends (infer Extension) ? Extension extends Record<string, unknown> ? Extension : Record<never, never> : Record<never, never>;
/**
 * Builds the full operation-args extension map for all plugins in a
 * tuple, keyed by {@link PluginHookKind}. Used to type the extra fields
 * that plugins inject into delegate method arguments.
 *
 * @typeParam Plugins - The plugin tuple.
 */
type OperationArgsExtensionsOf<Plugins extends readonly AnyPlugin[]> = { [K in PluginHookKind]: PluginOperationArgsFor<Plugins, K>; };
/**
 * Intersects a base operation-args type with the plugin-declared
 * operation-args extensions for a given operation kind. The result is
 * the full args type that delegates expose for that operation.
 *
 * @typeParam Args    - The base operation arguments type.
 * @typeParam Plugins - The plugin tuple.
 * @typeParam Kind    - The operation kind.
 */
type OperationArgsWithPlugins<Args, Plugins extends readonly AnyPlugin[], Kind extends PluginHookKind> = Args & PluginOperationArgsFor<Plugins, Kind>;
/**
 * Merges the model-level extension types from all plugins in a tuple
 * into a single intersection type.
 *
 * @typeParam Plugins - The plugin tuple.
 */
type ModelExtensionsOf<Plugins extends readonly AnyPlugin[], Schema extends AnySchema = AnySchema, Name extends BetterTableKey<Schema> = BetterTableKey<Schema>, Meta = BetterMeta> = UnionToIntersection<ModelExtensionOf<Plugins[number], Schema, Name, Meta, Plugins>> extends (infer Extension) ? Extension extends Record<string, unknown> ? Extension : Record<never, never> : Record<never, never>;
/**
 * Helper that creates a well-typed plugin definition. Use this to get
 * full type inference for hooks, transforms, extensions, and state.
 *
 * @typeParam PluginDef - The concrete plugin definition.
 * @param plugin - The plugin definition object.
 * @returns The same plugin object, narrowed to its literal types.
 *
 * @example
 * ```ts
 * import { definePlugin } from 'better-drizzle';
 *
 * const myPlugin = definePlugin({
 *   id: 'soft-delete',
 *   name: 'Soft Delete',
 *   version: '1.0.0',
 *   setup(ctx) {
 *     ctx.addHook({ beforeDelete(c) { c.args; } });
 *   },
 * });
 * ```
 */
declare const definePlugin: <const Options = unknown, const ClientExtension extends PluginExtension = Record<never, never>, const ModelExtension extends PluginExtension = Record<never, never>, const State extends PluginState = PluginState, const OperationArgs extends Partial<PluginOperationArgsExtensionMap> = Record<never, never>, const ModelExtensionResolver = never, const ClientExtensionResolver = never>(plugin: PluginDefinition<Options, ClientExtension, ModelExtension, State, OperationArgs, ModelExtensionResolver, ClientExtensionResolver>) => Plugin<Options, ClientExtension, ModelExtension, State, OperationArgs, ModelExtensionResolver, ClientExtensionResolver>;
//#endregion
//#region src/types/delegate.d.ts
type RelationSelector<Schema extends AnySchema, Name extends TableKey<Schema>, RelationName extends RelationKeysFor<Schema, Name>> = Partial<SelectModelFor<Schema, RelatedNameFor<Schema, Name, RelationName>>>;
type OneCreateRelationInput<Selector> = {
  connect: Selector;
};
type ManyCreateRelationInput<Selector> = {
  connect: Selector | readonly Selector[];
};
type OneUpdateRelationInput<Selector> = {
  connect: Selector;
  disconnect?: never;
  set?: never;
} | {
  connect?: never;
  disconnect: true;
  set?: never;
} | {
  connect?: never;
  disconnect?: never;
  set: Selector | null;
};
type ManyUpdateRelationInput<Selector> = {
  connect?: Selector | readonly Selector[];
  disconnect?: Selector | readonly Selector[];
  set?: never;
} | {
  connect?: never;
  disconnect?: never;
  set: readonly Selector[];
};
type CreateRelationData<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in RelationKeysFor<Schema, Name>]?: RelationFor<Schema, Name, K> extends Many$1<string> ? ManyCreateRelationInput<RelationSelector<Schema, Name, K>> : OneCreateRelationInput<RelationSelector<Schema, Name, K>>; };
type UpdateRelationData<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in RelationKeysFor<Schema, Name>]?: RelationFor<Schema, Name, K> extends Many$1<string> ? ManyUpdateRelationInput<RelationSelector<Schema, Name, K>> : OneUpdateRelationInput<RelationSelector<Schema, Name, K>>; };
type AtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>; }[keyof T];
/** Scalar insert data plus nested relation connect commands. */
type CreateDataInput<Schema extends AnySchema, Name extends TableKey<Schema>, Generated extends string = never> = InsertInputFor<Schema, Name, Generated> | (Partial<InsertModelFor<Schema, Name>> & AtLeastOne<CreateRelationData<Schema, Name>>);
type PgArrayElement<T> = Exclude<NonNullable<T> extends readonly (infer Value)[] ? Value : never, null | undefined>;
type PgArrayMutationValues<T> = PgArrayElement<T> | readonly PgArrayElement<T>[];
type PgArrayReplace<T> = {
  from: PgArrayElement<T>;
  to: PgArrayElement<T>;
};
/** Atomic mutations supported by native PostgreSQL array columns. */
type PgArrayMutationInput<T> = {
  append: PgArrayMutationValues<T>;
  prepend?: never;
  remove?: never;
  replace?: never;
  addUnique?: never;
} | {
  append?: never;
  prepend: PgArrayMutationValues<T>;
  remove?: never;
  replace?: never;
  addUnique?: never;
} | {
  append?: never;
  prepend?: never;
  remove: PgArrayMutationValues<T>;
  replace?: never;
  addUnique?: never;
} | {
  append?: never;
  prepend?: never;
  remove?: never;
  replace: PgArrayReplace<T> | readonly PgArrayReplace<T>[];
  addUnique?: never;
} | {
  append?: never;
  prepend?: never;
  remove?: never;
  replace?: never;
  addUnique: PgArrayMutationValues<T>;
};
/** Atomic mutations supported by numeric columns. */
type NumericMutationInput = AtLeastOne<{
  decrement?: number;
  divide?: number;
  increment?: number;
  max?: never;
  min?: never;
  multiply?: number;
  set?: number;
}> | NumericBoundMutationInput;
/**
 * Keeps the larger (`max`, `GREATEST`) or smaller (`min`, `LEAST`) of the
 * column and the operand. A NULL column becomes the operand on every dialect.
 */
type NumericBoundMutationInput = ({
  max: number;
  min?: never;
} & NoNumericOperators) | ({
  max?: never;
  min: number;
} & NoNumericOperators);
type NoNumericOperators = {
  decrement?: never;
  divide?: never;
  increment?: never;
  multiply?: never;
  set?: never;
};
/** Atomic mutation supported by boolean columns. */
type BooleanMutationInput = {
  toggle: true;
};
type ScalarUpdateValue<T> = NonNullable<T> extends number ? T | NumericMutationInput : NonNullable<T> extends boolean ? T | BooleanMutationInput : T;
type IsPgJsonbColumn<Column> = IsPgJsonColumn<Column>;
/** Partial JSONB path update accepted by update operations (`jsonb_set`). */
type JsonbMutationField<Model> = IsUnknown<Model> extends true ? JsonMutationValue | JsonDottedMutationInput<Model> | {
  json: Record<string, JsonMutationValue>;
} | SQL : Model | JsonDottedMutationInput<Model> | {
  json: JsonMutationInput<Model>;
} | SQL;
type UpdateScalarField<Schema extends AnySchema, Name extends TableKey<Schema>, K extends keyof InsertModelFor<Schema, Name>> = K extends keyof TableFor<Schema, Name> ? IsPgJsonbColumn<TableFor<Schema, Name>[K]> extends true ? JsonbMutationField<SelectModelFor<Schema, Name>[K & keyof SelectModelFor<Schema, Name>]> : K extends PgArrayKeysFor<Schema, Name> ? InsertModelFor<Schema, Name>[K] | PgArrayMutationInput<InsertModelFor<Schema, Name>[K]> : ScalarUpdateValue<InsertModelFor<Schema, Name>[K]> : ScalarUpdateValue<InsertModelFor<Schema, Name>[K]>;
/** Partial scalar data accepted by update operations. */
type UpdateScalarDataInput<Schema extends AnySchema, Name extends TableKey<Schema>> = Partial<{ [K in keyof InsertModelFor<Schema, Name>]: UpdateScalarField<Schema, Name, K>; }>;
/** Partial scalar update data plus nested relation mutation commands. */
type UpdateDataInput<Schema extends AnySchema, Name extends TableKey<Schema>> = UpdateScalarDataInput<Schema, Name> & UpdateRelationData<Schema, Name>;
/**
 * A factory function that creates the error thrown when `.throw()` is invoked
 * on a {@link ThrowingResult} or {@link ThrowingWriteResult} and no record was found.
 */
type ThrowFactory = () => unknown;
/**
 * A write result (`update`, `delete`) that resolves to `T | null` and exposes
 * a `.throw()` helper. Calling `.throw()` converts a `null` result into a
 * thrown error. Writes run eagerly and cannot be explained or prepared.
 *
 * @typeParam T - The non-null result type.
 *
 * @example
 * ```ts
 * const user = await db.user
 *   .update({ where: { id: 1 }, data: { name: 'Alice' } })
 *   .throw();
 * ```
 */
type ThrowingWriteResult<T> = Promise<T | null> & {
  /** Throws a `BetterDrizzleError` with code `RESULT_NOT_FOUND` when the result is `null`. */
  throw(): Promise<NonNullish<T>>;
  /**
   * Throws the error returned by the factory function when the result is `null`.
   *
   * @param factory - A function that returns the error to throw.
   */
  throw(factory: ThrowFactory): Promise<NonNullish<T>>;
};
/**
 * A single-row read result that resolves to `T | null`, exposes `.explain()`,
 * and a `.throw()` helper that converts a `null` result into a thrown error.
 *
 * @typeParam T - The non-null result type.
 *
 * @example
 * ```ts
 * // Resolve to null when not found
 * const user = await db.user.findFirst({ where: { id: 1 } });
 * if (user) { /* handle found user *\/ }
 *
 * // Throw when not found
 * const user = await db.user.findFirst({ where: { id: 1 } }).throw();
 *
 * // Custom error factory
 * const user = await db.user.findFirst({ where: { id: 1 } }).throw(
 *   () => new Error('User not found')
 * );
 * ```
 */
type ThrowingResult<T> = ExplainableResult<T | null> & Pick<ThrowingWriteResult<T>, 'throw'>;
/** A read result that can also be compiled with `.prepare()`. */
type PreparableRead<T, Meta, Args> = ExplainableResult<T> & PreparableResult<PreparedStatement<T, PreparedParamsFor<Args>, Meta>>;
/** A single-row read result that can also be compiled with `.prepare()`. */
type PreparableSingleRead<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Args> = ThrowingResult<PayloadForArgs<Schema, Name, Args>> & PreparableResult<PreparedSingleStatement<PayloadForArgs<Schema, Name, Args>, PreparedParamsFor<Args>, Meta>>;
/**
 * Result returned by batch operations (`createMany`, `updateMany`, `deleteMany`).
 *
 * @typeParam T - The row type returned by the operation (may be `never` when
 *   the database driver does not support `RETURNING`).
 *
 * @example
 * ```ts
 * const result = await db.user.createMany({
 *   data: [{ name: 'A' }, { name: 'B' }],
 * });
 * console.log(result.count); // 2
 * ```
 */
interface BatchResult<T> {
  /** Number of rows affected by the operation. */
  count: number;
  /** The affected rows, when the driver supports returning them. */
  data?: T[];
}
/**
 * Column name that can be used as a duplicate-skip target for a specific table.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type SkipDuplicatesColumn<Schema extends AnySchema, Name extends TableKey<Schema>> = Extract<keyof InsertModelFor<Schema, Name>, string>;
/**
 * Duplicate-skip option for `create` and `createMany` operations.
 *
 * - `true` ignores duplicate conflicts for any supported unique target.
 * - `readonly ColumnName[]` ignores duplicates only for the specified columns
 *   when the dialect supports explicit conflict targets.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * await db.user.create({
 *   data: { email: 'alice@example.com', name: 'Alice' },
 *   skipDuplicates: true,
 * });
 *
 * await db.user.create({
 *   data: { email: 'alice@example.com', name: 'Alice' },
 *   skipDuplicates: ['email'],
 * });
 * ```
 */
type SkipDuplicatesOption<Schema extends AnySchema, Name extends TableKey<Schema>> = boolean | readonly SkipDuplicatesColumn<Schema, Name>[];
/**
 * Arguments for the `create` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const args: CreateArgs<typeof relations, 'user'> = {
 *   data: { name: 'Alice', email: 'alice@example.com' },
 *   skipDuplicates: true,
 *   select: { id: true, name: true },
 *   meta: { requestId: 'abc-123' },
 * };
 * ```
 */
interface CreateArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta, Generated extends string = never> {
  /** The row data to insert. */
  data: CreateDataInput<Schema, Name, Generated>;
  /** Optional duplicate-skip handling for unique / primary key violations. */
  skipDuplicates?: SkipDuplicatesOption<Schema, Name>;
  /** Optional column / relation projection for the returned row. */
  select?: SelectInput<Schema, Name>;
  /** Optional relation-only projection for the returned row. */
  include?: IncludeInput<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `update` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const args: UpdateArgs<typeof relations, 'user'> = {
 *   where: { id: 1 },
 *   data: { name: 'Bob' },
 *   select: { id: true, name: true },
 * };
 * ```
 */
interface UpdateArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> {
  /** Filter identifying which row to update. */
  where: WhereArg<Schema, Name>;
  /** Partial column values to apply. */
  data: UpdateDataInput<Schema, Name>;
  /** Optional column / relation projection for the returned row. */
  select?: SelectInput<Schema, Name>;
  /** Optional relation-only projection for the returned row. */
  include?: IncludeInput<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `createMany` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const result = await db.user.createMany({
 *   data: [
 *     { name: 'Alice', email: 'alice@example.com' },
 *     { name: 'Bob', email: 'bob@example.com' },
 *   ],
 *   skipDuplicates: true,
 * });
 * ```
 */
interface CreateManyArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta, Generated extends string = never> {
  /** Array of row data to insert. */
  data: InsertInputFor<Schema, Name, Generated>[];
  /** Optional duplicate-skip handling for unique / primary key violations. */
  skipDuplicates?: SkipDuplicatesOption<Schema, Name>;
  /** Optional column / relation projection for returned rows. */
  select?: SelectInput<Schema, Name>;
  /** Optional relation-only projection for returned rows. */
  include?: IncludeInput<Schema, Name>;
  /** Optional batch size for chunked native execution. */
  batchSize?: number;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `updateMany` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const result = await db.user.updateMany({
 *   where: { role: 'guest' },
 *   data: { active: false },
 * });
 * ```
 */
interface UpdateManyArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> {
  /** Filter for the rows to update. When omitted or it compiles to no condition (`{}`, only `undefined` values), nothing is updated and `count` is `0`. */
  where?: WhereArg<Schema, Name>;
  /** Partial column values to apply to every matched row. */
  data: UpdateScalarDataInput<Schema, Name>;
  /** Optional scalar projection for returned rows. */
  select?: ScalarSelectInput<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Extracts a Drizzle column instance for a given table and key.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name   - The table key within the schema.
 * @typeParam Key    - The column key. Defaults to all scalar keys.
 */
type TableColumnFor<Schema extends AnySchema, Name extends TableKey<Schema>, Key extends ScalarKeysFor<Schema, Name> = ScalarKeysFor<Schema, Name>> = Extract<TableFor<Schema, Name>['_']['columns'][Key], AnyColumn>;
/**
 * Row shape for the `updateEach` operation. Extends the select model
 * with an index signature for arbitrary additional properties.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name   - The table key within the schema.
 */
type UpdateEachRow<Schema extends AnySchema, Name extends TableKey<Schema>> = Partial<SelectModelFor<Schema, Name>> & Record<string, unknown>;
/**
 * Per-column update callback map for `updateEach`. Each key maps to a
 * function that receives the current row and returns the new value or
 * a SQL expression for that column.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name   - The table key within the schema.
 * @typeParam Row    - The row type passed to update callbacks.
 */
type UpdateEachUpdateMap<Schema extends AnySchema, Name extends TableKey<Schema>, Row extends UpdateEachRow<Schema, Name>> = Partial<{ [K in ScalarKeysFor<Schema, Name>]: (row: Row) => K extends keyof TableFor<Schema, Name> ? IsPgJsonbColumn<TableFor<Schema, Name>[K]> extends true ? JsonbMutationField<SelectModelFor<Schema, Name>[K]> : K extends PgArrayKeysFor<Schema, Name> ? SelectModelFor<Schema, Name>[K] | PgArrayMutationInput<SelectModelFor<Schema, Name>[K]> | SQL : ScalarUpdateValue<SelectModelFor<Schema, Name>[K]> | SQL : ScalarUpdateValue<SelectModelFor<Schema, Name>[K]> | SQL; }>;
/**
 * Arguments for the `updateEach` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Row - Source row type inferred from `data`.
 *
 * @example
 * ```ts
 * const result = await db.user.updateEach({
 *   by: schema.user.id,
 *   data: [
 *     { id: 1, name: 'Alice Updated' },
 *     { id: 2, name: 'Bob Updated' },
 *   ],
 *   update: {
 *     name: (row) => row.name,
 *   },
 *   select: { id: true, name: true },
 * });
 * ```
 */
interface UpdateEachArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta, Row extends UpdateEachRow<Schema, Name> = UpdateEachRow<Schema, Name>> {
  /** Column used to match each source row against existing records. */
  by: TableColumnFor<Schema, Name>;
  /** Source rows that drive the per-row updates. */
  data: Row[];
  /** Per-column callbacks that resolve the new value for each source row. */
  update: UpdateEachUpdateMap<Schema, Name, Row>;
  /** Optional extra filter combined with the generated `by in (...)` predicate. */
  where?: WhereArg<Schema, Name>;
  /** Optional scalar projection for returned rows. */
  select?: ScalarSelectInput<Schema, Name>;
  /** Empty-input handling. Defaults to `'return'`. */
  onEmpty?: 'return' | 'throw';
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `deleteMany` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const result = await db.user.deleteMany({
 *   where: { role: 'guest' },
 * });
 * ```
 */
interface DeleteManyArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> {
  /** Filter for the rows to delete. When omitted or it compiles to no condition (`{}`, only `undefined` values), nothing is deleted and `count` is `0`. */
  where?: WhereArg<Schema, Name>;
  /** Optional scalar projection for returned rows. */
  select?: ScalarSelectInput<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `delete` operation.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const deleted = await db.user.delete({
 *   where: { id: 1 },
 *   select: { id: true, name: true },
 * });
 * ```
 */
interface DeleteArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta> {
  /** Filter identifying which row to delete. */
  where: WhereArg<Schema, Name>;
  /** Optional column / relation projection for the returned row. */
  select?: SelectInput<Schema, Name>;
  /** Optional relation-only projection for the returned row. */
  include?: IncludeInput<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Arguments for the `upsert` operation.
 * Provides both the create and update payloads alongside a where clause
 * that determines whether to insert or update.
 *
 * When `where` pins the primary key, or holds only the columns of one unique
 * key, and `create` sets the same values, the upsert runs as one atomic
 * statement (`ON CONFLICT ... DO UPDATE` on PostgreSQL and SQLite). On MySQL,
 * `ON DUPLICATE KEY UPDATE` fires on any unique key, so it is used only when
 * the target is the table's only unique key and, for a unique key target,
 * the insert does not set the primary key. Other shapes read, then create or
 * update, which can hit a unique violation under concurrent calls.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const user = await db.user.upsert({
 *   where: { email: 'alice@example.com' },
 *   create: { name: 'Alice', email: 'alice@example.com' },
 *   update: { name: 'Alice Updated' },
 *   select: { id: true, name: true },
 * });
 * ```
 */
interface UpsertArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta, Generated extends string = never> {
  /** Filter that determines whether to insert or update. */
  where: WhereArg<Schema, Name>;
  /** Row data used when no matching record exists. */
  create: CreateDataInput<Schema, Name, Generated>;
  /** Partial column values applied when a matching record exists. */
  update: UpdateDataInput<Schema, Name>;
  /** Optional column / relation projection for the returned row. */
  select?: SelectInput<Schema, Name>;
  /** Optional relation-only projection for the returned row. */
  include?: IncludeInput<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
/**
 * Extracts the column names from the insert model that can be used as conflict targets.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyTargetColumn<Schema extends AnySchema, Name extends TableKey<Schema>> = Extract<keyof InsertModelFor<Schema, Name>, string>;
/**
 * Defines the conflict target columns for `upsertMany`.
 * Can be a single column name or an array of column names.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyTarget<Schema extends AnySchema, Name extends TableKey<Schema>> = UpsertManyTargetColumn<Schema, Name> | readonly UpsertManyTargetColumn<Schema, Name>[];
/**
 * Defines the update values for columns when a conflict is detected.
 * Each key maps to either a direct value or a SQL expression.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyUpdateValue<Schema extends AnySchema, Name extends TableKey<Schema>> = Partial<{ [K in UpsertManyTargetColumn<Schema, Name>]: K extends keyof TableFor<Schema, Name> ? IsPgJsonbColumn<TableFor<Schema, Name>[K]> extends true ? JsonbMutationField<SelectModelFor<Schema, Name>[K & keyof SelectModelFor<Schema, Name>]> : K extends PgArrayKeysFor<Schema, Name> ? InsertModelFor<Schema, Name>[K] | PgArrayMutationInput<InsertModelFor<Schema, Name>[K]> | SQL : ScalarUpdateValue<InsertModelFor<Schema, Name>[K]> | SQL : ScalarUpdateValue<InsertModelFor<Schema, Name>[K]> | SQL; }>;
/**
 * Represents the `EXCLUDED` table columns for PostgreSQL/SQLite conflict resolution.
 * Each key maps to a SQL reference to the excluded (proposed) value.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyExcluded<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in UpsertManyTargetColumn<Schema, Name>]: SQL; };
/**
 * Maps conflict target column names to their Drizzle column objects.
 * Used internally to build update expressions with proper column references.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyTableColumns<Schema extends AnySchema, Name extends TableKey<Schema>> = { [K in UpsertManyTargetColumn<Schema, Name>]: AnyColumn; };
/**
 * Context object passed to custom update strategy callbacks in `upsertMany`.
 * Provides access to the excluded (conflicting) row values, SQL builder, and column references.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyUpdateContext<Schema extends AnySchema, Name extends TableKey<Schema>> = {
  /** Reference to the proposed values that would have been inserted. */
  excluded: UpsertManyExcluded<Schema, Name>;
  /** Drizzle SQL template tag for building expressions. */
  sql: typeof import('drizzle-orm').sql;
  /** Column references for the target table. */
  table: UpsertManyTableColumns<Schema, Name>;
};
/**
 * Defines the update strategy for `upsertMany` when a conflict is detected.
 *
 * - `'all'`: Update all columns with the proposed values.
 * - `string[]`: Update only the specified columns.
 * - `object`: Static update values mapping column names to values or SQL expressions.
 * - `function`: Callback that receives the update context and returns dynamic update values.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type UpsertManyUpdateStrategy<Schema extends AnySchema, Name extends TableKey<Schema>> = 'all' | readonly UpsertManyTargetColumn<Schema, Name>[] | UpsertManyUpdateValue<Schema, Name> | ((context: UpsertManyUpdateContext<Schema, Name>) => UpsertManyUpdateValue<Schema, Name>);
/**
 * Arguments for the `upsertMany` operation.
 *
 * Performs a native batch upsert using an explicit conflict target.
 * Designed for high-throughput write paths where a single statement is
 * preferred over repeated `upsert()` calls.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * const result = await db.user.upsertMany({
 *   data: [
 *     { id: 1, email: 'alice@example.com', name: 'Alice' },
 *     { id: 2, email: 'bob@example.com', name: 'Bob' },
 *   ],
 *   target: 'id',
 *   update: 'all',
 * });
 *
 * const projected = await db.user.upsertMany({
 *   data: [{ id: 1, email: 'alice@example.com', name: 'Alice Updated' }],
 *   target: ['email'],
 *   update: ['name'],
 *   select: { id: true, name: true },
 * });
 * ```
 */
interface UpsertManyArgs<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta, Generated extends string = never> {
  /** Rows to insert or update. */
  data: InsertInputFor<Schema, Name, Generated>[];
  /** Column or columns that define the conflict target. */
  target: UpsertManyTarget<Schema, Name>;
  /** Strategy used to build the update payload on conflict. */
  update: UpsertManyUpdateStrategy<Schema, Name>;
  /** Optional scalar projection for returned rows. */
  select?: ScalarSelectInput<Schema, Name>;
  /** Optional batch size for chunked native execution. */
  batchSize?: number;
  /** Optional condition on the existing row applied to the conflict update path. Not supported on MySQL. */
  where?: WhereArg<Schema, Name>;
  /** Custom metadata forwarded to hooks. */
  meta?: Meta;
  /** Block comment prefixed to every SQL statement this call runs, for tracing. */
  comment?: string;
}
type RepositoryKey<Schema extends AnySchema> = TableKey<Schema> | DbNameKey<Schema>;
type RepositorySourceKey<Schema extends AnySchema, Name extends RepositoryKey<Schema>> = Name extends TableKey<Schema> ? Name : SourceKeyFromDbName<Schema, Extract<Name, string>>;
type KeysOfUnion<T> = T extends unknown ? keyof T : never;
type NoExtraKeys<Value, Shape> = [Value] extends [never] ? unknown : Value extends SQLWrapper | Date ? unknown : Value extends readonly (infer Entry)[] ? NonNullable<Shape> extends readonly (infer ShapeEntry)[] ? readonly NoExtraKeys<Entry, ShapeEntry>[] : unknown : Value extends object ? { [K in Exclude<keyof Value, KeysOfUnion<NonNullable<Shape>>>]: never; } : unknown;
type ProjectionKey = 'include' | 'select';
type HasDefinedKey<Value, Key extends PropertyKey> = Key extends keyof Value ? [Exclude<Value[Key], undefined>] extends [never] ? false : true : false;
type HasSelectAndInclude<Value> = [Value] extends [never] ? false : Value extends SQLWrapper | readonly unknown[] ? false : Value extends object ? HasDefinedKey<Value, 'select'> extends true ? HasDefinedKey<Value, 'include'> : true extends { [K in Extract<keyof Value, ProjectionKey>]: { [Relation in keyof Value[K]]: HasSelectAndInclude<Value[K][Relation]>; }[keyof Value[K]]; }[Extract<keyof Value, ProjectionKey>] ? true : false : false;
/**
 * Restores the checks TypeScript skips for inferred generic arguments:
 * unknown keys at the top level and inside `where`, `data`, `create`,
 * `update`, `select`, `include`, and `orderBy` are rejected, and `select`
 * and `include` cannot appear together at any relation level.
 */
type ArgsCheck<Args, Base> = [Base] extends [Args] ? unknown : NoExtraKeys<Args, Base> & (HasSelectAndInclude<Args> extends true ? {
  include: 'select and include cannot be used together at the same relation level';
} : unknown) & { [K in Extract<keyof Args, 'create' | 'data' | 'include' | 'orderBy' | 'select' | 'update' | 'where'>]?: NoExtraKeys<Args[K], K extends KeysOfUnion<Base> ? Base extends unknown ? K extends keyof Base ? Base[K] : never : never : never>; };
type BetterDrizzleClientExtensionShape = Record<string, unknown>;
/**
 * Signature of `client.extends(...)`, returning the extended client type.
 * Extension keys that override an existing client key are a type error.
 */
type BetterDrizzleExtendsMethod<Client> = <Extension extends BetterDrizzleClientExtensionShape & { [K in keyof Client]?: never; }>(extension: Extension | ((client: Client) => Extension | undefined)) => ExtendedClient<Client, Extension>;
type TransactionParamsOf<Client> = Client extends {
  transaction: (...args: infer Params) => unknown;
} ? Params : never;
type TransactionClientOf<Client> = Parameters<Extract<TransactionParamsOf<Client>[0], (tx: never) => unknown>>[0];
type TransactionOptionsOf<Client> = NonNullable<TransactionParamsOf<Client>[1]>;
type ScopedMetaOf<Client> = Client extends {
  $withContext(meta: infer Meta): unknown;
} ? Meta : never;
/**
 * A client plus an extension. The runtime reapplies extensions to
 * `$withContext()` clones, transaction clients, and later `extends()` calls,
 * so all of them keep the extension type.
 */
type ExtendedClient<Client, Extension> = Omit<Client, '$withContext' | 'extends' | 'transaction'> & Extension & {
  extends: BetterDrizzleExtendsMethod<ExtendedClient<Client, Extension>>;
  $withContext(meta: ScopedMetaOf<Client>): ExtendedClient<Client, Extension>;
  transaction<T>(callback: (tx: ExtendedClient<TransactionClientOf<Client>, Extension>) => Promise<T> | T, options?: TransactionOptionsOf<Client>): Promise<T>;
};
/**
 * A client without the `Hidden` table keys; `Repository` replaces its
 * `repository()` accessor. `$withContext()`, `extends()`, and transaction
 * clients derived from it hide the same keys.
 */
type StrictClient<Client, Hidden extends PropertyKey, Repository> = Omit<Client, Hidden | '$withContext' | 'extends' | 'repository' | 'transaction'> & Repository & {
  extends: BetterDrizzleExtendsMethod<StrictClient<Client, Hidden, Repository>>;
  $withContext(meta: ScopedMetaOf<Client>): StrictClient<Client, Hidden, Repository>;
  transaction<T>(callback: (tx: StrictClient<TransactionClientOf<Client>, Hidden, Repository>) => Promise<T> | T, options?: TransactionOptionsOf<Client>): Promise<T>;
};
/** `repository()` accepting only the table keys and database names not hidden. */
type StrictRepository<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[], Hidden extends TableKey<Schema>> = {
  repository<Name extends Exclude<RepositoryKey<Schema>, Hidden | TableFor<Schema, Hidden>['_']['name']>>(name: Name): BetterDrizzleModelDelegate<Schema, RepositorySourceKey<Schema, Name>, Meta, Plugins>;
};
/**
 * The client type returned by {@link better}: {@link BetterDrizzleClient}
 * without the models plugins hide (the tenant plugin's `strict` option),
 * through properties and `repository()`.
 */
type BetterRootClient<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = []> = [HiddenModelsOf<Plugins, Schema>] extends [never] ? BetterDrizzleClient<Schema, Meta, Plugins> : StrictClient<BetterDrizzleClient<Schema, Meta, Plugins>, HiddenModelsOf<Plugins, Schema>, StrictRepository<Schema, Meta, Plugins, HiddenModelsOf<Plugins, Schema>>>;
/**
 * The fully-typed client returned by {@link better}. Provides a delegate for
 * every table in the schema plus a unified `repository()` accessor.
 *
 * Each table key (e.g. `db.user`) exposes a {@link BetterDrizzleModelDelegate}
 * with all CRUD and query methods. The client also provides raw SQL helpers
 * (`$raw`, `$executeRaw`, `$rawUnsafe`), a `transaction()` method, and a
 * `repository()` accessor for dynamic table lookups.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple provided via `options.plugins`.
 *
 * @example
 * ```ts
 * import { better } from 'better-drizzle';
 * import { drizzle } from 'drizzle-orm/better-sqlite3';
 * import { relations } from './relations';
 *
 * const raw = drizzle('file:local.db', { relations });
 * const db = better(raw);
 *
 * // Direct table access
 * const users = await db.user.findMany({ where: { active: true } });
 *
 * // Dynamic repository lookup
 * const repo = db.repository('user');
 * const user = await repo.findFirst({ where: { id: 1 } });
 * ```
 */
type BetterDrizzleClient<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = []> = BetterDrizzleClientByTableWithPlugins<Schema, Meta, Plugins> & ClientExtensionsOf<Plugins, Schema, Meta> & {
  /**
   * Extends the current client with custom properties and helper methods.
   *
   * The same extension is reapplied to future `$withContext()` and
   * `transaction()` clients derived from this instance.
   *
   * Pass a plain object for static values, or a callback when the extension
   * needs to close over the bound client instance.
   */
  extends: BetterDrizzleExtendsMethod<BetterDrizzleClient<Schema, Meta, Plugins>>;
  /**
   * Returns a cloned client with default metadata merged into every
   * operation, raw query, and transaction created from it.
   *
   * Per-call `meta` values override matching keys from this scoped context.
   *
   * @param meta - Default metadata to merge into subsequent calls.
   * @returns A new client bound to the merged scoped metadata.
   */
  $withContext(meta: Partial<Meta>): BetterDrizzleClient<Schema, Meta, Plugins>;
  /**
   * Executes a safe raw SQL query and returns rows.
   *
   * Accepts a tagged template literal or a Drizzle `sql` object.
   * Raw queries bypass model transforms and CRUD hooks.
   *
   * @typeParam Row - The expected row shape.
   * @param query - A tagged template or Drizzle SQL object.
   * @param params - Interpolated values when using a tagged template.
   * @returns A promise resolving to an array of rows.
   *
   * @example
   * ```ts
   * // Tagged template
   * const rows = await db.$raw`SELECT * FROM users WHERE id = ${1}`;
   *
   * // Drizzle sql object
   * import { sql } from 'drizzle-orm';
   * const rows = await db.$raw(sql`SELECT * FROM users WHERE id = ${1}`);
   * ```
   */
  $raw<Row = unknown>(query: TemplateStringsArray, ...params: unknown[]): Promise<Row[]>;
  /**
   * Executes a safe raw SQL query and returns rows.
   *
   * @typeParam Row - The expected row shape.
   * @param query - A Drizzle SQL object or SQLWrapper.
   * @returns A promise resolving to an array of rows.
   *
   * @example
   * ```ts
   * import { sql } from 'drizzle-orm';
   * const rows = await db.$raw<{ id: number }>(sql`SELECT id FROM users`);
   * ```
   */
  $raw<Row = unknown>(query: RawSql): Promise<Row[]>;
  /**
   * Executes a safe raw SQL query and returns mapped rows.
   *
   * @typeParam Row - The raw row shape from the driver.
   * @typeParam Mapped - The output row shape after mapping.
   * @param query - A Drizzle SQL object or SQLWrapper.
   * @param options - Raw options including a `map` function.
   * @returns A promise resolving to an array of mapped rows.
   *
   * @example
   * ```ts
   * import { sql } from 'drizzle-orm';
   * const users = await db.$raw(
   *   sql`SELECT * FROM users`,
   *   { map: (row) => ({ ...row, name: row.name.toUpperCase() }) },
   * );
   * ```
   */
  $raw<Row = unknown, Mapped = Row>(query: RawSql, options: RawOptions<Row, Mapped, Meta>): Promise<Mapped[]>;
  /**
   * Executes a safe raw SQL statement (INSERT, UPDATE, DELETE) and
   * returns a normalized result with `rowsAffected`.
   *
   * @param query - A tagged template or Drizzle SQL object.
   * @param params - Interpolated values when using a tagged template.
   * @returns A promise resolving to `{ rowsAffected: number }`.
   *
   * @example
   * ```ts
   * const result = await db.$executeRaw`UPDATE users SET active = ${true}`;
   * console.log(result.rowsAffected);
   * ```
   */
  $executeRaw(query: TemplateStringsArray, ...params: unknown[]): Promise<RawExecutionResult>;
  /**
   * Executes a safe raw SQL statement and returns a normalized result.
   *
   * @param query - A Drizzle SQL object or SQLWrapper.
   * @param options - Optional raw options.
   * @returns A promise resolving to `{ rowsAffected: number }`.
   *
   * @example
   * ```ts
   * import { sql } from 'drizzle-orm';
   * const result = await db.$executeRaw(sql`DELETE FROM users WHERE active = false`);
   * ```
   */
  $executeRaw(query: RawSql, options?: RawOptions<unknown, unknown, Meta>): Promise<RawExecutionResult>;
  /**
   * Executes a raw SQL string with optional parameter bindings.
   *
   * **Requires** `raw.allowUnsafe: true` in the client options.
   * Use `?` placeholders for parameters.
   *
   * @typeParam Row - The expected row shape.
   * @param query - A raw SQL string with `?` placeholders.
   * @param params - Parameter values to bind.
   * @returns A promise resolving to an array of rows.
   *
   * @example
   * ```ts
   * const users = await db.$rawUnsafe('SELECT * FROM users WHERE id = ?', [1]);
   * ```
   */
  $rawUnsafe<Row = unknown>(query: string, params?: unknown[]): Promise<Row[]>;
  /**
   * Executes a raw SQL string and returns mapped rows.
   *
   * @typeParam Row - The raw row shape from the driver.
   * @typeParam Mapped - The output row shape after mapping.
   * @param query - A raw SQL string with `?` placeholders.
   * @param params - Parameter values to bind.
   * @param options - Raw options including a `map` function.
   * @returns A promise resolving to an array of mapped rows.
   *
   * @example
   * ```ts
   * const users = await db.$rawUnsafe(
   *   'SELECT * FROM users WHERE id = ?',
   *   [1],
   *   { map: (row) => ({ ...row, name: row.name.toUpperCase() }) },
   * );
   * ```
   */
  $rawUnsafe<Row = unknown, Mapped = Row>(query: string, params: unknown[] | undefined, options: RawOptions<Row, Mapped, Meta>): Promise<Mapped[]>;
  /**
   * Runs the callback inside a database transaction and returns its result.
   *
   * The transaction client passed to the callback is a full
   * {@link BetterDrizzleTransactionClient} with `transaction()`, `rollback()`,
   * `afterCommit()`, and `afterRollback()` methods.
   *
   * Nested calls create savepoints automatically.
   *
   * @typeParam T - The return type of the callback.
   * @param callback - A function receiving the transaction client.
   * @param options - Optional transaction options (isolation, retries, timeout, etc.).
   * @returns A promise resolving to the callback's return value.
   *
   * @example
   * ```ts
   * const result = await db.transaction(async (tx) => {
   *   const user = await tx.user.findFirst({ where: { id: 1 } });
   *   await tx.user.update({ where: { id: 1 }, data: { active: false } });
   *   return user;
   * });
   *
   * // With options
   * await db.transaction(async (tx) => {
   *   // ...
   * }, { isolationLevel: 'serializable', timeoutMs: 5000 });
   * ```
   */
  transaction<T>(callback: (tx: BetterDrizzleTransactionClient<Schema, Meta, Plugins>) => Promise<T> | T, options?: TransactionOptions & {
    meta?: Meta;
  }): Promise<T>;
  /**
   * Registers a callback to run after the active transaction commits.
   * On the root client, outside a transaction, it throws the explicit
   * Better Drizzle error; use `tx.afterCommit()` inside `transaction()`.
   */
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  /**
   * Registers a callback to run after the active transaction rolls back.
   * On the root client, outside a transaction, it throws the explicit
   * Better Drizzle error; use `tx.afterRollback()` inside `transaction()`.
   */
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  /**
   * Retrieves the model delegate for the given repository name.
   *
   * The name can be either the TypeScript table key (e.g. `"user"`)
   * or the database table name (e.g. `"users"`). Throws if no
   * matching repository is found.
   *
   * @typeParam Name - The table key or database name to resolve.
   * @param name - Table key or database name.
   * @returns The model delegate for the specified table.
   *
   * @example
   * ```ts
   * // By TypeScript key
   * const userRepo = db.repository('user');
   * await userRepo.create({ data: { name: 'Alice' } });
   *
   * // By database name
   * const userRepo = db.repository('users');
   * await userRepo.findMany();
   * ```
   */
  repository<Name extends RepositoryKey<Schema>>(name: Name): BetterDrizzleModelDelegate<Schema, RepositorySourceKey<Schema, Name>, Meta, Plugins>;
};
type BetterDrizzleClientByTableWithPlugins<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[]> = { [K in TableKey<Schema>]: BetterDrizzleModelDelegate<Schema, K, Meta, Plugins>; };
/**
 * Model delegate providing all CRUD and query methods for a single table.
 * Each method is fully typed against the table's select/insert models and the
 * provided query arguments.
 *
 * Access delegates via direct table keys (e.g. `db.user`) or through
 * {@link BetterDrizzleClient.repository}.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 * @typeParam ModelExtension - Extra properties added by plugins via `extendModel`.
 *
 * @example
 * ```ts
 * const user = db.user;
 *
 * // CRUD
 * await user.create({ data: { name: 'Alice', email: 'alice@example.com' } });
 * await user.findMany({ where: { active: true } });
 * await user.update({ where: { id: 1 }, data: { name: 'Bob' } });
 * await user.delete({ where: { id: 1 } });
 *
 * // Batch operations
 * await user.createMany({ data: [{ name: 'A' }, { name: 'B' }] });
 * await user.updateEach({
 *   by: schema.users.id,
 *   data: [{ id: 1, active: false }],
 *   update: { active: (row) => row.active },
 * });
 * await user.updateMany({ data: { active: false } });
 * await user.deleteMany({ where: { role: 'guest' } });
 *
 * // Queries
 * await user.findFirst({ where: { email: 'alice@example.com' } });
 * await user.findUnique({ where: { id: 1 } });
 * await user.findOne({ where: { id: 1 } });
 * await user.count({ where: { active: true } });
 * await user.exists({ where: { email: 'test@example.com' } });
 * await user.paginate({ limit: 10, orderBy: { name: 'asc' } });
 *
 * // Upsert
 * await user.upsert({
 *   where: { id: 1 },
 *   create: { name: 'Alice', email: 'alice@example.com' },
 *   update: { name: 'Alice Updated' },
 * });
 * ```
 */
type BetterDrizzleModelDelegate<Schema extends AnySchema, Name extends TableKey<Schema>, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = [], ModelExtension extends Record<string, unknown> = ModelExtensionsOf<Plugins, Schema, Name, Meta>> = {
  /**
   * Internal model metadata useful for plugins.
   *
   * @property dbName - The database table name.
   * @property name - The TypeScript table key.
   * @method hasColumn - Checks whether a column exists on this table.
   */
  $model: {
    dbName: string;
    /** Checks whether a column with the given name exists on this table. */
    hasColumn(column: string): boolean;
    name: Name;
  };
  /**
   * Ephemeral plugin state carried by cloned delegates.
   *
   * Use `$withState()` to create a delegate with merged plugin state,
   * and `$withoutPlugins()` to bypass plugin hooks and transforms.
   */
  $state: PluginState;
  /**
   * Returns a cloned delegate with merged plugin state.
   *
   * Useful when plugins need to carry per-request or per-operation state
   * through the delegate without mutating the original.
   *
   * @param state - Plugin state to merge into the cloned delegate.
   * @returns A new delegate with the merged state.
   *
   * @example
   * ```ts
   * const traced = db.user.$withState({ traceId: 'abc-123' });
   * await traced.findMany(); // plugins can read traceId from state
   * ```
   */
  $withState(state: PluginState): BetterDrizzleModelDelegate<Schema, Name, Meta, Plugins, ModelExtension>;
  /**
   * Returns a cloned delegate that bypasses plugin hooks and transforms.
   *
   * Useful when you need to perform a raw operation without triggering
   * plugin logic (e.g. soft-delete filters). Model scopes declared by
   * plugins (for example a tenant) are dropped too unless `keepScopes` is set.
   *
   * @param options - `keepScopes: true` keeps the client's model scopes.
   * @returns A new delegate with all plugin hooks and transforms disabled.
   *
   * @example
   * ```ts
   * // Find all users, including soft-deleted ones
   * const allUsers = await db.user.$withoutPlugins().findMany();
   * ```
   */
  $withoutPlugins(options?: {
    keepScopes?: boolean;
  }): BetterDrizzleModelDelegate<Schema, Name, Meta, Plugins, ModelExtension>;
  /**
   * Compiles a typed `where` into a Drizzle `SQL` condition so it can be
   * reused in raw Drizzle queries, joins, and subqueries.
   *
   * Pure compilation: plugin filters (for example soft-delete visibility)
   * are not applied. Returns `undefined` for an empty `where`, which Drizzle
   * treats as no filter.
   *
   * @param where - The same `where` accepted by `findMany`.
   * @returns The compiled condition, or `undefined` when there is no filter.
   *
   * @example
   * ```ts
   * const rows = await db.select().from(users).where(client.users.$where({ id }));
   * ```
   */
  $where(where?: WhereArg<Schema, Name>): SQL | undefined;
  /**
   * Counts the number of matching rows.
   *
   * @param args - Optional filter and cursor arguments.
   * @returns A promise resolving to the count of matching rows.
   *
   * @example
   * ```ts
   * // Count all rows
   * const total = await db.user.count();
   *
   * // Count with filter
   * const activeCount = await db.user.count({
   *   where: { active: true },
   * });
   * ```
   */
  count<Args extends OperationArgsWithPlugins<CountArgs<Schema, Name, Meta>, Plugins, 'count'>>(args?: Args & NoInfer<OperationArgsWithPlugins<CountArgs<Schema, Name, Meta>, Plugins, 'count'> & ArgsCheck<Args, OperationArgsWithPlugins<CountArgs<Schema, Name, Meta>, Plugins, 'count'>>>): PreparableRead<number, Meta, Args>;
  /**
   * Returns `true` when at least one matching row exists.
   *
   * More efficient than `count` when you only need to check existence.
   *
   * @param args - Optional filter and cursor arguments.
   * @returns A promise resolving to `true` if a match exists, `false` otherwise.
   *
   * @example
   * ```ts
   * const hasAdmin = await db.user.exists({
   *   where: { role: 'admin' },
   * });
   * ```
   */
  exists<Args extends OperationArgsWithPlugins<ExistsArgs<Schema, Name, Meta>, Plugins, 'exists'>>(args?: Args & NoInfer<OperationArgsWithPlugins<ExistsArgs<Schema, Name, Meta>, Plugins, 'exists'> & ArgsCheck<Args, OperationArgsWithPlugins<ExistsArgs<Schema, Name, Meta>, Plugins, 'exists'>>>): PreparableRead<boolean, Meta, Args>;
  /**
   * Inserts a single row and returns the created record.
   *
   * When `skipDuplicates` is enabled, returns `null` if the insert was
   * skipped due to a duplicate conflict. By default, duplicate conflicts
   * throw.
   *
   * @param args - The row data and optional duplicate-skip/select/include options.
   * @returns A promise resolving to the created row, or `null` when
   *   `skipDuplicates` skips the insert.
   *
   * @example
   * ```ts
   * // Basic create
   * const user = await db.user.create({
   *   data: { name: 'Alice', email: 'alice@example.com' },
   * });
   *
   * // Create with conflict handling
   * const user = await db.user.create({
   *   data: { id: 1, name: 'Alice' },
   *   skipDuplicates: true,
   * });
   *
   * // Create with specific duplicate targets
   * const user = await db.user.create({
   *   data: { email: 'alice@example.com', name: 'Alice' },
   *   skipDuplicates: ['email'],
   * });
   *
   * // Create with relation inclusion
   * const user = await db.user.create({
   *   data: { name: 'Alice', email: 'alice@example.com' },
   *   include: { posts: true },
   * });
   * ```
   */
  create<Args extends OperationArgsWithPlugins<CreateArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'create'>>(args: Args & NoInfer<OperationArgsWithPlugins<CreateArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'create'> & ArgsCheck<Args, OperationArgsWithPlugins<CreateArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'create'>>>): Promise<Args extends {
    skipDuplicates: infer Skip;
  } ? Skip extends false | undefined ? PayloadForArgs<Schema, Name, Args> : PayloadForArgs<Schema, Name, Args> | null : PayloadForArgs<Schema, Name, Args>>;
  /**
   * Inserts multiple rows in a single statement, or one statement per
   * `batchSize` rows.
   *
   * Returns a `BatchResult` with `count` reflecting the number of rows
   * actually inserted. When `skipDuplicates` is enabled, skipped rows are not
   * counted.
   *
   * @param args - The array of row data and optional duplicate-skip/select/
   *   `batchSize` options.
   * @returns A promise resolving to `{ count, data? }`.
   *
   * @example
   * ```ts
   * const result = await db.user.createMany({
   *   data: [
   *     { name: 'Alice', email: 'alice@example.com' },
   *     { name: 'Bob', email: 'bob@example.com' },
   *   ],
   * });
   * console.log(result.count); // 2
   *
   * // With conflict handling
   * const result = await db.user.createMany({
   *   data: [{ name: 'Alice', email: 'alice@example.com' }],
   *   skipDuplicates: true,
   * });
   * ```
   */
  createMany<Args extends OperationArgsWithPlugins<CreateManyArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'createMany'>>(args: Args & NoInfer<OperationArgsWithPlugins<CreateManyArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'createMany'> & ArgsCheck<Args, OperationArgsWithPlugins<CreateManyArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'createMany'>>>): Promise<BatchResult<PayloadForArgs<Schema, Name, Args>>>;
  /**
   * Inserts a row if no match is found, otherwise updates it.
   *
   * Runs one native conflict-update statement (`ON CONFLICT DO UPDATE`, or
   * `ON DUPLICATE KEY UPDATE` on MySQL tables without another unique key)
   * when `where` pins the full primary key and `create` sets the same key
   * values. Otherwise it reads first, then updates or inserts in separate
   * statements, which is not atomic under concurrent writers.
   *
   * @param args - The where filter, create data, update data, and optional
   *   select/include options.
   * @returns A promise resolving to the inserted or updated row.
   *
   * @example
   * ```ts
   * const user = await db.user.upsert({
   *   where: { email: 'alice@example.com' },
   *   create: { name: 'Alice', email: 'alice@example.com', role: 'user' },
   *   update: { name: 'Alice Updated' },
   * });
   *
   * // With select
   * const user = await db.user.upsert({
   *   where: { email: 'alice@example.com' },
   *   create: { name: 'Alice', email: 'alice@example.com' },
   *   update: { name: 'Alice Updated' },
   *   select: { id: true, name: true },
   * });
   * ```
   */
  upsert<Args extends OperationArgsWithPlugins<UpsertArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'upsert'>>(args: Args & NoInfer<OperationArgsWithPlugins<UpsertArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'upsert'> & ArgsCheck<Args, OperationArgsWithPlugins<UpsertArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'upsert'>>>): Promise<PayloadForArgs<Schema, Name, Args>>;
  /**
   * Performs a native batch upsert against an explicit conflict target.
   *
   * Returns a `BatchResult` with `count` reflecting the number of rows
   * inserted or updated by the statement (on MySQL, the number of rows
   * sent). Supports `select`, but not relation `include`, to keep the hot
   * path as direct as possible.
   *
   * @param args - Batch upsert rows, conflict target, update strategy, and
   *   optional `select` / `batchSize` / `where` options.
   * @returns A promise resolving to `{ count, data? }`.
   *
   * @example
   * ```ts
   * const result = await db.user.upsertMany({
   *   data: [
   *     { id: 1, email: 'alice@example.com', name: 'Alice' },
   *     { id: 2, email: 'bob@example.com', name: 'Bob' },
   *   ],
   *   target: 'id',
   *   update: 'all',
   * });
   *
   * const projected = await db.user.upsertMany({
   *   data: [{ id: 1, email: 'alice@example.com', name: 'Alice Updated' }],
   *   target: ['email'],
   *   update: ['name'],
   *   select: { id: true, name: true },
   * });
   * ```
   */
  upsertMany<Args extends OperationArgsWithPlugins<UpsertManyArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'upsertMany'>>(args: Args & NoInfer<OperationArgsWithPlugins<UpsertManyArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'upsertMany'> & ArgsCheck<Args, OperationArgsWithPlugins<UpsertManyArgs<Schema, Name, Meta, GeneratedColumnsOf<Plugins, Schema, Name>>, Plugins, 'upsertMany'>>>): Promise<BatchResult<PayloadForArgs<Schema, Name, Args>>>;
  /**
   * Returns all matching rows.
   *
   * @param args - Optional filter, projection, ordering, and pagination arguments.
   * @returns A promise resolving to an array of matching rows.
   *
   * @example
   * ```ts
   * // All users
   * const users = await db.user.findMany();
   *
   * // With filter
   * const activeUsers = await db.user.findMany({
   *   where: { active: true },
   * });
   *
   * // With select (column projection)
   * const users = await db.user.findMany({
   *   select: { id: true, name: true },
   * });
   *
   * // With relations
   * const usersWithPosts = await db.user.findMany({
   *   include: { posts: true },
   * });
   *
   * // With ordering and pagination
   * const users = await db.user.findMany({
   *   where: { role: 'user' },
   *   orderBy: { name: 'asc' },
   *   take: 10,
   *   skip: 0,
   * });
   * ```
   */
  findMany<Args extends OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findMany'>>(args?: Args & NoInfer<OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findMany'> & ArgsCheck<Args, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findMany'>>>): PreparableRead<PayloadForArgs<Schema, Name, Args>[], Meta, Args>;
  /**
   * Updates at most one matching row (even when `where` matches several;
   * use `updateMany` for all) and returns the updated record.
   *
   * Returns a `ThrowingWriteResult` – if no row matches, calling `.throw()`
   * on the result will throw a `BetterDrizzleError`. Without `.throw()`,
   * the result resolves to `null` when no row is found.
   *
   * @param args - The where filter, partial data, and optional select/include.
   * @returns A throwing-aware promise resolving to the updated row or `null`.
   *
   * @example
   * ```ts
   * // Update and get result (null if not found)
   * const updated = await db.user.update({
   *   where: { id: 1 },
   *   data: { name: 'Bob' },
   * });
   *
   * // Update or throw if not found
   * const updated = await db.user.update({
   *   where: { id: 1 },
   *   data: { name: 'Bob' },
   * }).throw();
   *
   * // Update with select
   * const updated = await db.user.update({
   *   where: { id: 1 },
   *   data: { name: 'Bob' },
   *   select: { id: true, name: true },
   * });
   * ```
   */
  update<Args extends OperationArgsWithPlugins<UpdateArgs<Schema, Name, Meta>, Plugins, 'update'>>(args: Args & NoInfer<OperationArgsWithPlugins<UpdateArgs<Schema, Name, Meta>, Plugins, 'update'> & ArgsCheck<Args, OperationArgsWithPlugins<UpdateArgs<Schema, Name, Meta>, Plugins, 'update'>>>): ThrowingWriteResult<PayloadForArgs<Schema, Name, Args>>;
  /**
   * Updates all matching rows and returns the affected count and rows when supported.
   *
   * A `where` that is omitted or compiles to no condition is a no-op that
   * resolves to `{ count: 0 }`.
   * To update every row, pass a condition that matches every row, or use
   * Drizzle directly.
   *
   * @param args - Filter and partial data.
   * @returns A promise resolving to `{ count, data? }` with the affected rows.
   *
   * @example
   * ```ts
   * const result = await db.user.updateMany({
   *   where: { role: 'guest' },
   *   data: { active: false },
   * });
   * console.log(result.count);
   * ```
   */
  updateMany<Args extends OperationArgsWithPlugins<UpdateManyArgs<Schema, Name, Meta>, Plugins, 'updateMany'>>(args: Args & NoInfer<OperationArgsWithPlugins<UpdateManyArgs<Schema, Name, Meta>, Plugins, 'updateMany'> & ArgsCheck<Args, OperationArgsWithPlugins<UpdateManyArgs<Schema, Name, Meta>, Plugins, 'updateMany'>>>): Promise<BatchResult<PayloadForArgs<Schema, Name, Args>>>;
  /**
   * Updates multiple rows with different values in one statement.
   *
   * Uses the provided `by` column to build `CASE` expressions per updated
   * column. Supports scalar `select`, but not relation `include`.
   *
   * @param args - Match column, source rows, update callbacks, and optional
   *   `where` / `select` / `onEmpty` options.
   * @returns A promise resolving to `{ count, data? }`.
   */
  updateEach<Row extends UpdateEachRow<Schema, Name>, Args extends OperationArgsWithPlugins<UpdateEachArgs<Schema, Name, Meta, Row>, Plugins, 'updateEach'>>(args: Args & {
    data: Row[];
  } & NoInfer<OperationArgsWithPlugins<UpdateEachArgs<Schema, Name, Meta, Row>, Plugins, 'updateEach'> & ArgsCheck<Args, OperationArgsWithPlugins<UpdateEachArgs<Schema, Name, Meta, Row>, Plugins, 'updateEach'>>>): Promise<BatchResult<PayloadForArgs<Schema, Name, Args>>>;
  /**
   * Returns the first matching row (alias for {@link findFirst}).
   *
   * Returns a `ThrowingResult` – call `.throw()` to throw when no row is found.
   *
   * @param args - Optional filter, projection, ordering, and cursor arguments.
   * @returns A throwing-aware promise resolving to the first matching row or `null`.
   *
   * @example
   * ```ts
   * const user = await db.user.findOne({
   *   where: { email: 'alice@example.com' },
   * });
   *
   * // Or throw if not found
   * const user = await db.user.findOne({
   *   where: { email: 'alice@example.com' },
   * }).throw();
   * ```
   */
  findOne<Args extends OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findOne'>>(args?: Args & NoInfer<OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findOne'> & ArgsCheck<Args, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findOne'>>>): PreparableSingleRead<Schema, Name, Meta, Args>;
  /**
   * Returns the first matching row.
   *
   * Returns a `ThrowingResult` – call `.throw()` to throw when no row is found.
   *
   * @param args - Optional filter, projection, ordering, and cursor arguments.
   * @returns A throwing-aware promise resolving to the first matching row or `null`.
   *
   * @example
   * ```ts
   * const user = await db.user.findFirst({
   *   where: { role: 'admin' },
   *   orderBy: { createdAt: 'desc' },
   * });
   *
   * // Throw if not found
   * const user = await db.user.findFirst({
   *   where: { role: 'admin' },
   * }).throw();
   * ```
   */
  findFirst<Args extends OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findFirst'>>(args?: Args & NoInfer<OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findFirst'> & ArgsCheck<Args, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findFirst'>>>): PreparableSingleRead<Schema, Name, Meta, Args>;
  /**
   * Returns the row matching `where`, or `null` when none matches.
   *
   * `where` must pin one row: equality on every primary key column, on a
   * unique column, or on every column of a composite unique key (a
   * `param()` counts). Otherwise it throws `UNIQUE_WHERE_REQUIRED` before
   * any SQL, including for `.prepare()` and `.explain()`; an `undefined`
   * value does not pin. Returns a `ThrowingResult` – call `.throw()` to
   * throw when no row is found.
   *
   * @param args - Filter, projection, ordering, and cursor arguments.
   * @returns A throwing-aware promise resolving to the matching row or `null`.
   *
   * @example
   * ```ts
   * const user = await db.user.findUnique({
   *   where: { id: 1 },
   * });
   *
   * // Throw if not found
   * const user = await db.user.findUnique({
   *   where: { id: 1 },
   * }).throw();
   *
   * // With relations
   * const user = await db.user.findUnique({
   *   where: { id: 1 },
   *   include: { posts: true },
   * });
   * ```
   */
  findUnique<Args extends OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findUnique'>>(args: Args & NoInfer<OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findUnique'> & ArgsCheck<Args, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findUnique'>>>): PreparableSingleRead<Schema, Name, Meta, Args>;
  /**
   * Returns an offset-based paginated result set with page metadata.
   *
   * `page` + `perPage` are sugar for `skip` + `limit`; `page` cannot be
   * combined with `skip`.
   *
   * @param args - Offset pagination options (`page`, `perPage` / `limit`,
   *   `skip`) plus the usual query arguments.
   * @returns A promise resolving to `{ data, pagination }`.
   *
   * @example
   * ```ts
   * const {
   *   data,
   *   pagination: { total, pageCount, hasNext },
   * } = await db.user.paginate({
   *   page: 2,
   *   perPage: 10,
   *   orderBy: { name: 'asc' },
   * });
   * ```
   */
  paginate<Args extends OperationArgsWithPlugins<PaginationArgs<Schema, Name, Meta>, Plugins, 'paginate'>>(args: Args & NoInfer<OperationArgsWithPlugins<PaginationArgs<Schema, Name, Meta>, Plugins, 'paginate'> & ArgsCheck<Args, OperationArgsWithPlugins<PaginationArgs<Schema, Name, Meta>, Plugins, 'paginate'>>>): PreparableRead<OffsetPaginationResult<PayloadForArgs<Schema, Name, Args>>, Meta, Args>;
  /**
   * Returns a cursor-based result set with navigation cursors.
   *
   * Accepts either `after` or `before`, but never both. `nextCursor` /
   * `previousCursor` are raw objects holding the `orderBy` fields of the
   * last / first row, and can be passed back as `after` / `before`.
   *
   * @example
   * ```ts
   * const {
   *   data,
   *   pagination: { hasNext, nextCursor },
   * } = await db.user.cursor({ limit: 10, orderBy: { id: 'asc' } });
   * const { data: next } = await db.user.cursor({
   *   limit: 10,
   *   orderBy: { id: 'asc' },
   *   after: nextCursor,
   * });
   * ```
   */
  cursor<Args extends OperationArgsWithPlugins<CursorArgs<Schema, Name, Meta>, Plugins, 'cursor'>>(args: Args & NoInfer<OperationArgsWithPlugins<CursorArgs<Schema, Name, Meta>, Plugins, 'cursor'> & ArgsCheck<Args, OperationArgsWithPlugins<CursorArgs<Schema, Name, Meta>, Plugins, 'cursor'>>>): PreparableRead<CursorPaginationResult<PayloadForArgs<Schema, Name, Args>, CursorInput<Schema, Name>>, Meta, Args>;
  /**
   * Deletes at most one matching row (even when `where` matches several;
   * use `deleteMany` for all) and returns the deleted record.
   *
   * Returns a `ThrowingWriteResult` – call `.throw()` to throw when no row is found.
   *
   * @param args - The where filter and optional select/include options.
   * @returns A throwing-aware promise resolving to the deleted row or `null`.
   *
   * @example
   * ```ts
   * // Delete and get result
   * const deleted = await db.user.delete({
   *   where: { id: 1 },
   * });
   *
   * // Delete or throw if not found
   * const deleted = await db.user.delete({
   *   where: { id: 1 },
   * }).throw();
   *
   * // Delete with select
   * const deleted = await db.user.delete({
   *   where: { id: 1 },
   *   select: { id: true, name: true },
   * });
   * ```
   */
  delete<Args extends OperationArgsWithPlugins<DeleteArgs<Schema, Name, Meta>, Plugins, 'delete'>>(args: Args & NoInfer<OperationArgsWithPlugins<DeleteArgs<Schema, Name, Meta>, Plugins, 'delete'> & ArgsCheck<Args, OperationArgsWithPlugins<DeleteArgs<Schema, Name, Meta>, Plugins, 'delete'>>>): ThrowingWriteResult<PayloadForArgs<Schema, Name, Args>>;
  /**
   * Deletes all matching rows and returns the affected count and rows when supported.
   *
   * A `where` that is omitted or compiles to no condition (for example
   * `deleteMany({})`) is a no-op that resolves to `{ count: 0 }`.
   *
   * @param args - Filter for the rows to delete.
   * @returns A promise resolving to `{ count, data? }` with the deleted rows.
   *
   * @example
   * ```ts
   * const result = await db.user.deleteMany({
   *   where: { role: 'guest' },
   * });
   * console.log(result.count);
   * ```
   */
  deleteMany<Args extends OperationArgsWithPlugins<DeleteManyArgs<Schema, Name, Meta>, Plugins, 'deleteMany'>>(args: Args & NoInfer<OperationArgsWithPlugins<DeleteManyArgs<Schema, Name, Meta>, Plugins, 'deleteMany'> & ArgsCheck<Args, OperationArgsWithPlugins<DeleteManyArgs<Schema, Name, Meta>, Plugins, 'deleteMany'>>>): Promise<BatchResult<PayloadForArgs<Schema, Name, Args>>>;
} & ModelExtension;
/**
 * Extracts the relational configuration for a specific table from the schema.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type BetterTableConfig<Schema extends AnySchema, Name extends TableKey<Schema>> = TableConfigFor<Schema, Name>;
/**
 * Union of all valid table keys in the schema.
 *
 * Use this to constrain generic parameters that accept a table name.
 *
 * @typeParam Schema - The Drizzle schema type.
 *
 * @example
 * ```ts
 * type TableName = BetterTableKey<typeof relations>; // 'user' | 'post' | ...
 * ```
 */
type BetterTableKey<Schema extends AnySchema> = TableKey<Schema>;
/**
 * Singularised alias of each table key in the schema. For example,
 * `"users"` becomes `"user"`.
 *
 * @typeParam Schema - The Drizzle schema type.
 */
type BetterAliasKey<Schema extends AnySchema> = AliasKey<Schema>;
/**
 * Valid repository keys: either the TypeScript table key or the database name.
 *
 * @typeParam Schema - The Drizzle schema type.
 *
 * @example
 * ```ts
 * type Keys = BetterRepositoryKey<typeof relations>; // 'user' | 'users' | ...
 * ```
 */
type BetterRepositoryKey<Schema extends AnySchema> = RepositoryKey<Schema>;
/**
 * Extracts the relations map for a specific table.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 */
type BetterTableRelations<Schema extends AnySchema, Name extends TableKey<Schema>> = TableConfigFor<Schema, Name>['relations'];
/**
 * Alias for the underlying Drizzle `TableRelationalConfig` type.
 */
type BetterRelationalConfig = TableRelationalConfig;
/**
 * The select model (row type) for a specific table. This is the shape
 * of a row returned from queries on the given table.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Name - The table key within the schema.
 *
 * @example
 * ```ts
 * type UserRow = BetterRecord<typeof relations, 'user'>;
 * // { id: number; name: string; email: string; ... }
 * ```
 */
type BetterRecord<Schema extends AnySchema, Name extends TableKey<Schema>> = SelectModelFor<Schema, Name>;
//#endregion
//#region src/types/hooks.d.ts
/** Action names for query (read) operations. */
type QueryHookAction = 'findMany' | 'findFirst' | 'findOne' | 'findUnique' | 'count' | 'exists' | 'paginate' | 'cursor';
/** Action names for create-oriented operations. */
type CreateHookAction = 'create' | 'createMany' | 'upsert' | 'upsertMany';
/** Action names for update-oriented operations. */
type UpdateHookAction = 'update' | 'updateEach' | 'updateMany' | 'upsert';
/** Action names for delete-oriented operations. */
type DeleteHookAction = 'delete' | 'deleteMany';
/** Union of all CRUD and query hook action names. */
type HookAction = QueryHookAction | CreateHookAction | UpdateHookAction | DeleteHookAction;
/** Action names for raw SQL operations. */
type RawHookAction = 'raw' | 'executeRaw' | 'rawUnsafe';
/** Lifecycle stage within a hook execution. */
type HookStage = 'beforeHook' | 'afterHook' | 'operation';
type HookBaseContext<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Args, Action extends HookAction> = {
  action: Action;
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  /** Values recorded by plugin intercepts; set on after hooks only. */
  annotations?: Readonly<Record<string, unknown>>;
  args: Args;
  /**
   * The call's `comment` at the time the hook runs. Before hooks and plugin
   * transforms change it by setting `args.comment`.
   */
  comment?: string;
  db: unknown;
  isInTransaction: boolean;
  meta: Meta | undefined;
  options: BetterClientOptions<Schema, Meta, Plugins>;
  repository: BetterDrizzleModelDelegate<Schema, Name, Meta, Plugins>;
  schema: Schema;
  table: Name;
  tableConfig: BetterTableConfig<Schema, Name>;
  tableInstance: TableFor<Schema, Name>;
  transaction: BetterDrizzleTransactionClient<Schema, Meta, Plugins> | null;
  transactionContext: Record<string, unknown> | undefined;
};
type TransactionHookBaseContext<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[]> = {
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  attempt: number;
  client: BetterDrizzleTransactionClient<Schema, Meta, Plugins>;
  comment?: string;
  db: unknown;
  depth: number;
  isInTransaction: true;
  meta: Meta | undefined;
  name?: string;
  options: BetterClientOptions<Schema, Meta, Plugins>;
  schema: Schema;
  transactionContext: Record<string, unknown> | undefined;
  transactionOptions: TransactionOptions & {
    meta?: Meta;
  };
};
type RawHookBaseContext<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[], Action extends RawHookAction, Result> = {
  action: Action;
  afterCommit(callback: () => unknown | Promise<unknown>): void;
  afterRollback(callback: () => unknown | Promise<unknown>): void;
  comment?: string;
  db: unknown;
  error?: unknown;
  isInTransaction: boolean;
  map?: RawOptions<unknown, unknown, Meta>['map'];
  meta: Meta | undefined;
  name?: string;
  options: BetterClientOptions<Schema, Meta, Plugins>;
  query: string;
  rawOptions: RawOptions<unknown, unknown, Meta>;
  result: Result;
  schema: Schema;
  signal?: AbortSignal;
  sql?: unknown;
  timeoutMs?: number;
  transaction: BetterDrizzleTransactionClient<Schema, Meta, Plugins> | null;
  transactionContext: Record<string, unknown> | undefined;
};
type CreateHookArgsForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends CreateHookAction> = Action extends 'createMany' ? OperationArgsWithPlugins<CreateManyArgs<Schema, Name, Meta>, Plugins, 'createMany'> : Action extends 'upsertMany' ? OperationArgsWithPlugins<UpsertManyArgs<Schema, Name, Meta>, Plugins, 'upsertMany'> : OperationArgsWithPlugins<CreateArgs<Schema, Name, Meta>, Plugins, Action>;
type CreateHookResultForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends CreateHookAction> = Action extends 'createMany' | 'upsertMany' ? BatchResult<PayloadForArgs<Schema, Name, CreateHookArgsForAction<Schema, Name, Meta, Plugins, Action>>> : PayloadForArgs<Schema, Name, CreateHookArgsForAction<Schema, Name, Meta, Plugins, Action>>;
type UpdateHookArgsForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends UpdateHookAction> = Action extends 'updateMany' ? OperationArgsWithPlugins<UpdateManyArgs<Schema, Name, Meta>, Plugins, 'updateMany'> : Action extends 'updateEach' ? OperationArgsWithPlugins<UpdateEachArgs<Schema, Name, Meta>, Plugins, 'updateEach'> : Action extends 'upsert' ? OperationArgsWithPlugins<UpdateArgs<Schema, Name, Meta>, Plugins, 'upsert'> : OperationArgsWithPlugins<UpdateArgs<Schema, Name, Meta>, Plugins, 'update'>;
type UpdateHookResultForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends UpdateHookAction> = Action extends 'updateMany' | 'updateEach' ? BatchResult<PayloadForArgs<Schema, Name, UpdateHookArgsForAction<Schema, Name, Meta, Plugins, Action>>> : PayloadForArgs<Schema, Name, UpdateHookArgsForAction<Schema, Name, Meta, Plugins, Action>> | null;
type DeleteHookArgsForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends DeleteHookAction> = Action extends 'deleteMany' ? OperationArgsWithPlugins<DeleteManyArgs<Schema, Name, Meta>, Plugins, 'deleteMany'> : OperationArgsWithPlugins<DeleteArgs<Schema, Name, Meta>, Plugins, 'delete'>;
type DeleteHookResultForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends DeleteHookAction> = Action extends 'deleteMany' ? BatchResult<PayloadForArgs<Schema, Name, DeleteHookArgsForAction<Schema, Name, Meta, Plugins, Action>>> : PayloadForArgs<Schema, Name, DeleteHookArgsForAction<Schema, Name, Meta, Plugins, Action>> | null;
type QueryHookArgsForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends QueryHookAction> = Action extends 'count' ? OperationArgsWithPlugins<CountArgs<Schema, Name, Meta>, Plugins, 'count'> : Action extends 'exists' ? OperationArgsWithPlugins<ExistsArgs<Schema, Name, Meta>, Plugins, 'exists'> : Action extends 'cursor' ? OperationArgsWithPlugins<CursorArgs<Schema, Name, Meta>, Plugins, 'cursor'> : Action extends 'paginate' ? OperationArgsWithPlugins<PaginationArgs<Schema, Name, Meta>, Plugins, 'paginate'> : OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, Action>;
type QueryHookResultForAction<Schema extends AnySchema, Name extends TableKey<Schema>, Meta, Plugins extends readonly AnyPlugin[], Action extends QueryHookAction> = Action extends 'findMany' ? PayloadForArgs<Schema, Name, QueryHookArgsForAction<Schema, Name, Meta, Plugins, Action>>[] : Action extends 'findFirst' | 'findOne' | 'findUnique' ? PayloadForArgs<Schema, Name, QueryHookArgsForAction<Schema, Name, Meta, Plugins, Action>> | null : Action extends 'count' ? number : Action extends 'exists' ? boolean : Action extends 'cursor' ? CursorPaginationResult<PayloadForArgs<Schema, Name, QueryHookArgsForAction<Schema, Name, Meta, Plugins, Action>>, CursorInput<Schema, Name>> : OffsetPaginationResult<PayloadForArgs<Schema, Name, QueryHookArgsForAction<Schema, Name, Meta, Plugins, Action>>>;
type CreateHookContext<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[], Action extends CreateHookAction> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, CreateHookArgsForAction<Schema, Name, Meta, Plugins, Action>, Action> & {
  compiled?: Readonly<Record<string, unknown>>;
  result: CreateHookResultForAction<Schema, Name, Meta, Plugins, Action>;
  row?: Action extends 'createMany' | 'upsertMany' ? never : CreateHookResultForAction<Schema, Name, Meta, Plugins, Action>;
}; }[TableKey<Schema>];
type UpdateHookContext<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[], Action extends UpdateHookAction> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, UpdateHookArgsForAction<Schema, Name, Meta, Plugins, Action>, Action> & {
  compiled?: Readonly<Record<string, unknown>>;
  result: UpdateHookResultForAction<Schema, Name, Meta, Plugins, Action>;
  row?: Action extends 'updateEach' | 'updateMany' ? never : UpdateHookResultForAction<Schema, Name, Meta, Plugins, Action>;
}; }[TableKey<Schema>];
type DeleteHookContext<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[], Action extends DeleteHookAction> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, DeleteHookArgsForAction<Schema, Name, Meta, Plugins, Action>, Action> & {
  result: DeleteHookResultForAction<Schema, Name, Meta, Plugins, Action>;
  row?: Action extends 'deleteMany' ? never : DeleteHookResultForAction<Schema, Name, Meta, Plugins, Action>;
}; }[TableKey<Schema>];
type QueryHookContext<Schema extends AnySchema, Meta, Plugins extends readonly AnyPlugin[], Action extends QueryHookAction> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, QueryHookArgsForAction<Schema, Name, Meta, Plugins, Action>, Action> & {
  result: QueryHookResultForAction<Schema, Name, Meta, Plugins, Action>;
  row?: Action extends 'findFirst' | 'findOne' | 'findUnique' ? QueryHookResultForAction<Schema, Name, Meta, Plugins, Action> : never;
  rows?: Action extends 'findMany' ? QueryHookResultForAction<Schema, Name, Meta, Plugins, Action> : never;
}; }[TableKey<Schema>];
/**
 * Context available in create-oriented hooks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type BeforeCreateHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<CreateArgs<Schema, Name, Meta>, Plugins, 'create'>, 'create' | 'upsert'>; }[TableKey<Schema>] | { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<CreateManyArgs<Schema, Name, Meta>, Plugins, 'createMany'>, 'createMany'>; }[TableKey<Schema>] | { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<UpsertManyArgs<Schema, Name, Meta>, Plugins, 'upsertMany'>, 'upsertMany'>; }[TableKey<Schema>];
/**
 * Context available in the `afterCreate`, `afterCreateMany`, and
 * `afterCreate` (upsert) hooks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type AfterCreateHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = CreateHookContext<Schema, Meta, Plugins, 'create'> | CreateHookContext<Schema, Meta, Plugins, 'createMany'> | CreateHookContext<Schema, Meta, Plugins, 'upsert'> | CreateHookContext<Schema, Meta, Plugins, 'upsertMany'>;
/**
 * Context available in the `beforeUpdate` and `beforeUpdateMany` hooks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type BeforeUpdateHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<UpdateArgs<Schema, Name, Meta>, Plugins, 'update'>, 'update' | 'upsert'>; }[TableKey<Schema>] | { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<UpdateEachArgs<Schema, Name, Meta>, Plugins, 'updateEach'>, 'updateEach'>; }[TableKey<Schema>] | { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<UpdateManyArgs<Schema, Name, Meta>, Plugins, 'updateMany'>, 'updateMany'>; }[TableKey<Schema>];
/**
 * Context available in the `afterUpdate`, `afterUpdateMany`, and
 * `afterUpdate` (upsert) hooks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type AfterUpdateHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = UpdateHookContext<Schema, Meta, Plugins, 'update'> | UpdateHookContext<Schema, Meta, Plugins, 'updateEach'> | UpdateHookContext<Schema, Meta, Plugins, 'updateMany'> | UpdateHookContext<Schema, Meta, Plugins, 'upsert'>;
/**
 * Context available in the `beforeDelete` and `beforeDeleteMany` hooks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type BeforeDeleteHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<DeleteArgs<Schema, Name, Meta>, Plugins, 'delete'>, 'delete'>; }[TableKey<Schema>] | { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<DeleteManyArgs<Schema, Name, Meta>, Plugins, 'deleteMany'>, 'deleteMany'>; }[TableKey<Schema>];
/**
 * Context available in the `afterDelete` and `afterDeleteMany` hooks.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type AfterDeleteHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = DeleteHookContext<Schema, Meta, Plugins, 'delete'> | DeleteHookContext<Schema, Meta, Plugins, 'deleteMany'>;
/**
 * Context available in the `beforeQuery` hook (runs before any read operation).
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type BeforeQueryHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = { [Name in TableKey<Schema>]: HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findMany'>, 'findMany'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findFirst'>, 'findFirst'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findOne'>, 'findOne'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<QueryArgs<Schema, Name, Meta>, Plugins, 'findUnique'>, 'findUnique'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<CountArgs<Schema, Name, Meta>, Plugins, 'count'>, 'count'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<ExistsArgs<Schema, Name, Meta>, Plugins, 'exists'>, 'exists'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<PaginationArgs<Schema, Name, Meta>, Plugins, 'paginate'>, 'paginate'> | HookBaseContext<Schema, Name, Meta, Plugins, OperationArgsWithPlugins<CursorArgs<Schema, Name, Meta>, Plugins, 'cursor'>, 'cursor'>; }[TableKey<Schema>];
/**
 * Context available in the `afterQuery` hook (runs after any read operation).
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type AfterQueryHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = QueryHookContext<Schema, Meta, Plugins, 'findMany'> | QueryHookContext<Schema, Meta, Plugins, 'findFirst'> | QueryHookContext<Schema, Meta, Plugins, 'findOne'> | QueryHookContext<Schema, Meta, Plugins, 'findUnique'> | QueryHookContext<Schema, Meta, Plugins, 'count'> | QueryHookContext<Schema, Meta, Plugins, 'exists'> | QueryHookContext<Schema, Meta, Plugins, 'cursor'> | QueryHookContext<Schema, Meta, Plugins, 'paginate'>;
/**
 * Context passed to the `onError` hook whenever an operation or another hook
 * throws.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type ErrorHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = {
  /** The operation that triggered the error. */
  action: HookAction;
  /** The original arguments passed to the operation. */
  args: unknown;
  /** The underlying Drizzle database instance. */
  db: unknown;
  /** The error that was thrown. */
  error: unknown;
  /** The hook that triggered the error, if applicable. */
  hookName?: keyof BetterClientHooks<Schema, Meta, Plugins>;
  /** Custom metadata from the operation arguments. */
  meta: Meta | undefined;
  /** The client configuration. */
  options: BetterClientOptions<Schema, Meta, Plugins>;
  /** The full Drizzle schema object. */
  schema: Schema;
  /** The lifecycle stage where the error occurred. */
  stage: HookStage;
  /** The table key the operation was performed on. */
  table: BetterTableKey<Schema>;
  /** The relational configuration for the table. */
  tableConfig: BetterRelationalConfig;
  /** The Drizzle table instance. */
  tableInstance: import('drizzle-orm').Table;
};
/**
 * Context available in the `beforeTransaction` hook, fired before the
 * transaction callback executes.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type BeforeTransactionHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = TransactionHookBaseContext<Schema, Meta, Plugins>;
/**
 * Context available in the `afterTransactionCommit` hook, fired after a
 * transaction commits successfully.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type AfterTransactionCommitHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = TransactionHookBaseContext<Schema, Meta, Plugins>;
/**
 * Context available in the `afterTransactionRollback` hook, fired after a
 * transaction rolls back. Includes the optional rollback reason.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type AfterTransactionRollbackHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = TransactionHookBaseContext<Schema, Meta, Plugins> & {
  /** The reason the transaction was rolled back, if any. */
  reason?: unknown;
};
/**
 * Context available in the `onTransactionError` hook, fired when a
 * transaction callback throws an error. Includes the caught error.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 */
type TransactionErrorHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = TransactionHookBaseContext<Schema, Meta, Plugins> & {
  /** The error thrown by the transaction callback. */
  error: unknown;
};
/**
 * Context available in the `beforeRaw` hook.
 */
type BeforeRawHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = RawHookBaseContext<Schema, Meta, Plugins, RawHookAction, unknown>;
/**
 * Context available in the `afterRaw` hook.
 */
type AfterRawHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = RawHookBaseContext<Schema, Meta, Plugins, 'raw' | 'rawUnsafe', unknown[]> | RawHookBaseContext<Schema, Meta, Plugins, 'executeRaw', RawExecutionResult>;
/**
 * Context available in the `onRawError` hook.
 */
type RawErrorHookContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = RawHookBaseContext<Schema, Meta, Plugins, RawHookAction, unknown> & {
  error: unknown;
};
/**
 * Configuration object passed to {@link better}. Tables and relations are
 * read from the Drizzle instance (`drizzle({ client, relations })`); the
 * options hold plugins, lifecycle hooks, and runtime settings.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 *
 * @example
 * ```ts
 * import { better } from 'better-drizzle';
 * import { drizzle } from 'drizzle-orm/better-sqlite3';
 * import { relations } from './relations';
 *
 * const raw = drizzle('file:local.db', { relations });
 *
 * const db = better(raw, {
 *   plugins: [myPlugin],
 *   hooks: {
 *     beforeCreate(ctx) {
 *       console.log('Creating on table:', ctx.table);
 *     },
 *     afterQuery(ctx) {
 *       console.log('Query result:', ctx.result);
 *     },
 *   },
 *   raw: {
 *     enabled: true,
 *     allowUnsafe: false,
 *   },
 *   transaction: {
 *     unsupportedOptions: 'warn',
 *   },
 * });
 * ```
 */
interface BetterClientOptions<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> {
  /** Optional plugins to extend the client. */
  plugins?: Plugins;
  /** Optional transaction configuration. */
  transaction?: {
    /** How to handle dialect-unsupported transaction options. */
    unsupportedOptions?: TransactionUnsupportedOptionsBehavior;
  };
  /** Optional row lock configuration. */
  locks?: BetterLockClientOptions;
  /** Optional raw SQL configuration. */
  raw?: RawClientOptions;
  /** Default `comment` for every delegate call. A call's own `comment` replaces it. */
  comment?: string;
  /** Optional lifecycle hooks. */
  hooks?: BetterClientHooks<Schema, Meta, Plugins>;
}
/**
 * Lifecycle hooks that can be registered on the Better Drizzle client. Each
 * hook receives a rich context object with access to the schema, table
 * metadata, and the original operation arguments.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta - Custom metadata type. Defaults to {@link BetterMeta}.
 * @typeParam Plugins - The plugin tuple.
 *
 * @example
 * ```ts
 * const db = better(drizzle, {
 *   hooks: {
 *     beforeCreate(ctx) {
 *       console.log('Creating on:', ctx.table, ctx.args.data);
 *     },
 *     afterCreate(ctx) {
 *       console.log('Created:', ctx.result);
 *     },
 *     beforeQuery(ctx) {
 *       console.log('Querying:', ctx.table, ctx.action);
 *     },
 *     afterQuery(ctx) {
 *       console.log('Query result:', ctx.result);
 *     },
 *     onError(ctx) {
 *       console.error('Error in', ctx.action, ':', ctx.error);
 *     },
 *   },
 * });
 * ```
 */
interface BetterClientHooks<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> {
  /** Called before a single or batch create operation. */
  beforeCreate?(context: BeforeCreateHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after a single or batch create operation completes. */
  afterCreate?(context: AfterCreateHookContext<Schema, Meta, Plugins>): unknown;
  /** Called before a single or batch update operation. */
  beforeUpdate?(context: BeforeUpdateHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after a single or batch update operation completes. */
  afterUpdate?(context: AfterUpdateHookContext<Schema, Meta, Plugins>): unknown;
  /** Called before a single or batch delete operation. */
  beforeDelete?(context: BeforeDeleteHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after a single or batch delete operation completes. */
  afterDelete?(context: AfterDeleteHookContext<Schema, Meta, Plugins>): unknown;
  /** Called before any read (query) operation. */
  beforeQuery?(context: BeforeQueryHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after any read (query) operation completes. */
  afterQuery?(context: AfterQueryHookContext<Schema, Meta, Plugins>): unknown;
  /** Called before a transaction callback runs. */
  beforeTransaction?(context: BeforeTransactionHookContext<Schema, Meta, Plugins>): unknown;
  /** Called before any raw SQL query executes. */
  beforeRaw?(context: BeforeRawHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after a transaction commits successfully. */
  afterTransactionCommit?(context: AfterTransactionCommitHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after any raw SQL query completes. */
  afterRaw?(context: AfterRawHookContext<Schema, Meta, Plugins>): unknown;
  /** Called after a transaction rolls back. */
  afterTransactionRollback?(context: AfterTransactionRollbackHookContext<Schema, Meta, Plugins>): unknown;
  /** Called when any operation or hook throws an error. */
  onError?(context: ErrorHookContext<Schema, Meta, Plugins>): unknown;
  /** Called when a raw SQL query fails. */
  onRawError?(context: RawErrorHookContext<Schema, Meta, Plugins>): unknown;
  /** Called when a transaction callback fails. */
  onTransactionError?(context: TransactionErrorHookContext<Schema, Meta, Plugins>): unknown;
}
//#endregion
//#region src/types/runtime.d.ts
/**
 * Minimal shape of a Drizzle query delegate used for relational queries.
 * Matches the `db.query.TableName` interface exposed by Drizzle ORM.
 */
type DrizzleQueryDelegate = {
  /** Execute a relational query returning multiple rows. */
  findMany(config?: unknown): Promise<unknown[]> & {
    getSQL?(): SQL;
  };
  /** Execute a relational query returning a single row. */
  findFirst?(config?: unknown): Promise<unknown | undefined> & {
    getSQL?(): SQL;
  };
};
/**
 * Minimal shape of a Drizzle insert builder. Matches the fluent API
 * returned by `db.insert(table).values(data)` without depending on
 * Drizzle's internal types.
 */
type InsertBuilderLike = {
  /** Append a RETURNING clause to the insert statement. */
  returning?: (fields?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
  /** Append an ON CONFLICT DO NOTHING clause. */
  onConflictDoNothing?: (config?: {
    target?: AnyColumn | AnyColumn[];
  }) => InsertBuilderLike & Promise<unknown>;
  /** Append an ON CONFLICT DO UPDATE clause (PostgreSQL/SQLite). */
  onConflictDoUpdate?: (config: {
    set: Record<string, unknown>;
    target: AnyColumn | AnyColumn[];
    setWhere?: SQL;
    targetWhere?: SQL;
    where?: SQL;
  }) => InsertBuilderLike & Promise<unknown>;
  /** Append an ON DUPLICATE KEY UPDATE clause (MySQL). */
  onDuplicateKeyUpdate?: (config: {
    set: Record<string, unknown>;
  }) => InsertBuilderLike & Promise<unknown>;
};
/**
 * Minimal shape of a Drizzle update builder. The `set().where()` chain
 * resolves to a Promise-like that also exposes an optional `returning()`.
 */
type UpdateBuilderLike = Promise<unknown> & {
  /** Append a RETURNING clause to the update statement. */
  returning?: (fields?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
};
/**
 * Minimal shape of a Drizzle delete builder. The `where()` chain resolves
 * to a Promise-like that also exposes an optional `returning()`.
 */
type DeleteBuilderLike = Promise<unknown> & {
  /** Append a RETURNING clause to the delete statement. */
  returning?: (fields?: Record<string, unknown>) => Promise<Record<string, unknown>[]>;
};
/**
 * Minimal shape of a Drizzle select query. Represents the fluent chain
 * returned by `db.select().from(table)` with join, filter, and ordering
 * methods, resolving to a Promise of rows.
 */
type SelectQueryLike = SQL & Promise<Record<string, unknown>[]> & {
  /** Acquire a row-level lock on the result set (PostgreSQL/MySQL). */
  for?(strength: string, config?: unknown): SelectQueryLike;
  /** Perform an inner join with another table. */
  innerJoin(table: Table, on: unknown): SelectQueryLike;
  /** Perform a left join with another table. */
  leftJoin(table: Table, on: unknown): SelectQueryLike;
  /** Limit the number of returned rows. */
  limit(limit: number | SQLWrapper): SelectQueryLike;
  /** Skip a number of rows from the start. */
  offset(offset: number | SQLWrapper): SelectQueryLike;
  /** Sort the result set by one or more columns. */
  orderBy(...values: unknown[]): SelectQueryLike;
  /** Filter the result set with a WHERE clause. */
  where(where?: unknown): SelectQueryLike;
};
/**
 * Minimal shape of a Drizzle database instance. Matches the public API
 * surface used by Better Drizzle (`insert`, `update`, `delete`, `select`,
 * `query`, and optional `$count`) without importing Drizzle's internal types.
 */
type DrizzleLikeDatabase = {
  /** Dialect constructor info used for auto-detection. */
  dialect?: {
    constructor?: {
      name?: string;
    };
  };
  /** Relational query delegates keyed by table name. */
  query: Record<string, DrizzleQueryDelegate>;
  /** Execute a raw query and return all matching rows. */
  all?(query: SQL | SQLWrapper | string): Promise<unknown[]> | unknown[];
  /** Execute a raw query and return the result. */
  execute?(query: SQL | SQLWrapper | string): Promise<unknown> | unknown;
  /** Start an insert statement on the given table. */
  insert(table: Table): {
    /** MySQL-specific ignore variant. */
    ignore?(): {
      values(data: unknown): InsertBuilderLike & Promise<unknown>;
    };
    values(data: unknown): InsertBuilderLike & Promise<unknown>;
  };
  /** Start an update statement on the given table. */
  update(table: Table): {
    set(data: unknown): {
      where(where: unknown): UpdateBuilderLike;
    };
  };
  /** Start a delete statement on the given table. */
  delete(table: Table): {
    where(where: unknown): DeleteBuilderLike;
  };
  /** Start a select statement, optionally with specific fields. */
  select(selection?: Record<string, unknown>): {
    from(table: Table): SelectQueryLike;
  };
  /** Count rows in the given table (Drizzle optional method). */
  $count?(table: Table, filters?: unknown): Promise<number>;
  /** Execute a raw SQL statement (SQLite-specific). */
  run?(query: SQL): unknown;
  /** Open a database transaction. */
  transaction?<T>(callback: (tx: DrizzleLikeDatabase) => Promise<T> | T, config?: unknown): Promise<T>;
  /** Rollback the current transaction (SQLite-specific). */
  rollback?(): never;
};
/**
 * Runtime callback used to build user-defined client extensions for a bound
 * Better Drizzle client instance.
 */
type RuntimeClientExtensionFactory = (client: Record<string, unknown>) => Record<string, unknown> | undefined;
/**
 * Relational config exposed by the Drizzle instance (`db._.relations`). Used
 * internally to build the runtime table metadata map.
 */
type RuntimeSchema = Record<string, BetterRelationalConfig>;
/**
 * Precomputed per-table metadata used at runtime for query compilation,
 * relation resolution, and plugin operations.
 */
type TableRuntime = {
  /** Map of column name to Drizzle column instance. */
  columns: Record<string, AnyColumn>;
  /** The database table name. */
  dbName: string;
  /** Checks whether a column with the given name exists on this table. */
  hasColumn(column: string): boolean;
  /** Plugin model info descriptor for this table. */
  model: PluginModelInfo;
  /** Primary key columns. */
  primaryKey: AnyColumn[];
  /** Primary key column keys. */
  primaryKeyFields: string[];
  /** Map of relation name to resolved relation metadata. */
  relations: Record<string, {
    fields: AnyColumn[];
    kind: 'many' | 'manyToMany' | 'one';
    references: AnyColumn[];
    relation?: BetterRelationalConfig['relations'][string];
    sourceOwnsForeignKey: boolean;
    tableName: string;
    through?: {
      sourceFields: AnyColumn[];
      tableName: string;
      targetFields: AnyColumn[];
    };
  }>;
  /** Set of relation names defined on this table. */
  relationNames: Set<string>;
  /** Model scopes declared by plugins for this table; shared empty array when none. */
  scopes: readonly ScopeEntry[];
  /** The Drizzle table instance. */
  table: Table;
  /** The full relational config for this table. */
  tableConfig: BetterRelationalConfig;
  /** Unique keys (constraints and full unique indexes) as column keys. */
  uniqueKeys: string[][];
  /** Declared relations Better Drizzle cannot load, with the reason. */
  unsupportedRelations: Record<string, string>;
};
/**
 * A plugin scope definition paired with its resolved scope for one table.
 */
type ScopeEntry = {
  definition: PluginScopeDefinition;
  model: PluginScopeModel;
};
/**
 * Runtime signature for a plugin before-hook function. Receives the raw
 * hook context object and may return modified data or `undefined`.
 */
type PluginRuntimeBeforeHook = (context: Record<string, unknown>) => unknown;
/**
 * Runtime signature for a plugin after-hook function. Receives the raw
 * hook context including the operation result.
 */
type PluginRuntimeAfterHook = (context: Record<string, unknown>) => unknown;
/**
 * Runtime signature for a plugin transaction hook function. Receives the
 * raw transaction hook context object.
 */
type PluginRuntimeTransactionHook = (context: Record<string, unknown>) => unknown;
/**
 * Runtime signature for a plugin transform function. Receives the raw
 * operation input and may return a modified version or `undefined` to
 * skip the operation.
 */
type PluginRuntimeTransform = (operation: Record<string, unknown>) => Record<string, unknown> | undefined;
/**
 * Runtime signature for a plugin intercept. Receives the raw intercept
 * context and resolves to the operation result.
 */
type PluginRuntimeIntercept = (context: Record<string, unknown>) => Promise<unknown>;
/**
 * Bucket holding all plugin hooks and transforms for a specific operation
 * kind. Precomputed during initialization to avoid per-call iteration.
 */
type PluginRuntimeBucket = {
  /** Registered after-hook functions. */
  afterHooks: PluginRuntimeAfterHook[];
  /** Registered before-hook functions. */
  beforeHooks: PluginRuntimeBeforeHook[];
  /** `true` when at least one after-hook is registered. */
  hasAfterHooks: boolean;
  /** `true` when at least one before-hook is registered. */
  hasBeforeHooks: boolean;
  /** `true` when at least one intercept is registered. */
  hasIntercepts: boolean;
  /** `true` when at least one transform is registered. */
  hasTransforms: boolean;
  /** Registered intercepts, outermost first. */
  intercepts: PluginRuntimeIntercept[];
  /** Registered transform functions. */
  transforms: PluginRuntimeTransform[];
};
/**
 * Bucket holding all plugin transaction hooks. Precomputed during
 * initialization to avoid per-call iteration.
 */
type PluginRuntimeTransactionBucket = {
  /** Registered after-commit hook functions. */
  afterCommitHooks: PluginRuntimeTransactionHook[];
  /** Registered after-rollback hook functions. */
  afterRollbackHooks: PluginRuntimeTransactionHook[];
  /** Registered before-transaction hook functions. */
  beforeHooks: PluginRuntimeTransactionHook[];
  /** Registered on-transaction-error hook functions. */
  errorHooks: PluginRuntimeTransactionHook[];
};
/**
 * Bucket holding all plugin raw-query hooks. Precomputed during
 * initialization to avoid per-call iteration.
 */
type PluginRuntimeRawBucket = {
  /** Registered after-raw hook functions. */
  afterHooks: PluginRuntimeAfterHook[];
  /** Registered before-raw hook functions. */
  beforeHooks: PluginRuntimeBeforeHook[];
  /** Registered raw error hook functions. */
  errorHooks: PluginRuntimeAfterHook[];
};
/**
 * A callback function used in transaction lifecycle hooks (after-commit,
 * after-rollback). May return a value or a promise.
 */
type TransactionCallback = () => unknown | Promise<unknown>;
/**
 * Internal state for an active transaction. Tracks the nesting depth,
 * retry attempt number, abort signals, and queued lifecycle callbacks.
 */
type TransactionRuntime = {
  /** Error set by an abort signal, if the transaction was aborted. */
  abortError?: unknown;
  /** Callbacks queued to run after the transaction commits. */
  afterCommit: TransactionCallback[];
  /** Callbacks queued to run after the transaction rolls back. */
  afterRollback: TransactionCallback[];
  /** The current retry attempt number (1-indexed). */
  attempt: number;
  /** Optional comment attached to the transaction (PostgreSQL only). */
  comment?: string;
  /** Custom context object scoped to this transaction. */
  context?: Record<string, unknown>;
  /** Nesting depth (0 for root transactions, incremented for savepoints). */
  depth: number;
  /** Optional name for named savepoints. */
  name?: string;
  /** The original transaction options. */
  options: TransactionOptions;
  /** Reference to the parent transaction state, when nested. */
  parent?: TransactionRuntime;
  /** Scope state whose `session()` statements already ran in this transaction. */
  sessionScopes?: Readonly<Record<string, unknown>>;
};
/**
 * Internal runtime context built once during client initialization.
 * Carries the database handle, schema, precomputed table metadata,
 * plugin buckets, and configuration. Passed through all operations.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type RuntimeContext<Schema extends AnySchema, Meta = BetterMeta, Plugins extends readonly AnyPlugin[] = readonly AnyPlugin[]> = {
  /** The bound client or transaction client, set after initialization. */
  client: BetterDrizzleClient<Schema, Meta, Plugins> | BetterDrizzleTransactionClient<Schema, Meta, Plugins> | null;
  /** The raw Drizzle database instance. */
  db: DrizzleLikeDatabase;
  /** The detected SQL dialect (`'pg'`, `'sqlite'`, or `'mysql'`). */
  dialect: PluginDialect;
  /** `true` when at least one client-level hook is registered. */
  hasHooks: boolean;
  /** `true` when the `onError` client hook is registered. */
  hasOnError: boolean;
  /** `true` when at least one plugin is loaded. */
  hasPlugins: boolean;
  /** Per-model info descriptors keyed by table name. */
  models: Record<string, PluginModelInfo>;
  /** The client configuration provided to `better()`. */
  options: BetterClientOptions<Schema, Meta, any>;
  /** Default metadata merged into every scoped operation. */
  scopedMeta: Meta | undefined;
  /** Model scope state keyed by scope key; `undefined` when no plugin declares a scope. */
  scopes: Readonly<Record<string, unknown>> | undefined;
  /** Set by `$withoutPlugins()` on delegates whose scopes were dropped. */
  scopesDisabled: boolean;
  /** Set while an upsert runs: scopes with `upsert: false` are skipped. */
  upsertScopes?: true;
  /** Set while a write runs: root reads of this table match `nullable` scopes strictly. */
  writeScope?: TableRuntime;
  /** Precomputed plugin buckets and metadata. */
  plugins: {
    byKind: Record<PluginHookKind, PluginRuntimeBucket>;
    meta: PluginMeta[];
    raw: PluginRuntimeRawBucket;
    /** Scope definitions with `session()` statements; unset when none. */
    sessions?: readonly PluginScopeDefinition[];
    transaction: PluginRuntimeTransactionBucket;
  };
  /** The full Drizzle schema object. */
  fullSchema: Schema;
  /** The resolved relational schema from Drizzle. */
  relational: RuntimeSchema;
  /** Repository lookup map (TypeScript key and DB name -> delegate). */
  repositories: Record<string, unknown>;
  /** User-defined client extensions to reapply on derived clients. */
  clientExtensions: RuntimeClientExtensionFactory[];
  /** Precomputed per-table runtime metadata. */
  tables: Record<string, TableRuntime>;
  /** Active transaction state, or `null` outside a transaction. */
  transaction: TransactionRuntime | null;
};
/**
 * Extended runtime context used by the where-clause compiler. Includes
 * the base {@link RuntimeContext} plus per-query information such as
 * the current table's runtime metadata and root query arguments.
 *
 * @typeParam Schema - The Drizzle schema type.
 * @typeParam Meta   - Custom metadata type. Defaults to {@link BetterMeta}.
 */
type WhereCompilerContext<Schema extends AnySchema, Meta = BetterMeta> = RuntimeContext<Schema, Meta> & {
  /** The root query arguments passed by the caller (if any). */
  rootArgs?: QueryArgs<Schema, BetterTableKey<Schema>, Meta>;
  /** Runtime metadata for the table being queried. */
  runtime: TableRuntime;
  /** The database table name. */
  tableName: string;
  /**
   * The alias the relational query builder gives the current table when the
   * same query eager-loads relations (its schema key). Set only on the path
   * that runs through `db.query[...]`, so a correlated relation filter can
   * reference the parent through the alias the builder actually uses.
   */
  rootAlias?: string;
};
/**
 * A where-clause value that can be compiled into a Drizzle SQL expression.
 * Either a plain object (structured where input) or a raw Drizzle `SQL`
 * expression.
 */
type CompilableWhere = Record<string, unknown> | SQL;
/**
 * Promise that resolves to `T | null`. Used for single-row operations
 * that may not find a matching record.
 *
 * @typeParam T - The result type when a record is found.
 */
type NullableResult<T> = Promise<T | null>;
/**
 * Describes a foreign-key join between two columns. Used internally by
 * the query compiler to build join conditions.
 */
type JoinColumns = {
  /** Local columns that hold the foreign key values. */
  fields: AnyColumn[];
  /** Remote columns referenced by the foreign key. */
  references: AnyColumn[];
  /** The Drizzle table instance that owns the referenced columns. */
  referencedTable: Table;
};
//#endregion
export { BetterDrizzleClient as $, AnySchema as $n, CountArgs as $r, ModelRegistry as $t, AfterTransactionCommitHookContext as A, isUniqueViolation as Ai, PluginTransform as An, ScalarKeysFor as Ar, UpdateEachArgs as At, BetterClientOptions as B, RawClientOptions as Bn, TableKey as Br, UpsertManyTargetColumn as Bt, TransactionRuntime as C, DatabaseDriver as Ci, PluginScopeDefinition as Cn, QueryMode as Cr, StrictClient as Ct, AfterDeleteHookContext as D, isDatabaseError as Di, PluginTransactionErrorHookContext as Dn, RelationKeysFor as Dr, ThrowingWriteResult as Dt, AfterCreateHookContext as E, isCheckViolation as Ei, PluginState as En, RelationFor as Er, ThrowingResult as Et, BeforeQueryHookContext as F, TransactionIsolationLevel as Fn, SortOrder as Fr, UpsertArgs as Ft, HookStage as G, CursorPaginationOptions as Gn, PreparedParams as Gr, ClientExtensionOf as Gt, DeleteHookAction as H, RawOptions as Hn, PreparableResult as Hr, UpsertManyUpdateStrategy as Ht, BeforeRawHookContext as I, TransactionOptions as In, SourceKeyFromDbName as Ir, UpsertManyArgs as It, RawHookAction as J, OffsetPaginationOptions as Jn, PreparedSingleStatement as Jr, GeneratedColumnsOf as Jt, QueryHookAction as K, CursorPaginationResult as Kn, PreparedParamsFor as Kr, ClientExtensionTypeResolver as Kt, BeforeTransactionHookContext as L, TransactionRetryOptions as Ln, StringFilter as Lr, UpsertManyExcluded as Lt, AfterUpdateHookContext as M, definePlugin as Mn, SelectModelFor as Mr, UpdateEachUpdateMap as Mt, BeforeCreateHookContext as N, BetterDrizzleTransactionClient as Nn, Singularize as Nr, UpdateManyArgs as Nt, AfterQueryHookContext as O, isForeignKeyViolation as Oi, PluginTransactionHookContext as On, SafeKeys as Or, UpdateArgs as Ot, BeforeDeleteHookContext as P, BetterDrizzleTransactionRollbackError as Pn, SortConfig as Pr, UpdateScalarDataInput as Pt, BetterAliasKey as Q, AliasKey as Qn, BetterMeta as Qr, ModelExtensionsOf as Qt, BeforeUpdateHookContext as R, TransactionRetryReason as Rn, TableConfigFor as Rr, UpsertManyTableColumns as Rt, TransactionCallback as S, BetterDrizzleErrorOptions as Si, PluginRawHookContext as Sn, PgArrayKeysFor as Sr, SkipDuplicatesOption as St, WhereCompilerContext as T, getDatabaseErrorInfo as Ti, PluginSetupContext as Tn, RelatedNameFor as Tr, ThrowFactory as Tt, ErrorHookContext as U, RawOptionsExtensions as Un, PreparedExecuteOptions as Ur, UpsertManyUpdateValue as Ut, CreateHookAction as V, RawExecutionResult as Vn, TablesConfig as Vr, UpsertManyUpdateContext as Vt, HookAction as W, RawSql as Wn, PreparedParam as Wr, AnyPlugin as Wt, UpdateHookAction as X, OrderBy as Xn, PreparedThrowingResult as Xr, ModelExtensionOf as Xt, TransactionErrorHookContext as Y, OffsetPaginationResult as Yn, PreparedStatement as Yr, HiddenModelsOf as Yt, BatchResult as Z, UpdateResult as Zn, BetterLockClientOptions as Zr, ModelExtensionTypeResolver as Zt, RuntimeContext as _, ExplainResult as _i, PluginModelRelation as _n, JsonPathValue as _r, NumericMutationInput as _t, InsertBuilderLike as a, LockOption as ai, PluginColumnRequirement as an, DbNameKey as ar, BetterRootClient as at, SelectQueryLike as b, BetterDrizzleError as bi, PluginOperationInput as bn, NonNullish as br, PreparableSingleRead as bt, PluginRuntimeAfterHook as c, PaginationArgs as ci, PluginExtension as cn, IsManyRelation as cr, BetterTableRelations as ct, PluginRuntimeIntercept as d, ScalarSelectInput as di, PluginHooks as dn, IsUnknown as dr, CreateDataInput as dt, CursorArgs as ei, OperationArgsExtensionsOf as en, ArrayFilter as er, BetterDrizzleExtendsMethod as et, PluginRuntimeRawBucket as f, SelectInput as fi, PluginIntercept as fn, JsonDottedMutationInput as fr, CreateManyArgs as ft, RuntimeClientExtensionFactory as g, ExplainOptions as gi, PluginModelInfo as gn, JsonMutationValue as gr, JsonbMutationField as gt, PluginRuntimeTransform as h, ExplainOperation as hi, PluginModelExtensionContext as hn, JsonMutationPath as hr, ExtendedClient as ht, DrizzleQueryDelegate as i, LockMode as ii, PluginClientExtensionContext as in, ComparableFilter as ir, BetterRepositoryKey as it, AfterTransactionRollbackHookContext as j, UnionToIntersection as jn, ScalarWhereField as jr, UpdateEachRow as jt, AfterRawHookContext as k, isNotNullViolation as ki, PluginTransactionRollbackHookContext as kn, ScalarFilter as kr, UpdateDataInput as kt, PluginRuntimeBeforeHook as l, PayloadForArgs as li, PluginGeneratedColumns as ln, IsPgArrayColumn as lr, BooleanMutationInput as lt, PluginRuntimeTransactionHook as m, WhereInput as mi, PluginMeta as mn, JsonMutationInput as mr, DeleteManyArgs as mt, DeleteBuilderLike as n, ExistsArgs as ni, OperationArgsWithPlugins as nn, Bindable as nr, BetterRecord as nt, JoinColumns as o, LockTableName as oi, PluginConfig as on, InsertInputFor as or, BetterTableConfig as ot, PluginRuntimeTransactionBucket as p, WhereArg as pi, PluginInterceptContext as pn, JsonDottedWhereInput as pr, DeleteArgs as pt, RawErrorHookContext as q, DeleteResult as qn, PreparedResult as qr, ClientExtensionsOf as qt, DrizzleLikeDatabase as r, IncludeInput as ri, Plugin as rn, BooleanFilter as rr, BetterRelationalConfig as rt, NullableResult as s, OrderByInput as si, PluginDialect as sn, InsertModelFor as sr, BetterTableKey as st, CompilableWhere as t, CursorInput as ti, OperationArgsOf as tn, ArrayWhereField as tr, BetterDrizzleModelDelegate as tt, PluginRuntimeBucket as u, QueryArgs as ui, PluginHookKind as un, IsPgJsonColumn as ur, CreateArgs as ut, RuntimeSchema as v, ExplainStatement as vi, PluginOperationArgsExtensionMap as vn, JsonScalarPath as vr, PgArrayMutationInput as vt, UpdateBuilderLike as w, DatabaseErrorInfo as wi, PluginScopeModel as wn, RelatedConfigFor as wr, TableColumnFor as wt, TableRuntime as x, BetterDrizzleErrorCode as xi, PluginRawErrorHookContext as xn, NullsOrder as xr, SkipDuplicatesColumn as xt, ScopeEntry as y, ExplainableResult as yi, PluginOperationArgsFor as yn, JsonWhereInput as yr, PreparableRead as yt, BetterClientHooks as z, TransactionUnsupportedOptionsBehavior as zn, TableFor as zr, UpsertManyTarget as zt };