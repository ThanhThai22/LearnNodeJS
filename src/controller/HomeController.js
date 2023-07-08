import connection from "../configs/connectDB";

let getHomePage = (req, res) => {

    let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            // console.log(">>check sql")
            // console.log(results); // results contains rows returned by server
            // console.log(results[0]); // results contains rows first index returned by server
            results.map((row) => {
                data.push({
                    id: row.id,
                    email: row.email,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    address: row.address
                })
            });
            // console.log(fields); // fields contains extra meta data about results, if available
            return res.render("index.ejs", { dataUser: data, test: 'abc string' })
        }
    );


}

module.exports = {
    getHomePage
}