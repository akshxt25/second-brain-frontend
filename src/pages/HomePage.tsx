
import { useEffect, useRef, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import SideNavbar from "../components/ui/SideBar";
import { Button } from "../components/ui/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import Modal from "../components/ui/Modal";

const HomePage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data1, setData] = useState<any[]>([]);
  const [ytData, setYTData] = useState<any[]>([]);
  const [notionData, setNitionData] = useState<any[]>([]);
  const [dataShow, setDataShow] = useState("All");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  let show: JSX.Element | JSX.Element[] = data1;

  useEffect(() => {
    fetchingData();
  }, [reloadData]);

  // Debounced search
  useEffect(() => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimerRef.current = setTimeout(() => {
      performSearch(searchQuery.trim());
    }, 400);

    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, [searchQuery]);

  async function performSearch(query: string) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: { authorization: token },
          credentials: "include",
        }
      );

      if (res.ok) {
        const jsonData = await res.json();
        setSearchResults(jsonData.data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  async function fetchingData() {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/get-content`,
        {
          method: "GET",
          headers: {
            authorization: token,
          },
          credentials: "include",
        }
      );

      const jsonData = await res.json();
      setData(jsonData.data);
    } catch (err) {
      console.log("Error while sending data");
    } finally {
      setLoading(false);
    }
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="flex flex-wrap gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="w-[280px] h-[340px] rounded-2xl overflow-hidden">
          <div className="skeleton w-full h-12 mb-2"></div>
          <div className="skeleton w-full h-40 mb-2"></div>
          <div className="skeleton w-3/4 h-6 mb-2 ml-4"></div>
          <div className="skeleton w-1/2 h-4 ml-4"></div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-surface-800 border border-surface-700/50 flex items-center justify-center mb-5 animate-float">
        <svg className="w-10 h-10 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-surface-300 mb-1">No content yet</h3>
      <p className="text-sm text-surface-500 mb-6">Start building your second brain by adding content</p>
      <Button
        variant="primary"
        size="md"
        text="Add your first note"
        startIcon={<PlusIcon size="md" />}
        onClick={() => setModal(true)}
      />
    </div>
  );

  // No search results state
  const NoSearchResults = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in w-full">
      <div className="w-16 h-16 rounded-2xl bg-surface-800 border border-surface-700/50 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-surface-300 mb-1">No results found</h3>
      <p className="text-sm text-surface-500">Try a different search term or add more content with notes</p>
    </div>
  );

  // Determine what to show — search results take priority
  if (searchResults !== null) {
    show = searchResults.length > 0 ? (
      searchResults.map((item: any, idx: number) => (
        <Card
          key={item._id ?? idx}
          contentId={item._id}
          icon={item.contentType}
          tag={item.tags?.[0]}
          title={item.title}
          link={item.link}
          reload={() => setReloadData(!reloadData)}
        />
      ))
    ) : (
      <NoSearchResults />
    );
  } else if (dataShow === "All") {
    show = loading ? (
      <LoadingSkeleton />
    ) : data1.length > 0 ? (
      data1.map((item: any, idx: number) => {
        return (
          <Card
            key={item._id ?? idx}
            contentId={item._id}
            icon={item.contentType}
            tag={item.tags?.[0]}
            title={item.title}
            link={item.link}
            reload={() => setReloadData(!reloadData)}
          />
        );
      })
    ) : (
      <EmptyState />
    );
  } else if (dataShow === "Youtube") {
    show = loading ? (
      <LoadingSkeleton />
    ) : ytData.length > 0 ? (
      ytData.map((item: any, idx: number) => {
        return (
          <Card
            key={item._id ?? idx}
            contentId={item._id}
            icon={item.contentType}
            tag={item.tags?.[0]}
            title={item.title}
            link={item.link}
            reload={() => setReloadData(!reloadData)}
          />
        );
      })
    ) : (
      <EmptyState />
    );
  } else if (dataShow === "Twitter") {
    show = loading ? (
      <LoadingSkeleton />
    ) : ytData.length > 0 ? (
      ytData.map((item: any, idx: number) => {
        return (
          <Card
            key={item._id ?? idx}
            contentId={item._id}
            icon={item.contentType}
            tag={item.tags?.[0]}
            title={item.title}
            link={item.link}
            reload={() => setReloadData(!reloadData)}
          />
        );
      })
    ) : (
      <EmptyState />
    );
  } else {
    show = loading ? (
      <LoadingSkeleton />
    ) : notionData.length > 0 ? (
      notionData.map((item: any, idx: number) => {
        return (
          <Card
            key={item._id ?? idx}
            contentId={item._id}
            icon={item.contentType}
            tag={item.tags?.[0]}
            title={item.title}
            link={item.link}
            reload={() => setReloadData(!reloadData)}
          />
        );
      })
    ) : (
      <EmptyState />
    );
  }

  async function share() {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please log in first");
        navigate("/");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/get-content`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          credentials: "include",
        }
      );
      const jsonData = await res.json();
      //sharing/generating the link
      if (res.ok) {
        // Encode your data as a query parameter
        const encodedData = encodeURIComponent(JSON.stringify(jsonData.data));
        const frontendBaseUrl =
          import.meta.env.VITE_FRONTEND_BASE_URL || "http://localhost:5173";
        const shareLink = `${frontendBaseUrl}/share/${userId}?data=${encodedData}`;

        navigator.clipboard
          .writeText(shareLink)
          .then(() => {
            alert("Shareable link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
            alert(
              "Failed to copy link to clipboard. Here's the link to share manually:\n" +
              shareLink
            );
          });
      } else {
        alert("Something went wrong while sharing.");
      }
    } catch (err) {
      console.log("Error while sending data");
    }
  }

  const tabLabels: Record<string, string> = {
    "All": "All Notes",
    "Youtube": "YouTube Videos",
    "Twitter": "Tweets",
    "Notion": "Documents"
  };

  function clearSearch() {
    setSearchQuery("");
    setSearchResults(null);
  }

  return (
    <div className="flex h-screen bg-surface-950">
      <SideNavbar
        setData={setData}
        setYTData={setYTData}
        setNitionData={setNitionData}
        data1={data1}
        setDataShow={(tab: string) => {
          setDataShow(tab);
          clearSearch();
        }}
        activeTab={dataShow}
      />
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-surface-950/80 backdrop-blur-xl border-b border-surface-700/30">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-surface-100">
                {searchResults !== null ? "Search Results" : (tabLabels[dataShow] || "All Notes")}
              </h1>
              <p className="text-xs text-surface-500 mt-0.5">
                {searchResults !== null
                  ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${searchQuery}"`
                  : (!loading && data1.length > 0 && dataShow === "All" && `${data1.length} item${data1.length !== 1 ? 's' : ''} saved`)
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search bar */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your brain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-9 pl-10 pr-9 rounded-xl bg-surface-800 border border-surface-700 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 focus:w-80 hover:border-surface-600"
                />
                {/* Loading spinner or clear button */}
                {searchQuery && (
                  isSearching ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-surface-600 border-t-brand-400 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <button
                      onClick={clearSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded text-surface-500 hover:text-surface-300 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )
                )}
              </div>
              <div onClick={share}>
                <Button
                  variant="secondary"
                  size="md"
                  text={"Share Brain"}
                  startIcon={<ShareIcon size="md" />}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                text={"Add Content"}
                startIcon={<PlusIcon size="md" />}
                onClick={() => setModal(!modal)}
              />
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="px-8 py-6">
          <div className="flex flex-wrap gap-5">{show}</div>
        </div>
      </main>
      {modal && (
        <Modal
          onClick={() => setModal(!modal)}
          setModal={setModal}
          setReloadData={() => setReloadData(!reloadData)}
        />
      )}
    </div>
  );
};

export default HomePage;