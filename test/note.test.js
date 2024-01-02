const request = require('supertest');
const app = require('..');
const chai = require('chai');
const expect = chai.expect;

describe('Note API Endpoints', () => {
  let noteId;

  it('should create a new note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Test Note', content: 'This is a test note' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('_id');
    noteId = res.body._id;
  });

  it('should get all notes', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should get a single note by ID', async () => {
    const res = await request(app).get(`/api/notes/${noteId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('_id', noteId);
  });

  it('should update a note', async () => {
    const res = await request(app)
      .put(`/api/notes/${noteId}`)
      .send({ title: 'Updated Note', content: 'This note has been updated' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('_id', noteId);
    expect(res.body).to.have.property('title', 'Updated Note');
  });

  it('should delete a note', async () => {
    const res = await request(app).delete(`/api/notes/${noteId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('message', 'Note deleted successfully');
  });
});
