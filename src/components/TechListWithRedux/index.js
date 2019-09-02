import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addTech, addTech2 } from '../../store/modules/techs/actions';

// import { Container } from './styles';

export default function TechListWithRedux() {
  const [newTech, setNewTech] = useState('');

  const dispatch = useDispatch();
  const techs = useSelector(state => state.techs)
  const techs2 = useSelector(state => state.techs2)

  function handleAddTech() {
    dispatch(addTech(newTech));
    dispatch(addTech2(newTech));
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
