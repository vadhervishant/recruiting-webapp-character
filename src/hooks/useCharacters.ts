import { useState, useEffect, useCallback } from 'react';
import type { Character, AttributeType } from '../types';
import { calculateAttributeSum, calculateModifier, calculateTotalSkillPoints } from '../utils/calculations';
import { DEFAULT_CHARACTER, MAX_ATTRIBUTE_SUM } from '../consts';

const API_BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/vadhervishant/character';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([DEFAULT_CHARACTER]);

  const loadCharacters = useCallback(async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      
      if (data && data.body && data.body.length > 0) {

        
        const loadedCharacters = data.body.map((char: any) => {
          if (!Array.isArray(char.skills)) {
            char.skills = DEFAULT_CHARACTER.skills;
          }
          return char;
        });
        setCharacters(loadedCharacters);
      }

    } catch (error) {
      console.error('Error loading characters:', error);
    }
  }, []);

  const saveCharacters = useCallback(async () => {
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characters)
      });
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  }, [characters]);

  const addCharacter = useCallback(() => {
    const newId = (characters.length + 1).toString();
    const newCharacter: Character = {
      ...DEFAULT_CHARACTER,
      id: newId,
      name: `Character ${newId}`,
      skills: [...DEFAULT_CHARACTER.skills]
    };
    setCharacters(prev => [...prev, newCharacter]);
  }, [characters.length]);

  const updateAttribute = useCallback((characterId: string, attribute: AttributeType, value: number) => {
    setCharacters(prev => {
      return prev.map(char => {
        if (char.id !== characterId) {
          return char;
        }
        
        const newAttributes = { ...char.attributes };
        const currentSum = calculateAttributeSum(newAttributes);
        
        if (value > 0 && currentSum + value > MAX_ATTRIBUTE_SUM) {
          return char; 
        }
        if (value < 0 && newAttributes[attribute] + value < 0) {
          return char; 
        }
        
        newAttributes[attribute] = newAttributes[attribute] + value;
        return { ...char, attributes: newAttributes };
      });
    });
  }, []);

  const updateSkill = useCallback((characterId: string, skillName: string, value: number) => {
    setCharacters(prev => {
      return prev.map(char => {
        if (char.id !== characterId) {
          return char;
        }
        
        if (!Array.isArray(char.skills)) {
          return char;
        }

        const intModifier = calculateModifier(char.attributes.Intelligence);
        const totalPoints = calculateTotalSkillPoints(intModifier);
        const currentSpentPoints = char.skills.reduce((sum, skill) => sum + skill.points, 0);
        const skillToUpdate = char.skills.find(skill => skill.name === skillName);
        
        if (!skillToUpdate) {
          return char;
        }
        
        if (value < 0 && skillToUpdate.points === 0) {
          return char; 
        }
        
        if (value > 0 && currentSpentPoints + value > totalPoints) {
          return char; 
        }

        const updatedSkills = char.skills.map(skill => {
          if (skill.name === skillName) {
            return { ...skill, points: skill.points + value };
          }
          return skill;
        });

        return { ...char, skills: updatedSkills };
      });
    });
  }, []);

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  return { characters, addCharacter, updateAttribute, updateSkill, saveCharacters };
};
