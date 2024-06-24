import React from "react";

type NavbarProps = {
  sections: string[];
  currentSection: string;
  setCurrentSection: (section: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({
  sections,
  currentSection,
  setCurrentSection,
}) => {
  return (
    <div className="flex justify-center overflow-x-auto space-x-4 bg-white-100 p-4">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setCurrentSection(section)}
          className={`px-3 py-2 rounded-md text-sm md:text-base ${
            currentSection === section
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
