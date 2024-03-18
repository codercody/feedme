import ABFeed from "@/components/ab-feed";

export default function Post({
  params,
}: {
  params: { author: string; id: string };
}) {
  return <ABFeed title="Post" />;
}
