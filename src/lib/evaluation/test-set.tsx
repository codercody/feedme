export const TEST_FIDS = [
  3, 5650, 99, 2, 347, 1325, 207, 129, 56, 8, 206, 11188, 2433, 534, 3621, 576,
  457, 1097, 239, 3887,
].map((x) => BigInt(x));

export const TEST_CURSOR = new Date("2024-03-22T16:00:00.000Z");

export const RELEVANCE_THOLD = 0.01;

export const K = 100;

// computed offline
/*
SELECT COUNT(*)
FROM (
    SELECT casts.fid, COUNT(reactions.id) AS like_count
    FROM casts
    LEFT JOIN reactions ON casts.hash = reactions.target_hash AND reactions.reaction_type = 1
    WHERE casts.created_at <= '2024-03-22T16:00:00.000Z'::timestamp
    AND casts.created_at >= '2024-03-21T16:00:00.000Z'::timestamp
    AND casts.deleted_at IS null
    GROUP BY casts.id
) A
LEFT JOIN (
    SELECT target_fid, COUNT(*) AS follower_count
    FROM links
    WHERE deleted_at IS null
    GROUP BY target_fid
) B ON A.fid = B.target_fid
WHERE (A.like_count + 1.) / (B.follower_count + 2.) >= 0.01;
*/
export const TOTAL_NUM_RELEVANT = 40575;

// computed offline
/*
SELECT COUNT(*)
FROM (
    SELECT casts.fid, C.like_count
    FROM casts
    LEFT JOIN (
        SELECT target_hash, COUNT(*) AS like_count
        FROM reactions
        GROUP BY target_hash
    ) C ON C.target_hash = casts.hash
    WHERE casts.created_at <= '2024-03-22T16:00:00.000Z'::timestamp
    AND casts.created_at >= '2024-03-21T16:00:00.000Z'::timestamp
    AND casts.deleted_at IS null
    ORDER BY casts.created_at DESC
    LIMIT 100
) A
LEFT JOIN (
    SELECT target_fid, COUNT(*) AS follower_count
    FROM links
    WHERE deleted_at IS null
    GROUP BY target_fid
) B ON A.fid = B.target_fid
WHERE (A.like_count + 1.) / (B.follower_count + 2.) >= 0.01;
*/
export const NUM_RELEVANT_A = new Map<number, number>([
  [3, 12],
  [5650, 12],
  [99, 12],
  [2, 12],
  [347, 12],
  [1325, 12],
  [207, 12],
  [129, 12],
  [56, 12],
  [8, 12],
  [206, 12],
  [11188, 12],
  [2433, 12],
  [534, 12],
  [3621, 12],
  [576, 12],
  [457, 12],
  [1097, 12],
  [239, 12],
  [3887, 12],
]);

// computed offline
/*
SELECT COUNT(*)
FROM (
    SELECT casts.fid, COUNT(reactions.id) AS like_count
    FROM casts
    LEFT JOIN reactions ON casts.hash = reactions.target_hash AND reactions.reaction_type = 1
    WHERE
        casts.created_at <= '2024-03-22T16:00:00.000Z'::timestamp AND
        casts.created_at >= '2024-03-21T16:00:00.000Z'::timestamp AND
        casts.deleted_at IS null AND
        casts.parent_hash IS null
    GROUP BY casts.id
    ORDER BY like_count DESC
    LIMIT 100
) A
LEFT JOIN (
    SELECT target_fid, COUNT(*) AS follower_count
    FROM links
    WHERE deleted_at IS null
    GROUP BY target_fid
) B ON A.fid = B.target_fid
WHERE (A.like_count + 1.) / (B.follower_count + 2.) >= 0.01;
*/
export const NUM_RELEVANT_B = new Map<number, number>([
  [3, 82],
  [5650, 82],
  [99, 82],
  [2, 82],
  [347, 82],
  [1325, 82],
  [207, 82],
  [129, 82],
  [56, 82],
  [8, 82],
  [206, 82],
  [11188, 82],
  [2433, 82],
  [534, 82],
  [3621, 82],
  [576, 82],
  [457, 82],
  [1097, 82],
  [239, 82],
  [3887, 82],
]);
