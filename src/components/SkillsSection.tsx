
import React from 'react';
import type { Skill, Attributes } from '../types';
import { calculateModifier, calculateTotalSkillPoints } from '../utils/calculations';

interface Props  {
  skills: Skill[];
  attributes: Attributes;
  onSkillChange: (skillName: string, value: number) => void;
};

export const SkillsSection = ({ skills, attributes, onSkillChange }: Props) => {
  if (!Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="skills-section">
        <h3>Skills</h3>
        {!Array.isArray(skills) || skills.length === 0 ? <div>No skills available</div> : null}
      </div>
    );
  }

  const totalPoints = calculateTotalSkillPoints(calculateModifier(attributes.Intelligence));
  const spentPoints = skills.reduce((sum, s) => sum + s.points, 0);
  const remainingPoints = totalPoints - spentPoints;

  return (
    <div className="skills-section">
      <h3>Skills (Points Available: {remainingPoints}/{totalPoints})</h3>
      
      {
        skills.map(skill => {
        const mod = calculateModifier(attributes[skill.attributeModifier]);
        return (
          <div key={skill.name} className="skill-row">
            <span>{skill.name} - points: {skill.points}</span>
            <span>modifier ({skill.attributeModifier}): {mod}</span>
            <span>total: {mod + skill.points}</span>
            <button onClick={() => onSkillChange(skill.name, -1)} disabled={skill.points <= 0}>-</button>
            <button onClick={() => onSkillChange(skill.name, 1)} disabled={remainingPoints <= 0}>+</button>
          </div>
        );
      })}
    </div>
  );
};
