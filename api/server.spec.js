const request = require('supertest');
const server = require('./server');


describe('true', ()=>{
    it('is true', ()=>{
        expect(true).toBe(true)
    })
})
describe('server.js', ()=>{
    it('should set testing env',()=>{
        expect(process.env.DB_ENV).toBe('testing')
    })
})