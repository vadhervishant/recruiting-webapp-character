import React, { useState } from 'react';
import type { Character, SkillCheck } from '../types';
import { SKILL_LIST } from '../consts';

interface Props {
  character: Character;
  skillCheck: SkillCheck | undefined;
  onSkillCheck: (skill: string, dc: number) => void;
  onSkillSelectionChange: (skill: string) => void;
  onDCChange: (dc: number) => void;
}

export const SkillCheckSection = ({ character, skillCheck, onSkillCheck, onSkillSelectionChange, onDCChange }: Props) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [dcValue, setDCValue] = useState('');

  const handleSkillChange = (skill: string) => {
    setSelectedSkill(skill);
    onSkillSelectionChange(skill);
  };

  const handleDCChange = (dc: string) => {
    setDCValue(dc);
    const dcNum = parseInt(dc);
    if (!isNaN(dcNum)) {
      onDCChange(dcNum);
    }
  };

  const handleRoll = () => {
    if (selectedSkill && dcValue && !isNaN(parseInt(dcValue))) {
      onSkillCheck(selectedSkill, parseInt(dcValue));
    }
  };

  return (
    <div className="skill-check-section">
      <h3>Skill Check</h3>
      
      <select onChange={(e) => handleSkillChange(e.target.value)} value={selectedSkill}>
        <option value="">Choose a skill...</option>
        {SKILL_LIST.map(skill => (
          <option key={skill.name} value={skill.name}>{skill.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="DC"
        value={dcValue}
        onChange={(e) => handleDCChange(e.target.value)}
      />

      <button onClick={handleRoll} disabled={!selectedSkill || !dcValue}>Roll</button>

      {skillCheck?.roll && (
        <div>
          Roll: {skillCheck.roll}<br />
          Result: {skillCheck.success ? 'Success!' : 'Failure'}
        </div>
      )}
    </div>
  );
};
