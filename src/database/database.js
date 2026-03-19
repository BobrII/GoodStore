import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('app.db');

//Users
export const createTableUsers = () => {
    db.execSync(
        `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
        );`
    );

    db.runSync(
        `INSERT OR IGNORE INTO users (email, password) VALUES(?, ?)`,
        ['test@gmail.com', 'Test1234']
    );
};

export const addUser = (email, password) =>{
    db.runSync(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [email, password]
    );
};

export const checkUser = (email, password) => {
    const user = db.getFirstSync(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, password]
    );
    return user;
    
};

export const checkEmail = (email) =>{
    const checkEmail = db.getFirstSync(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );
    return checkEmail;
};

//Products
export const createTableProduct = () => {
    //db.execSync(`DROP TABLE IF EXISTS products`);

    db.execSync(
        `CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price REAL,
        categoryId INTEGER,
        stock INTEGER,
        imageUrl TEXT,
        FOREIGN KEY(categoryId) REFERENCES categories(id)
        );`
    );
        //db.runSync(
        //    `INSERT OR IGNORE INTO products (name, description, price, categoryId, stock, imageUrl) VALUES(?, ?, ?, ?, ?, ?)`,
        //    ['Phone', 'Simple phone', 234, 1, 10, 'https://consumerhm.gov.ua/images/cache/9d0d236f073c9b0bc63c0b3a77013136_h500.jpg']
        //)
};


export const getProducts = () => {
    const product = db.getAllSync(
        `SELECT products.*, categories.name AS categoryName
        FROM products
        LEFT JOIN categories ON products.categoryId = categories.id`
    );
    return product;
};

export const getProductsInfo = (id) => {
    const product = db.getFirstSync(
        `SELECT * FROM products WHERE id = ?`,
        [id]
    );
    return product;
}

export const findProducts = (name) => {
    const product = db.getAllSync(
        `SELECT products.*, categories.name AS categoryName
         FROM products
         LEFT JOIN categories ON products.categoryId = categories.id
         WHERE products.name LIKE ?`,
        [`%${name}%`]
    );
    return product;
};

export const addNewProducts = (name, price, category, stock,  image, description) => {
    db.runSync(
        `INSERT INTO products (name, description, price, categoryId, stock, imageUrl) VALUES(?, ?, ?, ?, ?, ?)`,
        [name, description, Number(price), Number(category), Number(stock), image]
    );
};

export const removeProducts = (id) => {
    db.getFirstSync(
        `DELETE FROM products WHERE id = ?`,
        [id]
    );
};

export const updateProducts = (id, name, price, description, categoryId, stock, imageUrl) => {
    db.runSync(
        "UPDATE products SET name = ?, price = ?, description = ?, categoryId = ?, stock = ?, imageUrl = ?  WHERE id = ?",
        [name, price, description, categoryId, stock, imageUrl, id]
    );
};


//Cart................................................
export const createTableCart = () => {
    db.execSync(
        `CREATE TABLE IF NOT EXISTS cart(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        count INTEGER,
        imageUrl TEXT,
        createdAt TEXT
        );`
    );
};

export const addToCart = (name, price, count, imageUrl, createdAt) => {
    db.runSync(
        `INSERT INTO cart (name, price, count, imageUrl, createdAt) VALUES (?, ?, ?, ?, ?)`,
        [name, price, count, imageUrl, createdAt]
    );
};

export const removeFromCart = (id) => {
    db.getFirstSync(
        `DELETE FROM cart WHERE id = ?`,
        [id]
    ); 
};

export const getFromCart = () => {
    const data = db.getAllSync(
        `SELECT * FROM cart`
    );
    return data;
};

export const cleanCart = () => {
    db.getFirstSync(
        `DELETE FROM cart`
    );
}


//Categories
export const createTableCategories = () => {
    //db.execSync(`DROP TABLE IF EXISTS categories`);
    db.execSync(
        `CREATE TABLE IF NOT EXISTS categories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        isActive BOOLEAN
        );`
    );

    db.runSync(
        `INSERT OR IGNORE INTO categories (name, isActive) VALUES(?, ?)`,
        ['Devices', 1]
    );

    db.runSync(
        `INSERT OR IGNORE INTO categories (name, isActive) VALUES(?, ?)`,
        ['Fruits', 1]
    );

    db.runSync(
        `INSERT OR IGNORE INTO categories (name, isActive) VALUES(?, ?)`,
        ['Other', 1]
    );

    db.runSync(
        `INSERT OR IGNORE INTO categories (name, isActive) VALUES(?, ?)`,
        ['Wear', 1]
    );

    db.runSync(
        `INSERT OR IGNORE INTO categories (name, isActive) VALUES(?, ?)`,
        ['Kitchen', 1]
    );
};


export const addCategory = (name, isActive) => {
     db.runSync(
        `INSERT INTO categories (name, isActive) VALUES (?, ?)`,
        [name, isActive]
    );
}

export const getCategories = () => {
    const categories = db.getAllSync(
        `SELECT * FROM categories`
    );
    return categories;
};

export const deleteCategory = (id) => {
    db.getFirstSync(
        `DELETE FROM categories WHERE id = ?`,
        [id]
    );
};

export const checkCatProduct = (catId) => {
    const product = db.getFirstSync(
        `SELECT * FROM products WHERE categoryId = ?`,
        [catId]
    );
    return product;
};

export const updateCategory = (id, name, isActive) => {
    db.runSync(
        "UPDATE categories SET name = ?, isActive = ? WHERE id = ?",
        [name, isActive, id]
    );
};

export const initDatabase = () => {
    createTableCart();
    createTableUsers();
    createTableCategories();
    createTableProduct();
};