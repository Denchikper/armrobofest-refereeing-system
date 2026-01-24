import { useState } from "react";
import Section from "./OlympiadSection";

const OlympiadInterface = ({token, logout, navigate}) => {
  const [expandedSections, setExpandedSections] = useState({
    robotics: false,
    threeatlon: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
      <div className="max-w-4xl mx-auto z-40">
          <Section
            token={token}
            logout={logout}
            navigate={navigate}
            title="ОЛИМПИАДА ПО РОБОТОТЕХНИКЕ"
            isExpanded={expandedSections.robotics}
            onToggle={() => toggleSection('robotics')}
            lineColor="#3AC318"
            sectionId="robotics"
          />
          

          <Section
            token={token}
            logout={logout}
            navigate={navigate}
            title="СВОБОДНАЯ КАТЕГОРИЯ «ТРИАТЛОН»"
            isExpanded={expandedSections.threeatlon}
            onToggle={() => toggleSection('threeatlon')}
            lineColor="#00C0DA"
            sectionId="threeatlon"
          />
    </div>
  );
};

export default OlympiadInterface;