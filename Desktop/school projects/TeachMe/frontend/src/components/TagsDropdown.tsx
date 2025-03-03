import React, { useState, useRef, useEffect } from "react";

interface Tag {
  title: string;
  objectID: string;
}

interface TagsDropdownProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  disabled?: boolean;
}

const TagsDropdown: React.FC<TagsDropdownProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
  disabled = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (): void => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const selectTag = (tag: Tag): void => {
    // Only add the tag if it's not already selected
    if (!selectedTags.some((t) => t.objectID === tag.objectID)) {
      const updatedTags = [...selectedTags, tag];
      onTagsChange(updatedTags);
    }
  };

  const removeTag = (tagId: string): void => {
    const updatedTags = selectedTags.filter((tag) => tag.objectID !== tagId);
    onTagsChange(updatedTags);
  };

  return (
    <div
      className={`flex flex-col items-center relative ${
        disabled ? "opacity-50" : ""
      }`}
      ref={dropdownRef}
    >
      <div className="w-full">
        <div className="p-1 flex border border-gray-200 bg-white rounded">
          <div className="flex flex-auto flex-wrap">
            {selectedTags.map((tag) => (
              <div
                key={tag.objectID}
                className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 border border-teal-300"
              >
                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                  {tag.title}
                </div>
                <div className="flex flex-auto flex-row-reverse">
                  <div onClick={() => removeTag(tag.objectID)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-1">
              <input
                placeholder="Select tags"
                className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                onClick={toggleDropdown}
                readOnly
                disabled={disabled}
              />
            </div>
          </div>

          <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
            <button
              className={`cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={toggleDropdown}
              disabled={disabled}
              type="button"
              aria-label="Toggle tags dropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`feather ${
                  isDropdownOpen ? "feather-chevron-up" : "feather-chevron-down"
                } w-4 h-4`}
              >
                <polyline
                  points={isDropdownOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
                ></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isDropdownOpen && !disabled && (
        <div
          className="absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select overflow-y-auto"
          style={{ top: "100%", maxHeight: "300px" }}
        >
          <div className="flex flex-col w-full">
            {availableTags.length > 0 ? (
              availableTags.map((tag) => (
                <div
                  key={tag.objectID}
                  className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100"
                  onClick={() => selectTag(tag)}
                >
                  <div
                    className={`flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative ${
                      selectedTags.some((t) => t.objectID === tag.objectID)
                        ? "border-teal-600"
                        : "hover:border-teal-100"
                    }`}
                  >
                    <div className="w-full items-center flex">
                      <div className="mx-2 leading-6">{tag.title}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">
                No tags available for this category
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagsDropdown;
