import * as utils from '@/main/utils';

describe('Utils', () => {
  describe('getFieldsWithValidValues', () => {
    it('Should return correctly only fields with values', async () => {
      const user = {
        userId: 'foo',
        name: 'bar',
        email: '',
        birthDate: null,
        age: 31,
      };
      const expectedResponse = utils.getFieldsWithValidValues(user, 'name');
      expect(expectedResponse).toEqual({
        userId: 'foo',
        age: 31,
      });
    });

    it('Should return correctly only fields with values and remove field is provided by parameter', async () => {
      const user = {
        userId: 'foo',
        name: 'bar',
        email: '',
        birthDate: null,
        age: 31,
      };
      const expectedResponse = utils.getFieldsWithValidValues(user, 'userId');
      expect(expectedResponse).toEqual({
        name: 'bar',
        age: 31,
      });
    });
  });
});
