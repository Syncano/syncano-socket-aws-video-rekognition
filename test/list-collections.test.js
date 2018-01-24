import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('list-collections', () => {
  it('should return all collection IDs if no parameter is provided', (done) => {
    run('list-collections', { args: {}, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'CollectionIds');
        assert.isArray(res.data.CollectionIds);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return limited collection IDs based on provided maxResults',
    (done) => {
      run('list-collections', { args: { MaxResults: 2 }, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'CollectionIds');
          assert.isAtMost(res.data.CollectionIds.length, 2);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  it('should return "InvalidPaginationTokenException" error if nextTokens parameter is invalid',
    (done) => {
      run('list-collections', { args: { NextTokens: 'ssjskjskjsd' }, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'message');
          assert.propertyVal(res.data, 'code', 'InvalidPaginationTokenException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
