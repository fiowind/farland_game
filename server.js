const express = require("express")
const next = require('next')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(async () => {
  const server = express()

  const MongoClient = require('mongodb').MongoClient;
  const url = "mongodb://localhost:27017/hua";

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    db.close();
  });

  // health check
  server.get("/health-check", (_, res) => {
    res.status(200).end()
  })

  server.get("/api/activity/:id/:userid", async (req, res) => {
    const { id, userid } = req.params
    let a = 1
    MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
      if (err) throw err;
      const dbo = db.db("hua");
      const myobj = { username: userid, id }
      const result = await dbo.collection("activity").find(myobj).toArray()
      if (result.length > 0 ) {
        a = 0
      }
      else {
        dbo.collection("activity").insertOne({...myobj}, function(err, res) {
           if (err) throw err;
           console.log("插入的文档数量为: " + res.insertedCount);
        });
      }
      db.close();
      res.json({a})
    });
  })

  server.get("/api/marks/:userid", async (req, res) => {
    const { id, userid } = req.params
    MongoClient.connect(url, { useNewUrlParser: true }, async (err, db) => {
      if (err) throw err;
      const dbo = db.db("hua");
      const myobj = { username: userid }
      const result = await dbo.collection("activity").find(myobj).toArray()
      db.close();
      res.json({ marks: result.length })
    });
  })

  server.use(handler)

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})