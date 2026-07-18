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
  reload?: ()=> void
}

const Card = (props: CardProps) => {
  const navigate = useNavigate();
  const date = format(new Date(), 'dd MMM yyyy');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  let contentPreview: JSX.Element = <p className="text-gray-500 text-sm">No content available</p>;

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
          <a href={props.link} target="_blank" rel="noopener noreferrer" className="block w-full">
            <img
              src={thumbnail}
              alt={props.title}
              className="h-40 w-full rounded-lg object-cover transition-opacity hover:opacity-90"
            />
          </a>
        ) : (
          <p className="text-sm text-gray-500">No thumbnail available</p>
        )}
      </div>
    );
  } else if (props.icon === "Twitter") {
    contentPreview = (
      <div className="flex h-full items-center justify-center p-3">
        <a href={props.link} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-50 p-6 transition-colors hover:bg-slate-100">
          <TwitterIcon />
        </a>
      </div>
    );
  } else if(props.icon === "Notion"){
    contentPreview = (
      <div className="flex h-full items-center justify-center p-3">
        <a href={props.link} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-50 p-6 transition-colors hover:bg-slate-100">
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
  
  async function deleteHandle(){
    try{
      if (!props.contentId) {
        alert("Cannot delete this item");
        return;
      }

      const token = localStorage.getItem("token");
      if(!token){
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

      if(res.ok){
        alert("Item deleted");
        props.reload?.();
        return;
      }

      const errorData = await res.json().catch(() => null);
      alert(errorData?.message || "Failed to delete item");
    }catch(err){
      console.log("item not deleted", err);
      alert("Could not delete item");
    }
  }

  return (
    <div className="flex h-[50vh] w-[19vw] min-w-[240px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 pt-0.5"><DocumentIcon /></span>
          <span className="truncate text-lg font-semibold text-slate-800">{props.title}</span>
        </div>
        {props.contentId && (
          <button
            type="button"
            aria-label="Delete content"
            onClick={deleteHandle}
            className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {contentPreview}
      </div>

      <div className="mt-auto border-t border-slate-100 px-4 py-3">
        <div className="mb-2">
          <Tags tagTypes={props.tag} />
        </div>
        <p className="text-xs text-slate-500">
          Created on <span className="font-medium text-slate-700">{date}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
