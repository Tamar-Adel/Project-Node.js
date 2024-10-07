
// DELETE - לא לאפשר בקשות מסוג מחיקה
module.exports = function notDelete(req, res, next) {
    if (req.method === "DELETE")
        res.status(401).send("delete not allowed " + req.myMessage)
    else
        next();
}