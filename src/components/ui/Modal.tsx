import { useRef, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

const Modal = (props: { onClick: () => void, setModal: (value: boolean) => void, setReloadData: () => void }) => {

  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [tag, setTag] = useState("Productivity");
  const [category, setCategory] = useState("Youtube");
  const mapTags = ["Productivity", "Tech & Tools", "Mindset", "Learning & Skills", "Workflows", "Inspiration"] as const;

  const submitData = async () => {
    props.setModal(false);
    if (
      linkRef.current?.value.trim() === "" ||
      titleRef.current?.value.trim() === ""
    ) {
      alert("Fill all the input fields");
      return;
    }

    const data = {
      link: linkRef.current?.value || "",
      contentType: category,
      title: titleRef.current?.value || "",
      tags: [tag],
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/add-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        credentials: "include",
        body: JSON.stringify(data)
      });

      props.setReloadData();
      alert("content added");
    } catch (err) {
      console.log("Error while sending data");
    }
  };

  const categoryIcons: Record<string, JSX.Element> = {
    "Youtube": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
    "Twitter": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
    "Notion": (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.56 2.35c-.42-.326-.98-.7-2.055-.607L3.36 2.96c-.467.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.747-.886l-15.177.887c-.56.046-.746.326-.746.933zm14.337.745c.093.42 0 .84-.42.886l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.933-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.8 1.167l13.728-1.02c1.68-.14 2.1.094 2.8.607l3.876 2.707c.466.326.606.747.606 1.26v16.24c0 1.027-.373 1.634-1.68 1.727L6.486 23.6c-.98.047-1.448-.093-1.961-.747l-3.13-4.06c-.56-.747-.793-1.307-.793-1.96V2.893c0-.84.373-1.54 1.401-1.68z"/></svg>
    )
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center animate-fade-in">
      {/* Backdrop */}
      <div ref={modalRef} onClick={props.onClick} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative z-10 w-[440px] bg-surface-900 border border-surface-700/60 rounded-2xl shadow-2xl shadow-black/40 animate-fade-in-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700/50">
          <h2 className="text-lg font-bold gradient-text">Add Content</h2>
          <button
            onClick={props.onClick}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-surface-400 hover:bg-surface-800 hover:text-surface-200 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Title</label>
            <input ref={titleRef}
              type="text" placeholder="Give it a name..." maxLength={20}
              className="w-full h-11 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600" />
          </div>

          {/* Link */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Link</label>
            <input ref={linkRef}
              type="text" required placeholder="Paste a URL..."
              className="w-full h-11 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600" />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Tag</label>
            <div className="flex flex-wrap gap-2">
              {mapTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border cursor-pointer ${
                    tag === t
                      ? "bg-brand-600/20 text-brand-300 border-brand-500/40 shadow-sm shadow-brand-500/10"
                      : "bg-surface-800 text-surface-400 border-surface-700 hover:bg-surface-700 hover:text-surface-300 hover:border-surface-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Category</label>
            <div className="flex gap-2">
              {["Youtube", "Twitter", "Notion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 border cursor-pointer ${
                    category === cat
                      ? "bg-brand-600/20 text-brand-300 border-brand-500/40 shadow-sm shadow-brand-500/10"
                      : "bg-surface-800 text-surface-400 border-surface-700 hover:bg-surface-700 hover:text-surface-300 hover:border-surface-600"
                  }`}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-surface-700/50 bg-surface-800/30">
          <button
            onClick={props.onClick}
            className="px-4 py-2 text-sm font-medium rounded-xl text-surface-400 hover:text-surface-200 hover:bg-surface-700 transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submitData}
            className="px-5 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;