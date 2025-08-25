import { useState, useCallback } from 'react';
import type { PartySkillCheckResult, Character } from '../types';
import { calculateModifier } from '../utils/calculations';

export const usePartySkillCheck = () => {
  const [partySkillCheck, setPartySkillCheck] = useState<PartySkillCheckResult | null>(null);

  const performPartySkillCheck = useCallback((characters: Character[], skill: string, dc: number) => {
    if (characters.length === 0) return;

    let bestCharacter: Character | null = null;
    let bestTotal = -Infinity;
    let bestModifier = 0;
    let bestSkillPoints = 0;

    characters.forEach(character => {
      const skillData = character.skills.find(s => s.name === skill);
      if (skillData) {
        const modifier = calculateModifier(character.attributes[skillData.attributeModifier]);
        const total = modifier + skillData.points;
        
        if (total > bestTotal) {
          bestTotal = total;
          bestCharacter = character;
          bestModifier = modifier;
          bestSkillPoints = skillData.points;
        }
      }
    });

    if (!bestCharacter) return;

    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + bestTotal;
    const success = total >= dc;

    setPartySkillCheck({
      skill, dc, roll, success, selectedCharacter: bestCharacter, 
      total, modifier: bestModifier, skillPoints: bestSkillPoints
    });
  }, []);

  return { partySkillCheck, performPartySkillCheck };
};
