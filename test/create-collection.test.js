import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('create-collection', () => {
  // const meta = generateMeta('create-collection');
  const args = { CollectionId: 'collectionRekognitionTest' };

  it('should create collection if valid collectionId parameter supplied', (done) => {
    run('create-collection', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'CollectionArn');
        assert.propertyVal(res.data, 'StatusCode', 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "ResourceAlreadyExistsException" error if collectionId is already existing',
    (done) => {
      run('create-collection', { args, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'message');
          assert.propertyVal(res.data, 'code', 'ResourceAlreadyExistsException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  it('should return "ValidationException" error if collectionId is empty',
    (done) => {
      const argsWithoutCollectionId = { ...args, CollectionId: '' };
      run('create-collection', { args: argsWithoutCollectionId, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'message');
          assert.propertyVal(res.data, 'code', 'ValidationException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
