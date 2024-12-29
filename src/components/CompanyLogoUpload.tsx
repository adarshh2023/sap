import React from 'react';
import { Upload } from 'lucide-react';

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
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Company Logo</label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Logo
        </button>
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Company logo preview"
            className="ml-4 h-12 w-12 rounded-full object-cover"
          />
        )}
      </div>
    </div>
  );
};