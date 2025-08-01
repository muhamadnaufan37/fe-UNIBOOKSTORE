import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const identityTypes = [
  { label: "KTP", value: 1 },
  { label: "NPWP", value: 2 },
];

export default function DropdownInputWithText() {
  const [selectedType, setSelectedType] = useState("KTP");
  const [isOpen, setIsOpen] = useState(false);
  const [identityNumber, setIdentityNumber] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative flex border border-gray-300 rounded-md">
        {/* Dropdown Selector */}
        <div className="relative bg-gray-100 z-10 rounded-l-md">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center px-3 py-2 text-sm text-gray-700 focus:outline-none"
          >
            {selectedType}
            <ChevronDownIcon className="w-4 h-4 ml-1 text-green-600" />
          </button>

          {/* Dropdown List with Animation */}
          <div
            className={`absolute left-0 mt-1 w-32 z-20 bg-white rounded-md shadow-md text-sm transition-all duration-200 origin-top transform ${
              isOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <ul>
              {identityTypes.map((type) => (
                <li
                  key={type.value}
                  onClick={() => {
                    setSelectedType(type.label);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {type.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
          placeholder={`Masukkan Nomor ${selectedType}`}
          className="flex-1 px-3 py-2 focus:outline-none text-sm placeholder-gray-400 rounded-r-md"
        />
      </div>
    </div>
  );
}
