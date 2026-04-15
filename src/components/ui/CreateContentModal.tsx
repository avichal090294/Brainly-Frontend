import React, { useEffect } from "react";

interface CreateContentModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const CreateContentModal: React.FC<CreateContentModalProps> = ({
  open,
  title,
  onClose,
  children,
}) => {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-4"
      >
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
        <div>{children ?? <div>hi there</div>}</div>
      </div>
    </div>
  );
};
