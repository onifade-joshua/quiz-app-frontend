import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 sm:max-w-md">
        {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
