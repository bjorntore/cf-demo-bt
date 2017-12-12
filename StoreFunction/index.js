const datastore = require('@google-cloud/datastore')();
const key = datastore.key(['Thing']);

function getStoredData(req, res) {
    let query = datastore.createQuery("Thing");
    datastore.runQuery(query).then((results) => {
        // Task entities found.
        const rows = results[0];
        res.status(200).send(rows);
    });
}

function storeData(req, res) {
    let data = {
        data: req.body.data +
                ""
    };
    datastore.save({
        key: key,
        data: data
    }, function (err) {
        if (!err) {
            res.status(200).send("All is good.");
        } else {
            res.status(400).send({error: err});
        }
    });
}

exports.storeFunction = function (req, res) {
    switch (req.method) {
        case 'GET':
            getStoredData(req, res);
            break;
        case 'POST':
            storeData(req, res);
            break;
        default:
            res.status(500).send({error: 'Something blew up!'});
            break;
    }
}