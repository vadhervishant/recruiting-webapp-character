import { useState, useCallback } from 'react';
import type { SkillCheck, Character } from '../types';
import { calculateModifier } from '../utils/calculations';

export const useSkillChecks = () => {
  const [skillChecks, setSkillChecks] = useState<Record<string, SkillCheck>>({});

  const performSkillCheck = useCallback((character: Character, skill: string, dc: number) => {
    const skillData = character.skills.find(s => s.name === skill);
    if (!skillData) {
      return; // Skill not found
    }

    const modifier = calculateModifier(character.attributes[skillData.attributeModifier]);
    const roll = Math.floor(Math.random() * 20) + 1; // Roll d20
    const total = roll + modifier + skillData.points;
    const success = total >= dc;

    const result = {
      skill: skill,
      dc: dc,
      roll: roll,
      success: success,
      total: total,
      modifier: modifier,
      skillPoints: skillData.points
    };

    setSkillChecks(prev => ({
      ...prev,
      [character.id]: result
    }));
  }, []);

  const updateSkillSelection = useCallback((characterId: string, skill: string) => {
    setSkillChecks(prev => ({ ...prev, [characterId]: { ...prev[characterId], skill } }));
  }, []);

  const updateDC = useCallback((characterId: string, dc: number) => {
    setSkillChecks(prev => ({ ...prev, [characterId]: { ...prev[characterId], dc } }));
  }, []);

  return { skillChecks, performSkillCheck, updateSkillSelection, updateDC };
};
