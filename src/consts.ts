import type { Attributes, AttributeType, Class, Character } from './types';

export const ATTRIBUTE_LIST: AttributeType[] = [
  'Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'
];

export const DEFAULT_ATTRIBUTES: Attributes = {
  Strength: 10, 
  Dexterity: 10, 
  Constitution: 10,
  Intelligence: 10, 
  Wisdom: 10, 
  Charisma: 10
};

export const MAX_ATTRIBUTE_SUM = 70;
export const MIN_ATTRIBUTE_VALUE = 0;



export const CLASS_LIST = [
  {
    name: 'Barbarian' as Class,
    requirements: { Strength: 14, Dexterity: 9, Constitution: 9, Intelligence: 9, Wisdom: 9, Charisma: 9 } as Attributes
  },
  {
    name: 'Wizard' as Class,
    requirements: { Strength: 9, Dexterity: 9, Constitution: 9, Intelligence: 14, Wisdom: 9, Charisma: 9 } as Attributes
  },
  {
    name: 'Bard' as Class,
    requirements: { Strength: 9, Dexterity: 9, Constitution: 9, Intelligence: 9, Wisdom: 9, Charisma: 14 } as Attributes
  }
];


export const SKILL_LIST = [
  { name: 'Acrobatics', attributeModifier: 'Dexterity' as AttributeType },
  { name: 'Animal Handling', attributeModifier: 'Wisdom' as AttributeType },
  { name: 'Arcana', attributeModifier: 'Intelligence' as AttributeType },
  { name: 'Athletics', attributeModifier: 'Strength' as AttributeType },
  { name: 'Deception', attributeModifier: 'Charisma' as AttributeType },
  { name: 'History', attributeModifier: 'Intelligence' as AttributeType },
  { name: 'Insight', attributeModifier: 'Wisdom' as AttributeType },
  { name: 'Intimidation', attributeModifier: 'Charisma' as AttributeType },
  { name: 'Investigation', attributeModifier: 'Intelligence' as AttributeType },
  { name: 'Medicine', attributeModifier: 'Wisdom' as AttributeType },
  { name: 'Nature', attributeModifier: 'Intelligence' as AttributeType },
  { name: 'Perception', attributeModifier: 'Wisdom' as AttributeType },
  { name: 'Performance', attributeModifier: 'Charisma' as AttributeType },
  { name: 'Persuasion', attributeModifier: 'Charisma' as AttributeType },
  { name: 'Religion', attributeModifier: 'Intelligence' as AttributeType },
  { name: 'Sleight of Hand', attributeModifier: 'Dexterity' as AttributeType },
  { name: 'Stealth', attributeModifier: 'Dexterity' as AttributeType },
  { name: 'Survival', attributeModifier: 'Wisdom' as AttributeType }
];



export const DEFAULT_CHARACTER: Character = {
  id: '1',
  name: 'Character 1',
  attributes: DEFAULT_ATTRIBUTES,
  skills: SKILL_LIST.map(skill => ({
    name: skill.name,
    attributeModifier: skill.attributeModifier,
    points: 0
  }))
};