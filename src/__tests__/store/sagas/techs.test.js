import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';

import { getTechsSuccess, getTechsFailure } from '~/store/modules/techs/actions'
import { getTechs } from '~/store/modules/techs/sagas';

// criar o mock do axios
const apiMock = new MockAdapter(api)

describe('Techs saga', () => {
  it('should be able to fetch techs', async () => {
    const dispatch = jest.fn();

    // passa a rora, o status e o valor a ser retornado
    // simula uma api
    apiMock.onGet('techs').reply(200, ['Node.js'])

    await runSaga({ dispatch }, getTechs).toPromise();

    // deve ser chamado com a ação e o valor [Node.js]
    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']))
  });

  it('should fail when api returns error', async () => {
    const dispatch = jest.fn();

    // passa a rora, o status e o valor a ser retornado
    // simula uma api
    apiMock.onGet('techs').reply(500)

    await runSaga({ dispatch }, getTechs).toPromise();

    // deve ser chamado com a ação e o valor [Node.js]
    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  });
})