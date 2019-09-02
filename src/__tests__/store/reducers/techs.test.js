import reducer, { INITIAL_STATE } from '~/store/modules/techs/reducer';
import * as Techs from '~/store/modules/techs/actions';

console.log(Techs)


describe('Techs reducer', () => {
  it('ADD_TECH', () => {
    const state = reducer(INITIAL_STATE, Techs.addTech('Node.js'));

    console.log(state)

    expect(state).toStrictEqual(['Node.js']);
  })
})