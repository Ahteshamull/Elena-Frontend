import React, { useRef } from 'react';
import { CloudUpload } from 'lucide-react';
import { cn } from '../../utils/cn';

const UploadArea = ({ className, title, subtitle, icon: Icon = CloudUpload, onFileSelect, selectedFile, accept, ...props }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div 
      className={cn(
        "relative w-full border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-accent hover:bg-[#FAFAFA] transition-all group",
        selectedFile ? "border-accent bg-accent/5" : "border-gray-200",
        className
      )} 
      onClick={handleClick}
      {...props}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept={accept}
      />
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
        selectedFile ? "bg-accent text-white" : "bg-gray-50 text-gray-400 group-hover:text-accent group-hover:bg-accent/10"
      )}>
        <Icon size={24} />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-primary-900 mb-1">{selectedFile ? selectedFile.name : title}</p>
        <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-[200px] mx-auto truncate">
          {selectedFile ? 'Click to change file' : subtitle}
        </p>
      </div>
    </div>
  );
};

export { UploadArea };
