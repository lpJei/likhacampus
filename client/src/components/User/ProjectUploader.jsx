"use client";
import { Upload, X } from "lucide-react";
import { useState } from "react";

const Uploader = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const MAX_FILES = 4;

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const mapped = selected.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));
    const updated = [...files, ...mapped];

    if (updated.length > MAX_FILES) {
      // Error if num of updated is greater than max files
      setError(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    setError("");
    setFiles(updated);
    onFilesChange?.(updated); // Send to parent
  };

  const removeFile = (id) => {
    const updated = files.filter((f) => f.id !== id);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* FILE INPUT */}
        <div className="border-2 border-dashed border-base-300 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <Upload className="w-6 h-6 opacity-60 mb-2" />
          <p className="font-medium">Drop or select images</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="file-input file-input-bordered mt-3 w-full max-w-xs"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* PREVIEW */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((f) => (
              <div key={f.id} className="relative rounded-md overflow-hidden">
                <img
                  src={f.preview}
                  alt={f.file.name}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => removeFile(f.id)}
                  className="btn btn-xs btn-circle absolute top-1 right-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Uploader;
