
const request = require('supertest');
const Users = require('./authModel');
const db = require('../database/dbConfig');
const server = require('../api/server');


describe('authrouter',()=>{
    describe('register',()=>{
        it('should add user to db on creation', async ()=>{
            await Users.add({username:'user1', password:'password1'});
            const users = await db('users');
            expect(users).toHaveLength(1)

        })
        it('should return 201 on registration', async ()=>{
            const res = await request(server).post('/api/auth/register').send({username:'user1',password:'password1'});
            expect(res.status).toBe(201)
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
            it('should return 200 on success', async ()=>{
                const user = {username:'user1',password:'password1'}
                await request(server).post('/api/auth/register').send(user);
                const res = await request(server).post('/api/auth/login').send(user);
                expect(res.status).toBe(200);
            })
            it('should return token on login', async()=>{
                const user = {username:'user1',password:'password1'}
                await request(server).post('/api/auth/register').send(user);
                const res = await request(server).post('/api/auth/login').send(user);
                expect(res.body).toHaveProperty('token')
            })
            beforeEach(async ()=>{
                await db('users').truncate()
            })
        })
    })
})

