import { useSelectedLayoutSegments } from "next/navigation";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { LinkForm } from "#/components/LinkForm/LinkForm";
import { Text } from "#/components/ods";

export function LinkFormController() {
  // this is an interesting trick that lets us render differently depending on the route
  // it allows a single layout to be used for multiple pages, and render the component
  // based on the route.
  //
  // But... probably an an anti-pattern.  The form generally shouldn't need to know where
  // it's being rendered and instead receive props?  Maybe ok for a smaller app like this.
  // it lets us lay out everything in a single server layout component and return nothing
  // in the page files for the two routes that use this form.
  //
  // maybe there's some next 13 pattern that lets us invert control properly?
  const segs = useSelectedLayoutSegments();
  const { links } = useShortenedLinkContext();

  // links load from local storage on page load, don't do anything until they're loaded
  // probably want some loading state here
  if (!links) {
    return null;
  }

  // if we don't have any segments below the current path, assume we're at the homepage
  // where we want to render the create form
  if (segs.length === 0) {
    return <LinkForm />;
  }

  // if we do have segments, find the link for the short id segment from `/link/[shortId]`;
  const routeShortId = segs[1];
  const activeLink = links?.find(
    ({ raw_shortened_path_id }) => raw_shortened_path_id === routeShortId
  );

  // if the route is for a short id that doesn't exist, return a 404 (but not like this)
  if (!activeLink) {
    return (
      <Text size="xl" className="flex items-center justify-center h-full">
        Link Not Found
      </Text>
    );
  }

  // render a form to edit the link
  return <LinkForm link={activeLink} />;
}
