export const createTask = (req, res) => {
  const { title, content, deadLine } = req.body;
  const writer = req.session.user;
  console.log(title, content);
  console.log(writer);
};
