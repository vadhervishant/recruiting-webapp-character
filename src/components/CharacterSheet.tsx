import React from 'react';
import type { Character, Class, SkillCheck } from '../types';
import { calculateAttributeSum } from '../utils/calculations';
import { AttributesSection } from './AttributesSection';
import { SkillsSection } from './SkillsSection';
import { ClassesSection } from './ClassesSection';
import { SkillCheckSection } from './SkillCheckSection';
import { MAX_ATTRIBUTE_SUM } from '../consts';

interface Props {
  character: Character;
  selectedClass: Class | null;
  skillCheck: SkillCheck | undefined;
  onAttributeChange: (attribute: string, value: number) => void;
  onSkillChange: (skillName: string, value: number) => void;
  onClassSelect: (selectedClass: Class | null) => void;
  onSkillCheck: (skill: string, dc: number) => void;
  onSkillSelectionChange: (skill: string) => void;
  onDCChange: (dc: number) => void;
}

export const CharacterSheet = ({ 
  character, selectedClass, skillCheck, onAttributeChange, onSkillChange, 
  onClassSelect, onSkillCheck, onSkillSelectionChange, onDCChange 
}: Props) => {
  const totalAttributes = calculateAttributeSum(character.attributes);

  return (
    <div className="character-sheet">
      <h2>{character.name}</h2>

      <AttributesSection
        attributes={character.attributes}
        onAttributeChange={(attribute, value) => onAttributeChange(attribute, value)}
        totalAttributes={totalAttributes}
        maxAttributes={MAX_ATTRIBUTE_SUM}
      />

      <ClassesSection
        attributes={character.attributes}
        onClassSelect={onClassSelect}
        selectedClass={selectedClass}
      />

      <SkillsSection
        skills={character.skills}
        attributes={character.attributes}
        onSkillChange={onSkillChange}
      />

      <SkillCheckSection
        character={character}
        skillCheck={skillCheck}
        onSkillCheck={onSkillCheck}
        onSkillSelectionChange={onSkillSelectionChange}
        onDCChange={onDCChange}
      />
    </div>
  );
};
