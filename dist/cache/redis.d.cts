import { f as CacheStore } from "../types-DEnpN5HJ.cjs";
//#region src/plugins/cache/redis/index.d.ts
/** Runs one Redis command, e.g. `['SET', key, value, 'EX', '60']`. */
export type RedisCommand = (args: string[]) => Promise<unknown>;
/**
 * Redis clients the store can drive: Bun's `RedisClient` (`send`),
 * ioredis (`call`), and node-redis (`sendCommand`).
 */
export type RedisClientLike = {
  send(command: string, args: string[]): Promise<unknown>;
} | {
  call(command: string, ...args: string[]): Promise<unknown>;
} | {
  sendCommand(args: string[]): Promise<unknown>;
};
export type RedisStoreOptions = ({
  client: RedisClientLike;
  command?: never;
} | {
  client?: never;
  command: RedisCommand;
}) & {
  /**
   * Read keys one by one instead of `MGET`, so keys may live in different
   * cluster slots. Detected for ioredis `Cluster` clients.
   */
  cluster?: boolean;
};
/**
 * Redis store for `better-drizzle/cache`. It never opens or closes
 * connections: pass the client your app already uses.
 */
export declare const redis: (options: RedisStoreOptions) => CacheStore;
//#endregion
export { redis as default };