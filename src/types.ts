export type AttributeType = 'Strength' | 'Dexterity' | 'Constitution' | 'Intelligence' | 'Wisdom' | 'Charisma';
export type Class = 'Barbarian' | 'Wizard' | 'Bard';

export interface Attributes {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
}

export interface Skill {
  name: string;
  attributeModifier: AttributeType;
  points: number;
}

export interface Character {
  id: string;
  name: string;
  attributes: Attributes;
  skills: Skill[];
}
