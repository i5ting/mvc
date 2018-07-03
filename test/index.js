import test from 'ava'
import request from 'superkoa'
import app from '../app'

test("GET /", async t => {
    const res = await request(app).get("/")
    t.is(res.status, 200)
})