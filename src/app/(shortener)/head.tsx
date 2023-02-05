import { BaseTags } from "#/app/BaseTags";

export default function Head() {
  return (
    <>
      <title>Sona Shortener</title>
      <meta
        property="og:image"
        content="https://bob.obringer.net/api/og/homepage"
      />
      <meta name="description" content="Link Shortener" />
      <BaseTags />
    </>
  );
}
