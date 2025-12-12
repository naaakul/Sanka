"use client";

import React, { useEffect, useState, memo } from "react";
import { CodeConfig } from "@/lib/types/codeChat.types";

interface PreviewPaneProps {
  version: string | null;
  config: CodeConfig;
  previewCache: Record<string, string>;
  setPreviewCache: (
    cb: (prev: Record<string, string>) => Record<string, string>
  ) => void;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({
  version,
  config,
  previewCache,
  setPreviewCache,
}) => {
  const [loading, setLoading] = useState(false);

  // cached URL if exists
  const previewUrl = version ? previewCache[version] : null;

  useEffect(() => {
    if (!version) return;

    // already has URL → don't re-generate sandbox
    if (previewCache[version]) return;

    const runSandbox = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/generate/code/sandbox", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        });

        const data = await res.json();

        if (data.success) {
          setPreviewCache((prev) => ({
            ...prev,
            [version]: data.previewUrl,
          }));
        } else {
          console.error("Sandbox error:", data.error);
        }
      } catch (err) {
        console.error("Request failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (config?.files?.length > 0) {
      runSandbox();
    }
  }, [version, config]);

  return (
    <div className="h-full bg-neutral-900 flex flex-col">
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
            Generating preview...
          </div>
        )}

        {!loading && previewUrl && (
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        )}

        {!loading && !previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-red-400">
            Failed to load preview
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PreviewPane);
