import All from "../../icons/All";
import AppLogo from "../../icons/AppLogo";
import DocumentIcon from "../../icons/DocumentIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import NavFields from "./NavFields";
import { useNavigate } from "react-router-dom";

interface SideNavbarProps {
  data1: any,
  setData: any,
  setYTData: any,
  setNitionData: any,
  setDataShow: any,
  activeTab?: string
}


const SideNavbar = (props: SideNavbarProps) => {
  const navigate = useNavigate();

  function yt() {
    const ytData = props.data1.filter((item: any) => item.contentType === "Youtube");
    props.setYTData(ytData);
    props.setDataShow("Youtube");
  }

  function nt() {
    const ntData = props.data1.filter((item: any) => item.contentType === "Notion" || item.contentType === "Twitter");
    props.setNitionData(ntData);
    props.setDataShow("Notion");
  }

  function al() {
    props.setDataShow("All")
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-[260px] min-w-[260px] h-screen bg-surface-900/80 border-r border-surface-700/50 flex flex-col animate-slide-in-left">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-surface-700/50">
        <div className="text-brand-400">
          <AppLogo />
        </div>
        <span className="text-lg font-bold tracking-tight gradient-text">Second Brain</span>
      </div>

      {/* Nav Section */}
      <div className="mt-6 flex flex-col gap-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-surface-500 px-5 mb-2">
          Content
        </span>
        <div onClick={al}>
          <NavFields text={"All"} startIcon={<All />} active={props.activeTab === "All"} />
        </div>
        <div onClick={yt}>
          <NavFields text={"Youtube"} startIcon={<YoutubeIcon />} active={props.activeTab === "Youtube"} />
        </div>
        <div onClick={nt}>
          <NavFields text={"Documents"} startIcon={<DocumentIcon />} active={props.activeTab === "Notion"} />
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-auto border-t border-surface-700/50 p-4 space-y-3">
        <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl bg-surface-800/50 border border-surface-700/30">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-200 truncate">My Brain</p>
            <p className="text-xs text-surface-500">Active</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-surface-300 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  )
}

export default SideNavbar;