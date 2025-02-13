import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface CompanyLogoUploadProps {
  logoUrl: string;
  onFileSelect: (file: File) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const CompanyLogoUpload: React.FC<CompanyLogoUploadProps> = ({
  logoUrl,
  onFileSelect,
  inputRef
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(logoUrl);

  const handleFileSelect = (file: File) => {
    // Create a temporary URL for the selected file
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  // Cleanup the temporary URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== logoUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, logoUrl]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Company Logo</label>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        <input
          type="file"
          ref={inputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          accept="image/*"
          className="hidden"
        />
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Company logo preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Drag and drop your logo here, or{' '}
                  <span className="text-yellow-600 font-medium">browse</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};