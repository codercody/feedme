import { PostT } from "@/lib/types/post";

export type GetPostsOptions = {
  cursor: Date;
  userFid: bigint;
  page: number;
  perPage: number;
};

export const optionsDefaults = {
  cursor: new Date(),
  page: 1,
  perPage: 6,
};

export interface RecommenderT {
  id: string;
  name: string;

  getHome: (options?: Partial<GetPostsOptions>) => Promise<PostT[]>;

  getPost: (
    authorFid: bigint,
    postId: bigint,
    options?: Partial<GetPostsOptions>
  ) => Promise<PostT[]>;

  getProfile: (
    authorFid: bigint,
    options?: Partial<GetPostsOptions>
  ) => Promise<PostT[]>;
}
