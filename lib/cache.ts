import { getRedis } from "./redis";

/** Predefined TTL values in seconds */
export const CACHE_TTL = {
  /** 5 minutes — for frequently updated data (events, content) */
  SHORT: 300,
  /** 30 minutes — for moderately updated data (team, professors) */
  MEDIUM: 1800,
  /** 1 hour — for rarely updated data (alumni, developers) */
  LONG: 3600,
} as const;

/**
 * Cache-aside pattern: check Redis first, fall back to fetcher, store result.
 * If Redis is unavailable, the fetcher is called directly (no caching).
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = CACHE_TTL.SHORT
): Promise<T> {
  const redis = getRedis();

  if (redis) {
    try {
      const cached = await redis.get<T>(key);
      if (cached !== null && cached !== undefined) {
        return cached;
      }
    } catch (err) {
      console.error(`Redis GET error for key "${key}":`, err);
      // Fall through to fetcher
    }
  }

  // Cache miss or Redis unavailable — fetch from source
  const data = await fetcher();

  if (redis) {
    try {
      // Store as JSON string with TTL
      await redis.set(key, JSON.stringify(data), { ex: ttlSeconds });
    } catch (err) {
      console.error(`Redis SET error for key "${key}":`, err);
    }
  }

  return data;
}

/**
 * Invalidate a single cache key after a mutation.
 */
export async function invalidateCache(key: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    await redis.del(key);
  } catch (err) {
    console.error(`Redis DEL error for key "${key}":`, err);
  }
}

/**
 * Invalidate multiple cache keys matching a prefix.
 * Uses SCAN to find keys, then DEL them.
 */
export async function invalidateCacheByPrefix(prefix: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    let cursor: string | number = 0;
    do {
      const result = await redis.scan(cursor as number, { match: `${prefix}*`, count: 100 });
      cursor = result[0];
      const keys = result[1] as string[];
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } while (cursor !== 0 && cursor !== "0");
  } catch (err) {
    console.error(`Redis prefix invalidation error for "${prefix}":`, err);
  }
}
