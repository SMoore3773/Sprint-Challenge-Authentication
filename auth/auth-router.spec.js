const authRouter = require('./auth-router');
const request = require('supertest');
const Users = require('./authModel');
const db = require('../database/dbConfig')

describe('true', ()=>{
    it('is true', ()=>{
        expect(true).toBe(true)
    })
})

describe('authrouter',()=>{
    describe('register',()=>{
        it('should return 201 on creation', async ()=>{
            await Users.add({username:'user1', password:'password1'});
            const users = await db('users');
            expect(users).toHaveLength(1)
        
        })
        it('should return user data', async()=>{
            let user = await Users.add({username:'user1', password:'password1'});

            expect(user.username).toBe('user1')
        })
        beforeEach(async ()=>{
            await db('users').truncate()
        })

        describe('login',()=>{
            it('should match a valid user', async()=>{
                const newUser = {username:'user1', password:'password1'}
                await Users.add(newUser)
                let user = await Users.findBy({username:newUser.username}).first();
                expect(user.username).toBe('user1')
            })
            it('should return an error if invalid user', async ()=>{
                
              const newUser = {username:'user1', password:'password1'};
              await Users.add(newUser)
              const badUser = {username:'userBad', password:'badPassword'};
            //   let user = await request(authRouter).findBy({username:badUser.username})
            //   let res = await request(authRouter).post('/login').send(badUser)
            //   expect(res.status).toBe(401)
                           
            })
        })
    })
})

