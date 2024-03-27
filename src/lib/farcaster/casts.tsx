"use server";

import prisma from "@/lib/prisma";
import { PostT } from "@/lib/types/post";
import { casts } from "@prisma/client";

async function getAuthor(fid: BigInt) {
  const profile = await prisma.user_data.findMany({ where: { fid } });

  const profileMap = new Map(profile.map((item) => [item.type, item.value]));

  return {
    fid: fid.toString(),
    fname: profileMap.get(6),
    name: profileMap.get(2),
    pfp: profileMap.get(1),
  };
}

const getComments = async (hash: Buffer) =>
  prisma.casts.count({ where: { parent_hash: hash, deleted_at: null } });

const getShared = async (hash: Buffer, fid: BigInt) =>
  prisma.reactions.count({
    where: { target_hash: hash, deleted_at: null, reaction_type: 2, fid },
  });

const getShares = async (hash: Buffer) =>
  prisma.reactions.count({
    where: { target_hash: hash, deleted_at: null, reaction_type: 2 },
  });

const getLiked = async (hash: Buffer, fid: BigInt) =>
  prisma.reactions.count({
    where: { target_hash: hash, deleted_at: null, reaction_type: 1, fid },
  });

const getLikes = async (hash: Buffer) =>
  prisma.reactions.count({
    where: { target_hash: hash, deleted_at: null, reaction_type: 1 },
  });

async function getRelevance(fid: BigInt, likes: int) {
  const followers = await prisma.links.count({
    where: { deleted_at: null, target_fid: fid },
  });

  return (likes + 1) / (followers + 2);
}

export default async function getCast(
  cast: casts,
  userFid: BigInt | undefined
): Promise<PostT> {
  const author = await getAuthor(cast.fid);
  const comments = await getComments(cast.hash);
  const shared = userFid ? (await getShared(cast.hash, userFid)) > 0 : false;
  const shares = await getShares(cast.hash);
  const liked = userFid ? (await getLiked(cast.hash, userFid)) > 0 : false;
  const likes = await getLikes(cast.hash);
  const relevance = await getRelevance(cast.fid, likes);

  return {
    id: cast.id.toString(),
    author,
    timestamp: cast.timestamp,
    body: cast.text,
    comments: comments,
    shared: shared,
    shares: shares,
    liked: liked,
    likes: likes,
    relevance: relevance,
  };
}
