import { ShareIcon } from "../../icons/ShareIcon";

export const Card = () => {
  return (
    <div>
      <div className="p-8 bg-white rounded-md shadow-sm border-gray-200 max-w-72 border">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-md">
            <div className="pr-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
            Project Ideas
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
            <div className="text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {/* <iframe
            className="w-full"
            src="https://www.youtube.com/embed/uK1E0LylitU?si=keOzNlEDWNYg9-Js"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe> */}
          <blockquote className="twitter-tweet w-full">
            <p lang="en" dir="ltr">
              bali, I&#39;m inside you{" "}
              <a href="https://t.co/5FmP8MMsHH">pic.twitter.com/5FmP8MMsHH</a>
            </p>
            &mdash; OPM (@mihirtwt){" "}
            <a href="https://x.com/mihirtwt/status/2078078529103888876?ref_src=twsrc%5Etfw">
              July 17, 2026
            </a>
          </blockquote>{" "}
          <script
            async
            src="https://platform.x.com/widgets.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>
    </div>
  );
};
