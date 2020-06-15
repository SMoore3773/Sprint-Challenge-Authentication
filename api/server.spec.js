const request = require('supertest');
const server = require('./server');

describe('server.js', ()=>{
    it('should set testing env',()=>{
        expect(process.env.DB_ENV).toBe('testing')
    })

    it('should respond with code 200', async ()=>{
        const res = await request(server).get('/');
        expect(res.status).toBe(200)
    })
    it('should respond with {api:"running}', async ()=>{
        const res = await request(server).get('/');
        expect(res.body).toEqual({api:'running'});
    })
})