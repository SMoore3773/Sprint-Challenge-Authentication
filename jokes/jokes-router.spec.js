const request = require('supertest');
const jokes = require('./jokes-router');



describe('true', ()=>{
    it('is true', ()=>{
        expect(true).toBe(true)
    })
})

describe('jokesRouter get',()=>{

    it('should return 200 ok on success', async()=>{
        let res = await request(jokes).get('/');
        console.log(res)
        expect(res.status).toBe(200)
        
        
    })
    it('should return json object', async ()=>{
        const res = request(jokes).get('/');
        expect(res.type).toBe('application/json');
    })
})