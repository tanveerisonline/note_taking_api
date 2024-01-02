const request = require('supertest');
const index = require('../index');

async function importChai() {
  const { expect } = await import('chai');
  return expect;
}

const base64Credentials = Buffer.from('admin:adminpassword').toString('base64');

describe('Note API Endpoints', () => {
  let noteId;
  let expect;

  beforeEach(async () => {
    expect = await importChai();
  });

  it('should create a new note', async () => {
    const res = await request(index)
      .post('/api/notes')
      .set('Authorization', `Basic ${base64Credentials}`)
      .send({ title: 'Test Note', content: 'This is a test note' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('_id');
    noteId = res.body._id;
  });

  it('should get all notes', async () => {
    const res = await request(index)
      .get('/api/notes')
      .set('Authorization', `Basic ${base64Credentials}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a single note by ID', async () => {
    const res = await request(index)
      .get(`/api/notes/${noteId}`)
      .set('Authorization', `Basic ${base64Credentials}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('_id', noteId);
  });

  it('should update a note', async () => {
    const res = await request(index)
      .put(`/api/notes/${noteId}`)
      .set('Authorization', `Basic ${base64Credentials}`)
      .send({ title: 'Updated Note', content: 'This note has been updated' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('_id', noteId);
    expect(res.body).to.have.property('title', 'Updated Note');
  });

  it('should delete a note', async () => {
    const res = await request(index)
      .delete(`/api/notes/${noteId}`)
      .set('Authorization', `Basic ${base64Credentials}`);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('message', 'Note deleted successfully');
  });
});
