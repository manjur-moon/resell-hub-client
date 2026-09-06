"use client";

import { useEffect } from "react";

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0f0c0a]/55 px-4 py-4 backdrop-blur-[1px] sm:py-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="my-auto w-full max-w-md rounded-lg border border-[#ded5cb] bg-[#fbf8f4] p-5 shadow-2xl dark:border-[#3a2f28] dark:bg-[#17120f] sm:p-6"
      >
        <div className="mb-5 h-1 w-10 rounded-full bg-orange-500" />
        <p className="eyebrow">Confirmation</p>
        <h2 id="confirm-dialog-title" className="mt-2 text-2xl font-semibold tracking-tight text-[#211a16] dark:text-white">{title}</h2>
        <p id="confirm-dialog-description" className="mt-3 leading-6 text-[#6f6259] dark:text-[#c9bbb1]">{message}</p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={loading} className="btn-secondary" autoFocus>
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
