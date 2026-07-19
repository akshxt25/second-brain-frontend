import { format } from 'date-fns'
import { type JSX, useEffect, useState } from "react";
import DocumentIcon from '../../icons/DocumentIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import TwitterIcon from '../../icons/TwitterIcon';
import NotionIcon from '../../icons/NotionIcon';
import Tags from './Tags';
import { useNavigate } from 'react-router-dom';


interface CardProps {
  contentId?: string;
  icon?: "Youtube" | "Twitter" | "Notion";
  tag: "Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration";
  title?: string;
  link: string;
  reload?: () => void
}

const Card = (props: CardProps) => {
  const navigate = useNavigate();
  const date = format(new Date(), 'dd MMM yyyy');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  let contentPreview: JSX.Element = <p className="text-surface-500 text-sm italic">No content available</p>;

  const getYoutubeId = (url: string): string | null => {
    const regularFormat = url.split("v=");
    if (regularFormat.length > 1) {
      const videoId = regularFormat[1].split("&")[0];
      return videoId;
    }

    const shortFormat = url.split("youtu.be/");
    if (shortFormat.length > 1) {
      const videoId = shortFormat[1].split("?")[0];
      return videoId;
    }

    return null;
  };

  if (props.icon === "Youtube") {
    contentPreview = (
      <div className="flex h-full items-center justify-center p-3">
        {thumbnail ? (
          <a href={props.link} target="_blank" rel="noopener noreferrer" className="block w-full group/thumb">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={thumbnail}
                alt={props.title}
                className="h-36 w-full rounded-lg object-cover transition-all duration-300 group-hover/thumb:scale-105 group-hover/thumb:brightness-110"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ) : (
          <p className="text-sm text-surface-500 italic">No thumbnail available</p>
        )}
      </div>
    );
  } else if (props.icon === "Twitter") {
    contentPreview = (
      <div className="flex h-full items-center justify-center p-4">
        <a href={props.link} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-800/80 border border-surface-700 transition-all duration-300 hover:bg-sky-500/10 hover:border-sky-500/30 hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10">
          <TwitterIcon />
        </a>
      </div>
    );
  } else if (props.icon === "Notion") {
    contentPreview = (
      <div className="flex h-full items-center justify-center p-4">
        <a href={props.link} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-800/80 border border-surface-700 transition-all duration-300 hover:bg-surface-700 hover:border-surface-500 hover:scale-105 hover:shadow-lg hover:shadow-surface-900/50">
          <NotionIcon />
        </a>
      </div>
    );
  }

  useEffect(() => {
    const videoId = getYoutubeId(props.link);
    if (videoId) {
      setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
    } else {
      setThumbnail(null);
    }
  }, [props.link]);

  async function deleteHandle() {
    try {
      if (!props.contentId) {
        alert("Cannot delete this item");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/delete/${props.contentId}`,
        {
          method: "DELETE",
          headers: {
            authorization: token,
          },
          credentials: "include",
        }
      );

      if (res.ok) {
        alert("Item deleted");
        props.reload?.();
        return;
      }

      const errorData = await res.json().catch(() => null);
      alert(errorData?.message || "Failed to delete item");
    } catch (err) {
      console.log("item not deleted", err);
      alert("Could not delete item");
    }
  }

  return (
    <div
      className="card-stagger flex h-[340px] w-[280px] min-w-[260px] flex-col overflow-hidden rounded-2xl bg-surface-800/60 border border-surface-700/50 transition-all duration-300 hover:border-brand-500/30 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-surface-700/50">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="shrink-0 text-brand-400">
            <DocumentIcon />
          </span>
          <span className="truncate text-sm font-semibold text-surface-100">{props.title}</span>
        </div>
        {props.contentId && (
          <button
            type="button"
            aria-label="Delete content"
            onClick={deleteHandle}
            className={`shrink-0 rounded-lg p-1.5 transition-all duration-200 ${
              isHovered
                ? "text-surface-400 hover:bg-red-500/15 hover:text-red-400"
                : "text-transparent"
            }`}
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {contentPreview}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-surface-700/50 px-4 py-3">
        <div className="mb-2">
          <Tags tagTypes={props.tag} />
        </div>
        <p className="text-xs text-surface-500">
          Added <span className="font-medium text-surface-400">{date}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
