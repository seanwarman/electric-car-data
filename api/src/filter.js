module.exports = (req, res) => {
  const filters = req.body

  res.send(filters)
}
