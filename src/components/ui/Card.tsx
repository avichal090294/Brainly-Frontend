import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { useEffect, useRef } from "react";

interface Twttr {
  widgets?: {
    createTweet?: (id: string, el: HTMLElement, options?: Record<string, unknown>) => Promise<unknown>;
    load?: (el?: Element | Document) => void;
  };
}

declare global {
  interface Window {
    twttr?: Twttr;
  }
}

const loadTwitterWidgets = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.twttr && window.twttr.widgets) {
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://platform.twitter.com/widgets.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Twitter widgets"));
    document.body.appendChild(s);
  });
};

function getTweetIdFromUrl(urlStr: string) {
  try {
    const url = new URL(urlStr);
    const m = url.pathname.match(/status\/(\d+)/);
    if (m) return m[1];
    // fallback: check query or fragments
    const parts = urlStr.split("/");
    const idx = parts.findIndex((p) => p === "status");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {
    // ignore
  }
  return null;
}

// tweet container ref and effect will be created inside component

interface CardProps {
  id?: string;
  title: string;
  link: string;
  type?: "twitter" | "youtube" | "article";
  onDelete?: (id?: string) => void;
}

export const Card = ({ id, title, link, type, onDelete }: CardProps) => {
  const tweetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (type !== "twitter") return;
    const tweetId = getTweetIdFromUrl(link);
    if (!tweetId) return;

    let cancelled = false;

    (async () => {
      try {
        await loadTwitterWidgets();
        const tw = window.twttr as Twttr | undefined;
        if (cancelled || !tweetRef.current || !tw) return;

        // ensure blockquote exists for widgets to transform
        tweetRef.current.innerHTML = `<blockquote class="twitter-tweet"><a href="${link}"></a></blockquote>`;

        if (tw.widgets && typeof tw.widgets.createTweet === "function") {
          await tw.widgets.createTweet(tweetId, tweetRef.current, { conversation: "none" });
        }
        else if (tw.widgets && tw.widgets.load) {
          // fallback to load
          tw.widgets.load(tweetRef.current as Element | undefined);
        }
      } catch {
        // ignore and let the fallback blockquote/link show
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [link, type]);
  // Helper to convert various YouTube URLs into an embed URL
  function getYouTubeEmbedUrl(src: string) {
    try {
      // if it's already an embed url, return as-is
      if (src.includes("/embed/")) return src;
      const url = new URL(src);
      // short link: youtu.be/VIDEO
      if (url.hostname === "youtu.be") {
        const id = url.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      // full domain: youtube.com
      if (url.hostname.includes("youtube.com")) {
        // watch?v=VIDEO
        const v = url.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
        // maybe a share/embed path
        const parts = url.pathname.split("/");
        const embedIndex = parts.indexOf("embed");
        if (embedIndex >= 0 && parts[embedIndex + 1]) return `https://www.youtube.com/embed/${parts[embedIndex + 1]}`;
      }
      return src;
    } catch {
      return src;
    }
  }
  return (
    <div>
      <div className="p-4 bg-white rounded-md shadow-sm border-slate-100 max-w-72 border min-h-48 min-w-72">
        <div className={"flex justify-between"}>
          <div className={"flex items-center text-md"}>
            <div className={"text-gray-600"}>
              <ShareIcon size={"sm"} />
            </div>
            <div className={"px-5 text-gray-600"}>{title}</div>
          </div>
          <div className={"flex items-center"}>
            <div className={"px-2 text-gray-600"}>
              <a href={link} target="_blank">
                <ShareIcon size="sm" />
              </a>
            </div>
            <div className={"px-2 text-gray-600"}>
              <button
                aria-label="Delete content"
                onClick={() => onDelete?.(id)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <DeleteIcon size="sm" />
              </button>
            </div>
          </div>
        </div>
        <div className={"pt-4 pb-4"}>
          {type === "youtube" && (
            (() => {
              const embedSrc = getYouTubeEmbedUrl(link);
              // if embedSrc looks like an embed url, render iframe, otherwise render a link
              if (embedSrc.includes("/embed/")) {
                return (
                  <iframe
                    className="w-full"
                    src={embedSrc}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                );
              }
              return (
                <div>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Open video
                  </a>
                </div>
              );
            })()
          )}
          {type === "twitter" && (
            <div ref={tweetRef}>
              <blockquote className="twitter-tweet">
                <a href={link}></a>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
