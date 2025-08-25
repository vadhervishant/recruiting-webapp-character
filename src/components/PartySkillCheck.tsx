import React, { useState } from 'react';
import type { Character, PartySkillCheckResult } from '../types';
import { SKILL_LIST } from '../consts';

interface Props {
  characters: Character[];
  onPartySkillCheck: (characters: Character[], skill: string, dc: number) => void;
  partySkillCheck: PartySkillCheckResult | null;
}

export const PartySkillCheck = ({ characters, onPartySkillCheck, partySkillCheck }: Props) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [dcValue, setDCValue] = useState('');

  const handleRoll = () => {
    if (!selectedSkill || !dcValue || isNaN(parseInt(dcValue))) return;
    const dc = parseInt(dcValue);
    onPartySkillCheck(characters, selectedSkill, dc);
  };

  return (
    <div className="party-skill-check">
      <h3>Party Skill Check</h3>
      <select onChange={(e) => setSelectedSkill(e.target.value)} value={selectedSkill}>
        <option value="">Choose a skill...</option>
        {SKILL_LIST.map(skill => (
          <option key={skill.name} value={skill.name}>{skill.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="DC"
        value={dcValue}
        onChange={(e) => setDCValue(e.target.value)}
      />

      <button onClick={handleRoll} disabled={!selectedSkill || !dcValue}>Roll</button>

      {partySkillCheck && (
        <div>
          <div>Selected Character: {partySkillCheck.selectedCharacter.name}</div>
          <div>Roll: {partySkillCheck.roll}</div>
          <div>Result: {partySkillCheck.success ? 'Success!' : 'Failure'}</div>
        </div>
      )}
    </div>
  );
};
