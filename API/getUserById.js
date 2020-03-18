const fn = (req, res, db) => {
      //pass query as is because it's in json
        db.collection("users").find(req.query).toArray((err, result) => {
            if (err) {
                res.send(err)
                throw (err)
            }
            res.send(result);
        });
}

module.exports = fn;