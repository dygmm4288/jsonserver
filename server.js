const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch("/letters/profile/:userId", (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  const db = router.db;
  const collection = db.get("letters");

  const itemsToUpdate = collection.filter({ userId }).value();

  if (itemsToUpdate.length === 0) {
    res.status(404).send("현재 아디로 검색되는 letter가 없습니다.");
    return;
  }

  itemsToUpdate.forEach((item) => {
    collection.find({ id: item.id }).assign(body).write();
  });
  res.send("업데이트 되었습니다.");
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
