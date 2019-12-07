var friends = require("../data/friends");

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        //  var newFriend = req.body;
        // console.log(res.body.newFriend)

        var matchUser = {};
        console.log(req.body);
        console.log(req.body.scores);
        var difference = 1000;

        var currentscore = req.body.scores;
        for (var i = 0; i < friends.length; i++) {

            var totalDiff = 0;


            for (var j = 0; j < currentscore.length; j++) {
                totalDiff += Math.abs(parseInt((friends[i].scores[j])) - parseInt(currentscore[j]));

            }

            if (totalDiff < difference) {
                matchUser = friends[i];
                difference = totalDiff;
            }


        }

        friends.push(req.body);
        return res.json(matchUser);


    });




};