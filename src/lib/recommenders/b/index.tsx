import { RecommenderT, GetPostsOptions, optionsDefaults } from "../base";
import { Prisma, casts } from "@prisma/client";
import getCast from "@/app/api/casts";
import prisma from "@/lib/prisma";

async function getHome(options: Partial<GetPostsOptions> = {}) {
  const { cursor, userFid, page, perPage } = { ...optionsDefaults, ...options };

  const query = Prisma.sql`
    SELECT casts.*, COUNT(reactions.id) AS like_count
    FROM casts
    LEFT JOIN reactions ON casts.hash = reactions.target_hash AND reactions.reaction_type = 1
    WHERE
      casts.timestamp <= ${cursor}::timestamp AND
      casts.timestamp >= ${new Date(
        cursor.getTime() - 1000 * 60 * 60 * 24
      )}::timestamp AND
      casts.deleted_at IS null AND
      casts.parent_hash IS null
    GROUP BY casts.id
    ORDER BY like_count DESC
    LIMIT ${perPage}
    OFFSET ${(page - 1) * perPage}
  `;

  const casts = await prisma.$queryRaw<casts[]>(query);

  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return posts;
}

async function getPost(
  authorFid: bigint,
  postId: bigint,
  options: Partial<GetPostsOptions> = {}
) {
  const { cursor, userFid, page, perPage } = { ...optionsDefaults, ...options };

  const root = await prisma.casts.findUnique({
    where: {
      id: postId,
    },
  });

  if (!root) return [];

  const query = Prisma.sql`
    SELECT casts.*, COUNT(reactions.id) AS like_count
    FROM casts
    LEFT JOIN reactions ON casts.hash = reactions.target_hash AND reactions.reaction_type = 1
    WHERE
      casts.timestamp <= ${cursor}::timestamp AND
      casts.deleted_at IS null AND
      casts.parent_hash = ${root.hash}
    GROUP BY casts.id
    ORDER BY like_count DESC
    LIMIT ${perPage}
    OFFSET ${(page - 1) * perPage}
  `;

  const casts = await prisma.$queryRaw<casts[]>(query);

  const rootPost = await getCast(root, userFid);
  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return [rootPost, ...posts];
}

async function getProfile(
  authorFid: bigint,
  options: Partial<GetPostsOptions> = {}
) {
  const { cursor, userFid, page, perPage } = { ...optionsDefaults, ...options };

  const query = Prisma.sql`
    SELECT casts.*, COUNT(reactions.id) AS like_count
    FROM casts
    LEFT JOIN reactions ON casts.hash = reactions.target_hash AND reactions.reaction_type = 1
    WHERE
      casts.timestamp <= ${cursor}::timestamp AND
      casts.deleted_at IS null AND
      casts.fid = ${authorFid}
    GROUP BY casts.id
    ORDER BY like_count DESC
    LIMIT ${perPage}
    OFFSET ${(page - 1) * perPage}
  `;

  const casts = await prisma.$queryRaw<casts[]>(query);

  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return posts;
}

export const B: RecommenderT = {
  id: "b",
  name: "Popular",
  getHome,
  getPost,
  getProfile,
};
