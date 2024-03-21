export type PostT = {
  id: string;
  author: {
    fid: string;
    fname: string | undefined;
    name: string | undefined;
    pfp: string | undefined;
  };
  timestamp: Date;
  body: string;
  comments: Number;
  shared: boolean;
  shares: Number;
  liked: boolean;
  likes: Number;
};
