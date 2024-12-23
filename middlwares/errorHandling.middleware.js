exports.Pagenotfound = (req, res, next) => {
    next({ status: 404, error: 'page not found' })
}
// err = { status: 404, error: "product not found" }
// נכנס הפרמטר ששלחנו לנקסט - err
function errorHandling(err, req, res, next) {
    // 500 - שגיאה כללית בשרת ברירת מחדל
    res.status(err.status || 500)
        .json({ error: err.error || "server error!" });
}

exports.errorHandling = errorHandling;