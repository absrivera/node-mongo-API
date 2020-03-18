const fn = (req, res, db) => {

    //toArray needed in order to avoid a circular structure error
    db.collection("users").find({}).toArray((err, result) => {
        if(err){
            res.send(err);
            throw(err);
        }
       res.send(result);
    });
}

module.exports = fn;