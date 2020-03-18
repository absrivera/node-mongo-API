const fn = (req, res, db) => {

    //converting data into an object to send 
    var myObj = {
        email : req.body.email,
        name : req.body.name,
        age : req.body.age
    };

    db.collection("users").insertOne(myObj, (err, result) => {
        if(err){
            res.send(err);
            throw(err);
        }
        console.log("1 document inserted: " + result);
        res.send("1 document inserted");
    });
}

module.exports = fn;