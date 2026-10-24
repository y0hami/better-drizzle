import { AnyPlugin, AnySchema, BetterDrizzleModelDelegate, BetterTableKey } from "better-drizzle";
//#region src/plugins/soft-delete/types.d.ts
type SoftDeleteMode = 'soft' | 'hard';
type SoftDeleteVisibility = 'without' | 'with' | 'only';
type SoftDeleteDefaultVisibility = Exclude<SoftDeleteVisibility, 'only'>;
type SoftDeleteOptions = {
  column?: string;
  deletedByColumn?: string;
  defaults?: {
    mode?: SoftDeleteMode;
    visibility?: SoftDeleteDefaultVisibility;
  };
};
type AnyDelegate = BetterDrizzleModelDelegate<AnySchema, BetterTableKey<AnySchema>, unknown, readonly AnyPlugin[]>;
type RestoreModelExtension = {
  restore(args: {
    include?: Record<string, unknown>;
    meta?: unknown;
    select?: Record<string, unknown>;
    where: Record<string, unknown>;
  }): ReturnType<AnyDelegate['update']>;
  restoreById(id: string | number | bigint, args?: {
    include?: Record<string, unknown>;
    meta?: unknown;
    select?: Record<string, unknown>;
  }): ReturnType<AnyDelegate['update']>;
};
//#endregion
//#region src/plugins/soft-delete/version.d.ts
/**
 * Your current version of [better-drizzle/soft-delete](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/soft-delete/index.d.ts
type VisibilityArgs = {
  deleted?: SoftDeleteVisibility;
};
type DeleteArgs = VisibilityArgs & {
  deletedBy?: string;
  mode?: SoftDeleteMode;
};
export declare const softDelete: (options?: SoftDeleteOptions) => import("better-drizzle").Plugin<SoftDeleteOptions, Record<never, never>, RestoreModelExtension, Record<string, unknown>, {
  count: VisibilityArgs;
  cursor: VisibilityArgs;
  delete: DeleteArgs;
  deleteMany: DeleteArgs;
  exists: VisibilityArgs;
  findFirst: VisibilityArgs;
  findMany: VisibilityArgs;
  findOne: VisibilityArgs;
  findUnique: VisibilityArgs;
  paginate: VisibilityArgs;
  update: VisibilityArgs;
  updateEach: VisibilityArgs;
  updateMany: VisibilityArgs;
}, never, never>;
//#endregion
export { type SoftDeleteDefaultVisibility, type SoftDeleteMode, type SoftDeleteOptions, type SoftDeleteVisibility, softDelete as default };