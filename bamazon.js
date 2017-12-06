var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if(err) throw err;
    // run the start function after the connection is made to prompt the user
    afterConnection();
});

function afterConnection() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(error, result) {
        if(error) throw error;
        // Log all results of the SELECT statement
        console.log(result);
        userBuyItem();
    });
}

function userBuyItem() {
    // query the database for all items
    connection.query("SELECT * FROM products", function(err, results) {
        if(err) throw err;
        // ask user for which they'd like to buy
        inquirer
            .prompt([{
                    name: "product",
                    type: "list",
                    choices: function() {
                        var allItemsArray = [];
                        for(var i = 0; i < results.length; i++) {
                            allItemsArray.push(results[i].product_name);
                        }
                        return allItemsArray;
                    },
                    message: "What would you like to buy? Enter in the number."
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How many units would you like to buy?"
                }
            ])
            .then(function(answer) {
                // get the information of the chosen item
                //error inside of the .then function
                console.log(answer);
                answer.stock = parseInt(answer.stock);
                var dbItem;
                for(var i = 0; i < results.length; i++) {
                    if(results[i].product_name === answer.product) {
                        dbItem = results[i];
                    }
                }

                // determine if stock_quantity is enough
                console.log(dbItem);
                if(dbItem.stock_quantity > answer.stock) {
                    var newStockQuantity = dbItem.stock_quantity - answer.stock;
                    // if yes
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: newStockQuantity
                            },
                            {
                                id: dbItem.id
                            }
                        ],
                        function(error) {
                            if(error) throw error;
                            console.log("Congrats! You have bought this item!");
                            console.log("Total Cost: " + (dbItem.price * answer.stock).toFixed(2));
                            connection.end();
                        }
                    );
                }
                else {
                    // not enough quantity
                    console.log("We don't have enough to fulfull your order...");
                    connection.end();
                }
            });
    });
}

//afterConnection();
