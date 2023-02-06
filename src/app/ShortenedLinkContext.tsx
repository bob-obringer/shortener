"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NewShortenedLink, ShortenedLink } from "#/types";
import linkJSON from "#/links.json";
import { useRouter } from "next/navigation";

const LSKEY = "sona_shortener_links";

function getLinksFromLocalStorage() {
  let links: ShortenedLink[] | null = null;
  const linksString = window.localStorage.getItem(LSKEY);
  if (linksString) {
    try {
      links = JSON.parse(linksString);
    } catch (e) {
      console.error("Error parsing localStorage", e);
    }
  }
  return links;
}

function generateString(length: number, base: 36 | 64 = 36) {
  let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  if (base === 64) {
    chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${chars}+/`;
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

interface ShortenedLinkContextValue {
  links?: ShortenedLink[];
  insertLink: (link: NewShortenedLink) => void;
  updateLink: (link: ShortenedLink) => void;
  deleteLink: (linkId: string) => void;
  incrementAndRedirect: (linkId: string) => void;
  download: () => void;
  resetAllLinks: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const ShortenedLinkContext = createContext<ShortenedLinkContextValue | null>(
  null
);

export function ShortenedLinkContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [links, setLinksState] = useState<ShortenedLink[]>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const redirectToIdAfterLocalStorageUpdate = useRef<string | null>();
  const redirectToRouteAfterLocalStorageUpdate = useRef<string | null>();
  useEffect(() => {
    if (!links) return;
    window.localStorage.setItem(LSKEY, JSON.stringify(links));

    if (redirectToRouteAfterLocalStorageUpdate.current) {
      router.push(redirectToRouteAfterLocalStorageUpdate.current);
      redirectToRouteAfterLocalStorageUpdate.current = null;
    }

    // when we redirect, we want to update count and wait for that to complete in local storage
    // before actually directing.  This flag makes sure we redirect after the update
    if (redirectToIdAfterLocalStorageUpdate.current) {
      const link = links.find(
        ({ id }) => id === redirectToIdAfterLocalStorageUpdate.current
      );
      if (link) window.location.replace(link.uri);
    }
  }, [links, router]);

  useEffect(() => {
    setLinksState(getLinksFromLocalStorage() || linkJSON);
  }, []);

  function deleteLink(idToRemove: string) {
    router.push("/");
    // if this fires before router push is finished, we get a weird flash
    // should probably handle this on route change instead of this delay
    setTimeout(() => {
      setLinksState((links: ShortenedLink[] = []) =>
        links.filter(({ id }) => id !== idToRemove)
      );
    }, 250);
  }

  function getUriParts(uriString: string) {
    const url = new URL(uriString);
    return {
      scheme: url.protocol.replace(":", ""),
      path: url.pathname,
      root: url.hostname,
    };
  }

  function getRandomIds() {
    const pathId = generateString(8);
    return {
      id: generateString(27, 64),
      raw_shortened_path_id: pathId,
      shortened_path: `/${pathId}`,
      shortened_uri: `http://localhost:3000/${pathId}`,
    };
  }

  function updateLink(updatedLink: ShortenedLink) {
    const uriParts = getUriParts(updatedLink.uri);
    const updatedLinkData = {
      ...updatedLink,
      ...uriParts,
    };
    setLinksState((links: ShortenedLink[] = []) =>
      links.map((link) => (link.id === updatedLink.id ? updatedLinkData : link))
    );
  }

  function insertLink(updatedLink: NewShortenedLink) {
    const uriParts = getUriParts(updatedLink.uri);
    const ids = getRandomIds();
    const newLinkData = {
      ...updatedLink,
      ...uriParts,
      ...ids,
      count: 0,
      created_date: new Date().toISOString().substring(0, 10),
    };

    redirectToRouteAfterLocalStorageUpdate.current = `/link/${newLinkData.raw_shortened_path_id}`;
    setLinksState((links: ShortenedLink[] = []) => {
      links.push(newLinkData);
      return [...links];
    });
  }

  function incrementAndRedirect(redirectId: string) {
    redirectToIdAfterLocalStorageUpdate.current = redirectId;
    setLinksState((links: ShortenedLink[] = []) =>
      links.map((link) =>
        link.id === redirectId ? { ...link, count: link.count + 1 } : link
      )
    );
  }

  function download() {
    let blob = new Blob([JSON.stringify(links, null, 2)], {
      type: "application/json",
    });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shortened-links.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function resetAllLinks() {
    setLinksState(linkJSON);
  }

  return (
    <ShortenedLinkContext.Provider
      value={{
        links,
        insertLink,
        updateLink,
        deleteLink,
        incrementAndRedirect,
        download,
        resetAllLinks,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </ShortenedLinkContext.Provider>
  );
}

export function useShortenedLinkContext() {
  return useContext(ShortenedLinkContext) as ShortenedLinkContextValue;
}
