import React from 'react';
import { X, GitBranch, GitCommit, CheckCircle2, ExternalLink, Terminal, Copy, Check } from 'lucide-react';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const repoUrl = "https://github.com/jutt12568/mahnoor-summer-lawn";
  const cloneCmd = `git clone ${repoUrl}.git`;

  const copyClone = () => {
    navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white w-full max-w-lg rounded-none shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 font-display uppercase tracking-wider">
                GitHub Repository Connected
              </h3>
              <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                <span>Live & Synchronized</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-stone-50 border border-stone-200 p-4 space-y-2.5 text-xs text-stone-700">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">GitHub User:</span>
              <span className="font-mono font-semibold text-stone-900">@jutt12568</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Target Repository:</span>
              <span className="font-mono font-medium text-stone-900">mahnoor-summer-lawn</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Branch:</span>
              <span className="font-mono text-stone-800 flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-stone-500" />
                <span>main</span>
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-stone-200">
              <span className="text-stone-500">Status:</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>All files committed and pushed</span>
              </span>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-stone-500" />
              <span>Clone Repository Locally</span>
            </div>
            <div className="flex items-center bg-stone-900 text-stone-100 p-2.5 font-mono text-xs overflow-x-auto justify-between">
              <code className="select-all text-[11px] truncate mr-2">{cloneCmd}</code>
              <button
                onClick={copyClone}
                className="text-stone-400 hover:text-white transition-colors p-1 shrink-0"
                title="Copy clone command"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>View On GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium py-2.5 px-4 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
