var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
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
    viewProducts();
});

function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(error, result) {
        if(error) throw error;
        // Log all results of the SELECT statement
        console.log(result);
        viewLowInventory();
    });
}

function viewLowInventory() {
    console.log("Products with Low Inventory - Under 50 units in stock: \n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 50", function(error, result) {
        if(error) throw error;
        console.log(result);
        addToInventory();
    });
}

function addToInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
            if(err) throw err;
            inquirer.prompt([{
                    name: "product",
                    type: "list",
                    choices: function() {
                        var allItemsArray = [];
                        for(var i = 0; i < results.length; i++) {
                            allItemsArray.push(results[i].product_name);
                        }
                        return allItemsArray;
                    },
                    message: "What item would you like to add inventory to?"
                },
                {
                    name: "stock",
                    type: "input",
                    message: "How many units would you like to add?"
                }
            ]).then(function(answer) {
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
                var newStockQuantity = dbItem.stock_quantity + answer.stock;
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
                        console.log("Congrats! You have added this item!");
                        connection.end();
                    }
                );
            });

        }
        // function addNewItem() {
        //     inquirer.prompt([{
        //             name: "item",
        //             type: "input",
        //             message: "what item would you like to add?"
        //         },
        //         {
        //             name: "category",
        //             type: "input",
        //             message: "What category would you like to place your auction in?"
        //         },
        //     ])
        // }
    );
}
