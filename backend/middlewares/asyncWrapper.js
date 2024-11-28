module.exports = (asyncFun) => {
  return (req, res, next) => {
    asyncFun(req, res, next).catch((err) => {
      next(err);
    });
  };
};
