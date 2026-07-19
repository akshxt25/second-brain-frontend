import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";

const SharedPage = () => {
  const location = useLocation();
  const [sharedData, setSharedData] = useState<any[]>([]);

  useEffect(() => {
    // First try to get data from location state (if navigated within app)
    if (location.state?.shared) {
      setSharedData(location.state.shared);
    } else {
      // If no state, try to get from URL query params
      const queryParams = new URLSearchParams(location.search);
      const dataParam = queryParams.get('data');
      if (dataParam) {
        try {
          const decodedData = JSON.parse(decodeURIComponent(dataParam));
          setSharedData(decodedData);
        } catch (e) {
          console.error("Failed to parse shared data", e);
        }
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface-950/80 backdrop-blur-xl border-b border-surface-700/30">
        <div className="flex items-center gap-4 px-8 py-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-100">Shared Brain</h1>
            <p className="text-xs text-surface-500">
              {sharedData.length > 0 ? `${sharedData.length} item${sharedData.length !== 1 ? 's' : ''} shared with you` : 'Someone shared their brain with you'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        <div className="flex flex-wrap gap-5">
          {sharedData.length > 0 ? (
            sharedData.map((item: any, idx: number) => (
              <Card
                key={idx}
                icon={item.contentType}
                tag={item.tags?.[0]}
                title={item.title}
                link={item.link}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 w-full animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-surface-800 border border-surface-700/50 flex items-center justify-center mb-5">
                <svg className="w-10 h-10 text-surface-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-surface-300 mb-1">No shared content found</h3>
              <p className="text-sm text-surface-500">This shared link might have expired or be invalid.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedPage;