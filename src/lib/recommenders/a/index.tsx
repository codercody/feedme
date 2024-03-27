import { RecommenderT, GetPostsOptions, optionsDefaults } from "../base";
import prisma from "@/lib/prisma";
import getCast from "@/app/api/casts";

async function getHome(options: Partial<GetPostsOptions> = {}) {
  const { cursor, userFid, page, perPage } = { ...optionsDefaults, ...options };

  const casts = await prisma.casts.findMany({
    where: {
      timestamp: {
        lte: cursor,
      },
      deleted_at: null,
    },
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy: {
      timestamp: "desc",
    },
  });

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

  const casts = await prisma.casts.findMany({
    where: {
      parent_hash: root?.hash,
      timestamp: {
        lte: cursor,
      },
      deleted_at: null,
    },
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy: {
      timestamp: "desc",
    },
  });

  const rootPost = await getCast(root, userFid);
  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return [rootPost, ...posts];
}

async function getProfile(
  authorFid: bigint,
  options: Partial<GetPostsOptions> = {}
) {
  const { cursor, userFid, page, perPage } = { ...optionsDefaults, ...options };

  const casts = await prisma.casts.findMany({
    where: {
      fid: authorFid,
      timestamp: {
        lte: cursor,
      },
      deleted_at: null,
    },
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy: {
      timestamp: "desc",
    },
  });

  const posts = await Promise.all(casts.map((cast) => getCast(cast, userFid)));

  return posts;
}

export const A: RecommenderT = {
  id: "a",
  name: "Recent",
  getHome,
  getPost,
  getProfile,
};
