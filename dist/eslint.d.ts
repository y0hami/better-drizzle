import { Rule } from "eslint";
//#region src/plugins/eslint/shared/names.d.ts
declare const SUPPORTED_RUNTIME_RULE_KEYS: readonly ["noDeleteManyWithoutWhere", "noUpdateManyWithoutWhere", "noDeleteWithoutWhere", "noUpdateWithoutWhere", "noEmptyWhere", "noUnboundedFindMany", "requireExplicitLimit", "maxLimit", "requireOrderByForLimit", "requireOrderByForPagination", "requireOrderByForCursor", "requireStableOrderByForCursor", "maxIncludeDepth", "maxIncludeRelations", "noLockWithInclude", "noInvalidLockCombination", "requireOrderByForSkipLocked", "requireLimitForSkipLocked", "noRawUnsafe", "requireRawComment", "requireQueryComment", "requireRawTimeout", "noRawMutation", "noSensitiveSelect", "requireExplicitSensitiveAccessReason", "noWithoutPlugins", "noPluginBypassWithoutReason"];
type SupportedRuntimeRuleKey = (typeof SUPPORTED_RUNTIME_RULE_KEYS)[number];
declare const ruleIdByRuntimeKey: Record<SupportedRuntimeRuleKey, string>;
//#endregion
//#region src/plugins/eslint/version.d.ts
/**
 * Your current version of [better-drizzle/eslint](https://npmjs.com/package/better-drizzle).
 */
export declare const version = "0.3.0";
//#endregion
//#region src/plugins/eslint/index.d.ts
export declare const rules: {
  [ruleIdByRuntimeKey.maxIncludeDepth]: Rule.RuleModule;
  [ruleIdByRuntimeKey.maxIncludeRelations]: Rule.RuleModule;
  [ruleIdByRuntimeKey.maxLimit]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noDeleteManyWithoutWhere]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noDeleteWithoutWhere]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noEmptyWhere]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noInvalidLockCombination]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noLockWithInclude]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noPluginBypassWithoutReason]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noRawMutation]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noRawUnsafe]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noSensitiveSelect]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noUnboundedFindMany]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noUpdateManyWithoutWhere]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noUpdateWithoutWhere]: Rule.RuleModule;
  [ruleIdByRuntimeKey.noWithoutPlugins]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireExplicitLimit]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireExplicitSensitiveAccessReason]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireLimitForSkipLocked]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireOrderByForCursor]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireOrderByForLimit]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireOrderByForPagination]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireOrderByForSkipLocked]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireQueryComment]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireRawComment]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireRawTimeout]: Rule.RuleModule;
  [ruleIdByRuntimeKey.requireStableOrderByForCursor]: Rule.RuleModule;
};
export declare const configs: {
  recommended: {
    files: string[];
    languageOptions: {
      parser: typeof import("@typescript-eslint/parser");
      sourceType: "module";
    };
    plugins: {
      'better-drizzle': object;
    };
    rules: Record<string, unknown>;
  }[];
  safe: {
    files: string[];
    languageOptions: {
      parser: typeof import("@typescript-eslint/parser");
      sourceType: "module";
    };
    plugins: {
      'better-drizzle': object;
    };
    rules: Record<string, unknown>;
  }[];
  strict: {
    files: string[];
    languageOptions: {
      parser: typeof import("@typescript-eslint/parser");
      sourceType: "module";
    };
    plugins: {
      'better-drizzle': object;
    };
    rules: Record<string, unknown>;
  }[];
};
export declare const recommended: {
  files: string[];
  languageOptions: {
    parser: typeof import("@typescript-eslint/parser");
    sourceType: "module";
  };
  plugins: {
    'better-drizzle': object;
  };
  rules: Record<string, unknown>;
}[];
export declare const safe: {
  files: string[];
  languageOptions: {
    parser: typeof import("@typescript-eslint/parser");
    sourceType: "module";
  };
  plugins: {
    'better-drizzle': object;
  };
  rules: Record<string, unknown>;
}[];
export declare const strict: {
  files: string[];
  languageOptions: {
    parser: typeof import("@typescript-eslint/parser");
    sourceType: "module";
  };
  plugins: {
    'better-drizzle': object;
  };
  rules: Record<string, unknown>;
}[];
declare const plugin: {
  configs: {
    recommended: {
      files: string[];
      languageOptions: {
        parser: typeof import("@typescript-eslint/parser");
        sourceType: "module";
      };
      plugins: {
        'better-drizzle': object;
      };
      rules: Record<string, unknown>;
    }[];
    safe: {
      files: string[];
      languageOptions: {
        parser: typeof import("@typescript-eslint/parser");
        sourceType: "module";
      };
      plugins: {
        'better-drizzle': object;
      };
      rules: Record<string, unknown>;
    }[];
    strict: {
      files: string[];
      languageOptions: {
        parser: typeof import("@typescript-eslint/parser");
        sourceType: "module";
      };
      plugins: {
        'better-drizzle': object;
      };
      rules: Record<string, unknown>;
    }[];
  };
  meta: {
    name: string;
    version: string;
  };
  rules: {
    [ruleIdByRuntimeKey.maxIncludeDepth]: Rule.RuleModule;
    [ruleIdByRuntimeKey.maxIncludeRelations]: Rule.RuleModule;
    [ruleIdByRuntimeKey.maxLimit]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noDeleteManyWithoutWhere]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noDeleteWithoutWhere]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noEmptyWhere]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noInvalidLockCombination]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noLockWithInclude]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noPluginBypassWithoutReason]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noRawMutation]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noRawUnsafe]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noSensitiveSelect]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noUnboundedFindMany]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noUpdateManyWithoutWhere]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noUpdateWithoutWhere]: Rule.RuleModule;
    [ruleIdByRuntimeKey.noWithoutPlugins]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireExplicitLimit]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireExplicitSensitiveAccessReason]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireLimitForSkipLocked]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireOrderByForCursor]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireOrderByForLimit]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireOrderByForPagination]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireOrderByForSkipLocked]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireQueryComment]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireRawComment]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireRawTimeout]: Rule.RuleModule;
    [ruleIdByRuntimeKey.requireStableOrderByForCursor]: Rule.RuleModule;
  };
};
export type EslintBetterDrizzleRuleKey = SupportedRuntimeRuleKey;
//#endregion
export { plugin as default };