var pg = require("pg");

const configDB = {
  user: "postgres",
  database: "ToDoList2",
  password: "postgres",
  port: 5432,
};

const pool = new pg.Pool(configDB);

export default function handler(req, res) {
  let todo = req.query.ToDoItem;

  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      `INSERT INTO "to_do_list2" (todo) VALUES ('${todo}')`,
      function (err, result) {
        done();
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        res.json("Успешно добавлено в базу данных");
      }
    );
  });
}
