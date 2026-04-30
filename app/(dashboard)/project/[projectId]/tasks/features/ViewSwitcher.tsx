"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function ViewSwitcher({ 
  currentView, 
  projectId 
}: { 
  currentView?: string; 
  projectId: string; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewChange = (view: string) => {
    router.push(`/project/${projectId}/tasks?view=${view}`);
    setIsOpen(false);
  };

  const options = [
    { value: "list", label: "List View", icon: "/icons/listviewicon.svg" },
    { value: "board", label: "Board View", icon: "/icons/viewboardicon.svg" },
  ];

  const selectedOption = options.find(opt => opt.value === currentView) || options[0];

  return (
    <div className="relative inline-block w-48" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center w-full h-12 pl-3 pr-8 bg-white border border-slate-200 rounded-xs shadow-sm hover:bg-slate-50 transition-all focus:ring-2 focus:ring-indigo-500/20"
      >
        <div className="flex items-center gap-2">
          <Image src={selectedOption.icon} alt="" width={16} height={16} />
          <span className="text-sm font-medium text-slate-700">{selectedOption.label}</span>
        </div>

        {/* Arrow Icon  */}
        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xs shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleViewChange(option.value)}
              className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm transition-colors
                ${currentView === option.value 
                  ? "bg-indigo-50 text-indigo-600 font-semibold" 
                  : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              <Image src={option.icon} alt="" width={16} height={16} />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}