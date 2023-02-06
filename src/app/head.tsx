import { DefaultTags } from "#/app/DefaultTags";

export default function Head() {
  return (
    <>
      <DefaultTags />
      <title>Shortener</title>
      <meta name="description" content="Link Shortener" />
    </>
  );
}
