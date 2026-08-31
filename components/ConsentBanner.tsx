"use client";

import { useEffect, useState } from "react";
import { Terminal, X } from "lucide-react";

const STORAGE_KEY = "gi-consent-ack";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private mode etc.) — show the banner anyway.
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!visible) return null;

  return (
    <div className="glass-panel fixed bottom-4 left-4 right-4 z-50 rounded-lg border-l-4 border-l-secondary-container p-4 shadow-2xl md:left-auto md:right-margin-desktop md:w-[450px]">
      <div className="flex items-start gap-4">
        <div className="rounded-sm bg-secondary-container/10 p-2">
          <Terminal size={20} className="text-secondary-container" />
        </div>
        <div className="flex-grow">
          <h4 className="mb-1 font-body text-label-caps text-secondary-container">DATA DISCLOSURE PROTOCOL</h4>
          <p className="mb-4 font-body text-sm text-on-surface-variant">
            We use cookies for technical telemetry and analytics to optimize platform performance.
          </p>
          <div className="flex gap-3">
            <button onClick={dismiss} className="btn-primary rounded-sm px-3 py-1.5 font-body text-[10px] uppercase">
              Accept Protocol
            </button>
            <a
              href="/privacy"
              className="font-body text-[10px] uppercase text-outline transition-colors hover:text-on-surface"
            >
              Manage Preferences
            </a>
          </div>
        </div>
        <button aria-label="Dismiss" onClick={dismiss} className="text-outline transition-colors hover:text-on-surface">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
