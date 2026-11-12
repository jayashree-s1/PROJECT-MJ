import React, { useState, useEffect } from 'react';
import {
  isEditMode,
  setEditModeActive,
  getCustomMediaMap,
  getCustomTextMap,
  clearAllCustomEdits,
  exportAllCustomData,
} from '../config';
import { Settings, Download, Trash2, Check, X, Copy, Sparkles, Heart } from 'lucide-react';

export const EditToolbar: React.FC = () => {
  const [active, setActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mediaCount, setMediaCount] = useState(0);
  const [textCount, setTextCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const updateCounts = () => {
    setMediaCount(Object.keys(getCustomMediaMap()).length);
    setTextCount(Object.keys(getCustomTextMap()).length);
  };

  useEffect(() => {
    setActive(isEditMode());
    updateCounts();

    const handleEditChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      if (customEvent.detail) {
        setActive(customEvent.detail.active);
      }
    };

    const handleMediaUpdate = () => updateCounts();
    const handleTextUpdate = () => updateCounts();

    window.addEventListener('anniversary:edit-mode-changed', handleEditChange);
    window.addEventListener('anniversary:media-updated', handleMediaUpdate);
    window.addEventListener('anniversary:text-updated', handleTextUpdate);

    return () => {
      window.removeEventListener('anniversary:edit-mode-changed', handleEditChange);
      window.removeEventListener('anniversary:media-updated', handleMediaUpdate);
      window.removeEventListener('anniversary:text-updated', handleTextUpdate);
    };
  }, []);

  const toggleEditMode = () => {
    const next = !active;
    setActive(next);
    setEditModeActive(next);
  };

  const handleCopyExport = () => {
    const data = exportAllCustomData();
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBackup = () => {
    const data = exportAllCustomData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'anniversary-edits-and-photos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 select-none">
        <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-xl border border-rose-200">
          <button
            type="button"
            onClick={toggleEditMode}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              active
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
            }`}
          >
            <Settings className={`w-3.5 h-3.5 ${active ? 'animate-spin-slow' : ''}`} />
            <span>{active ? 'Edit Mode: ON' : 'Edit Mode: OFF'}</span>
          </button>

          {active && (
            <>
              <div className="text-[11px] text-rose-700 hidden sm:flex items-center space-x-1 font-medium pl-1">
                <span>{mediaCount} photos</span>
                <span>•</span>
                <span>{textCount} texts edited</span>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow transition-colors"
                title="Save & Export your edits"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save & Bake In</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all your uploads and text edits?')) {
                    clearAllCustomEdits();
                  }
                }}
                className="p-1.5 rounded-full text-rose-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                title="Reset all edits"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Save & Bake In Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-gray-800">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-rose-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950">
                Permanently Save Your Edits
              </h3>
            </div>

            <p className="font-sans text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
              When you edit and upload photos in the browser, they are saved safely in your current browser. To make sure they stay on the website permanently (so Baby sees them on his phone with the edit mode removed), you can copy or download your edits here:
            </p>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200/80 mb-5">
              <div className="flex justify-between items-center text-xs text-rose-800 font-semibold mb-2">
                <span>Summary:</span>
                <span>
                  {mediaCount} Photos • {textCount} Texts
                </span>
              </div>
              <p className="text-xs text-rose-900/80 leading-relaxed font-sans">
                Click <strong>"Copy All Edits"</strong> and tell me:
                <br />
                <code className="bg-white/80 px-2 py-0.5 rounded text-rose-700 font-mono text-[11px] block mt-1.5 border border-rose-200">
                  "I finished editing, here is my export data: [paste here]. Now remove the edit mode and save it permanently!"
                </code>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleCopyExport}
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy All Edits'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadBackup}
                className="w-full sm:flex-1 py-3 px-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download .JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

