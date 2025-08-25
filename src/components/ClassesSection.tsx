import React, { useState } from 'react';
import type { Attributes, Class } from '../types';
import { meetsClassRequirements } from '../utils/calculations';
import { CLASS_LIST, ATTRIBUTE_LIST } from '../consts';

interface Props {
  attributes: Attributes;
  onClassSelect: (selectedClass: Class | null) => void;
  selectedClass: Class | null;
}

export const ClassesSection = ({ attributes, onClassSelect, selectedClass }: Props) => {
  const [expandedClass, setExpandedClass] = useState<Class | null>(null);

  const handleClassClick = (className: Class) => {
    if (expandedClass === className) {
      setExpandedClass(null);
      onClassSelect(null);
    } else {
      setExpandedClass(className);
      onClassSelect(className);
    }
  };

  return (
    <div className="classes-section">
      <h3>Classes</h3>
      {CLASS_LIST.map(({ name, requirements }) => {
        const meets = meetsClassRequirements(attributes, requirements);
        const isExpanded = expandedClass === name;
        
        return (
          <div 
            key={name}
            className={`class-row ${meets ? 'meets-requirements' : ''}`}
            onClick={() => handleClassClick(name)}
          >
            <span>{name}</span>
            {isExpanded && (
              <div className="requirements">
                {ATTRIBUTE_LIST.map(attr => (
                  <div key={attr}>{attr}: {requirements[attr]}</div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
