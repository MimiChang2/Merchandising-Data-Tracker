DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (30) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone" ,"electronics", 249.95, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("carrots", "food", 4.27, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("prom dress", "clothing", 214.77, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tiffany necklace", "accessories", 790.95, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("louis vuitton purse", "accessories", 1722.98, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("peanut butter", "food", 3.21, 720);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dvd player", "electronics", 120.99, 493);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jacket", "clothing", 182.99, 312);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("couch", "furniture", 399.21, 222);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bed", "furniture", 427.21, 532);

