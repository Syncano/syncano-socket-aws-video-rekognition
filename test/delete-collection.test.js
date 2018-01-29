import { assert } from 'chai';
import { run } from 'syncano-test';
import config from './utils/helpers';

describe('delete-collection', () => {
  const args = { CollectionId: 'collectionRekognitionTest' };

  it('should delete collection if valid collectionId parameter is valid', (done) => {
    run('delete-collection', { args, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 200);
        assert.propertyVal(res, 'mimetype', 'application/json');
        assert.propertyVal(res.data, 'StatusCode', 200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "ResourceNotFoundException" error if collectionId does not exist', (done) => {
    const argsWithNonExistingName = { CollectionId: 'nonExistingName' };

    run('delete-collection', { args: argsWithNonExistingName, config })
      .then((res) => {
        assert.propertyVal(res, 'code', 400);
        assert.propertyVal(res, 'mimetype', 'application/json');
        assert.propertyVal(res.data, 'code', 'ResourceNotFoundException');
        assert.propertyVal(res.data, 'message',
          'The collection id: nonExistingName does not exist');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "ValidationException" error if collectionId is empty',
    (done) => {
      const argsWithoutCollectionId = { CollectionId: '' };
      run('delete-collection', { args: argsWithoutCollectionId, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.propertyVal(res, 'mimetype', 'application/json');
          assert.propertyVal(res.data, 'code', 'ValidationException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
