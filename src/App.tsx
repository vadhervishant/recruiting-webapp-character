import React, { useState } from 'react';
import type { Class, AttributeType } from './types';
import './App.css';
import { useCharacters } from './hooks/useCharacters';
import { useSkillChecks } from './hooks/useSkillChecks';
import { usePartySkillCheck } from './hooks/usePartySkillCheck';
import { CharacterSheet } from './components/CharacterSheet';
import { PartySkillCheck } from './components/PartySkillCheck';

const App = () => {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  
  const { characters, addCharacter, updateAttribute, updateSkill, saveCharacters } = useCharacters();
  const { skillChecks, performSkillCheck, updateSkillSelection, updateDC } = useSkillChecks();
  const { partySkillCheck, performPartySkillCheck } = usePartySkillCheck();

  const handleAttributeChange = (characterId: string, attribute: AttributeType, value: number) => {
    updateAttribute(characterId, attribute, value);
  };

  const handleSkillChange = (characterId: string, skillName: string, value: number) => {
    updateSkill(characterId, skillName, value);
  };

  const handleSkillCheck = (characterId: string, skill: string, dc: number) => {
    const character = characters.find(c => c.id === characterId);
    if (character) {
      performSkillCheck(character, skill, dc);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

       <div className="controls">
          <button onClick={addCharacter}>Add Character</button>
          <button onClick={saveCharacters}>Save Characters</button>
        </div>

      <section className="App-section">
        <div className="characters-container">
          {characters.map(character => {
            return (
              <CharacterSheet
                key={character.id}
                character={character}
                selectedClass={selectedClass}
                skillCheck={skillChecks[character.id]}
                onAttributeChange={(attribute, value) => {
                  handleAttributeChange(character.id, attribute as AttributeType, value);
                }}
                onSkillChange={(skillName, value) => {
                  handleSkillChange(character.id, skillName, value);
                }}
                onClassSelect={setSelectedClass}
                onSkillCheck={(skill, dc) => {
                  handleSkillCheck(character.id, skill, dc);
                }}
                onSkillSelectionChange={(skill) => {
                  updateSkillSelection(character.id, skill);
                }}
                onDCChange={(dc) => {
                  updateDC(character.id, dc);
                }}
              />
            );
          })}
        </div>

        <PartySkillCheck
          characters={characters}
          onPartySkillCheck={performPartySkillCheck}
          partySkillCheck={partySkillCheck}
        />

       
      </section>
    </div>
  );
};

export default App;
