import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { Container } from './styles';

export default function TechListWithRedux() {
  const [newTech, setNewTech] = useState('');

  const dispatch = useDispatch();
  const techs = useSelector(state => state.techs)
  const techs2 = useSelector(state => state.techs2)

  function handleAddTech() {
    dispatch({ tech: 'ADD_TECH', payload: { tech: newTech } });
    dispatch({ tech2: 'ADD_TECH2', payload: { tech: newTech } });

    setNewTech('');
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => <li key={tech}>{tech}</li>)}
      </ul>
      <ul data-testid="tech-list2">
        {techs2.map(tech => <li key={tech}>{tech}</li>)}
      </ul>

      <label htmlFor="Tech">Tech</label>
      <input type="text" id="Tech" value={newTech} onChange={e => setNewTech(e.target.value)} />

      <button onClick={handleAddTech}>Adicionar</button>
    </form>
  );
}
