import test from 'ava'
import request from 'superkoa'
import app from '../app'

test.cb("POST /users/register", t => {
    request(app)
        .post('/users/register')
        .send({ username: 'i5ting', password: '123456' })
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
            t.ifError(err)
            console.log(res.body)
            t.is(res.body.status.code, 0, 'when status.code = sucess')
            t.end()
        })
})

