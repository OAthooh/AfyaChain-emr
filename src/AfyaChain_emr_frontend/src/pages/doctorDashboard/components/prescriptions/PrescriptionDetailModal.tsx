import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescriptionId: string | null;
}

export function PrescriptionDetailModal({ isOpen, onClose, prescriptionId }: ModalProps) {
  if (!isOpen) return null;

  // TODO: Use prescriptionId to fetch prescription details

  console.log('Loading prescription details for:', prescriptionId);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

