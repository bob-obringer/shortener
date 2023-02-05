import { NewShortenedLink, ShortenedLink } from "#/types";
import { useShortenedLinkContext } from "#/app/ShortenedLinkContext";
import { useForm } from "react-hook-form";
import cx from "classnames";
import styles from "#/components/LinkForm/LinkForm.module.scss";
import { Button, FocusRing, Text, TextField } from "#/components//ods";
import Link from "next/link";

export function LinkForm({ link }: { link?: ShortenedLink }) {
  const { insertLink, updateLink, deleteLink } = useShortenedLinkContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { name: "", uri: "" },
    values: { name: "", uri: "", ...link },
    mode: "onBlur",
  });

  const submit = handleSubmit((data) => {
    // cast these because `url` could be empty on the type, but it's requierd, should be better way
    if (data.id) {
      updateLink({ ...link, ...data } as ShortenedLink);
    } else {
      insertLink(data as NewShortenedLink);
    }
  });

  function handleDeleteLink() {
    if (link) deleteLink(link.id);
  }

  const nameField = register("name");
  const uriField = register("uri", {
    required: true,
    pattern:
      /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,8}(:[0-9]{1,5})?(\/.*)?$/,
  });

  const localLink = `${document.location.origin}${link?.shortened_path}`;

  return (
    <form
      onSubmit={submit}
      className={cx(styles.linkForm, "flex flex-col gap-4 items-start")}
    >
      {link ? (
        <FocusRing>
          <Text size="xs" asChild>
            <Link href={link.shortened_path}>{localLink}</Link>
          </Text>
        </FocusRing>
      ) : (
        <Text size="xs">Create a new link</Text>
      )}
      <div className="flex flex-col gap-4 w-full">
        <TextField size="m" label="Name" {...nameField} />
        <TextField
          size="m"
          label="URL"
          {...uriField}
          errorMessage={errors.uri && "Invalid URL"}
        />
        <div className="flex justify-end gap-2">
          {link?.id && (
            <Button
              onPress={handleDeleteLink}
              intent="destroy"
              displayType="outline"
            >
              Delete
            </Button>
          )}
          <Button isDisabled={!isValid} type="submit">
            Save
          </Button>
        </div>
      </div>
      {link && (
        <Text as="div" size="s" className="w-full text-center mt-4">
          This link has been accessed{" "}
          <Text size="s" weight="heavy" color="bright">
            {link.count}
          </Text>{" "}
          times
        </Text>
      )}
    </form>
  );
}
