var pg = require("pg");

const configDB = {
  user: "postgres",
  database: "ToDoList2",
  password: "postgres",
  port: 5432,
};

const pool = new pg.Pool(configDB);

export default function handler(req, res) {
  let id = req.query.id;

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      `DELETE FROM to_do_list2 WHERE id='${id}';`,
      function (err, result) {
        done();
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        res.json({ todoDelOne: result });
      }
    );
  });
}
