
import { useEffect, useState, type JSX } from "react";
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
  let show: JSX.Element | JSX.Element[] = data1;

  useEffect(() => {
    fetchingData();
  }, [reloadData]);

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

  if (dataShow === "All") {
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

  return (
    <div className="flex h-screen bg-surface-950">
      <SideNavbar
        setData={setData}
        setYTData={setYTData}
        setNitionData={setNitionData}
        data1={data1}
        setDataShow={setDataShow}
        activeTab={dataShow}
      />
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-surface-950/80 backdrop-blur-xl border-b border-surface-700/30">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-surface-100">{tabLabels[dataShow] || "All Notes"}</h1>
              <p className="text-xs text-surface-500 mt-0.5">
                {!loading && data1.length > 0 && dataShow === "All" && `${data1.length} item${data1.length !== 1 ? 's' : ''} saved`}
              </p>
            </div>
            <div className="flex gap-2.5">
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