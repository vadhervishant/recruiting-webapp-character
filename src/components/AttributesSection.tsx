import React from 'react';
import type { Attributes, AttributeType } from '../types';
import { calculateModifier } from '../utils/calculations';
import { ATTRIBUTE_LIST, MAX_ATTRIBUTE_SUM } from '../consts';

interface Props {
  attributes: Attributes;
  onAttributeChange: (attribute: AttributeType, value: number) => void;
  totalAttributes: number;
  maxAttributes: number;
}

export const AttributesSection = ({ attributes, onAttributeChange, totalAttributes, maxAttributes }: Props) => (
  <div className="attributes-section">
    <h3>Attributes</h3>
    <div>Total: {totalAttributes}/{maxAttributes}</div>
    
    {ATTRIBUTE_LIST.map(attr => {
      const value = attributes[attr];
      const modifier = calculateModifier(value);
      
      return (
        <div key={attr} className="attribute-row">
          <span>{attr}: {value}</span>
          <span>Modifier: {modifier >= 0 ? '+' : ''}{modifier}</span>
          <button onClick={() => onAttributeChange(attr, -1)} disabled={value <= 0}>-</button>
          <button onClick={() => onAttributeChange(attr, 1)} disabled={totalAttributes >= MAX_ATTRIBUTE_SUM}>+</button>
        </div>
      );
    })}
  </div>
);
