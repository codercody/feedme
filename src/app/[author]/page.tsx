import ABFeed from "@/components/ab-feed";

export default function Post({ params }: { params: { author: string } }) {
  return (
    <ABFeed
      title="Profile"
      apiEndpoint="profile"
      options={`&author=${params.author}`}
    />
  );
}
