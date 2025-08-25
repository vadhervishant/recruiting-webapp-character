import type { Attributes } from '../types';

export const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

export const calculateTotalSkillPoints = (intelligenceModifier: number) => 10 + (4 * intelligenceModifier);

export const calculateAttributeSum = (attributes: Attributes) => 
  Object.values(attributes).reduce((sum, value) => sum + value, 0);

export const meetsClassRequirements = (attributes: Attributes, classRequirements: Attributes) => 
  Object.keys(attributes).every(attr => attributes[attr as keyof Attributes] >= classRequirements[attr as keyof Attributes]);
