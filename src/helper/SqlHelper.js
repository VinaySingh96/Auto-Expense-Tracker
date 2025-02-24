import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

let db = null;

export const openDatabase = async () => {
  try {
    if (db) return db;
    db = await SQLite.openDatabase(
      {name: 'test.db', location: 'default'},
      () => {},
      error => console.error('Error opening database', error),
    );
    return db;
  } catch (error) {
    console.error('Error opening database', error);
  }
};

export const createTable = async () => {
  // console.log('creating table', db)
  try {
    if (db) {
      await db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS expenses (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'merchant VARCHAR(20) COLLATE NOCASE, ' +
            'paymentMode VARCHAR(10) COLLATE NOCASE, ' +
            'amount DECIMAL(5,2), ' +
            'date DATE, ' +
            'category VARCHAR(23) COLLATE NOCASE, ' +
            'sub_category VARCHAR(22) COLLATE NOCASE);',
          [],
          () => {
            
          },
          error => {
            console.error('Error creating table:', error);
          },
        );
      });
    }
  } catch (error) {
    console.error('Error executing SQL transaction', error);
  }
};


/**
 * Inserts an expense record into the database.
 *
 * @param {Object} expenseDetail - The details of the expense to be inserted.
 * @param {string} expenseDetail.merchant - The merchant where the expense occurred.
 * @param {number} expenseDetail.amount - The amount of the expense.
 * @param {string} expenseDetail.date - The date of the expense in YYYY-MM-DD format.
 * @param {string} expenseDetail.category - The category of the expense.
 * @param {string} expenseDetail.sub_category - The sub-category of the expense.
 * @returns {Promise<void>} A promise that resolves when the transaction is complete.
 */
export const insertExpense = async (expenseDetail) => {
  const { merchant, amount, date, category, sub_category } = expenseDetail;

  await db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO expenses (merchant, amount, date, category, sub_category) VALUES (?, ?, ?, ?, ?)',
      [merchant, amount, date, category, sub_category],  // Removed `id`
      (tx, resultSet) => {
        console.log('Inserted Expense with ID: ', resultSet.insertId); // Correct way to get inserted ID
      },
      error => {
        console.error('Error inserting data', error);
      }
    );
  });
};

export const insertBulkExpenses = async (expensesData) => {
  for (const expenseDetail of expensesData) {
    await insertExpense(expenseDetail);
  }
  console.log('Data Insertion complete ✅');
};

export const fetchAllExpenses = async () => {
  let expenses = [];
  await db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM expenses',
      [],
      (tx, resultSet) => expenses = resultSet.rows.raw(),
      (error) => {
        console.error('Error fetching data:', error);
        return [];
      }
    );
  });

  return expenses
};

export const fetchExpensesByCategory = async (category) => {
  let expenses = [];
  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM expenses WHERE category LIKE '%${category}%'`,
      [],
      (tx, resultSet) => {
        expenses = resultSet.rows.raw()
      },
      (error) => console.log(error)
    );
  });

  return expenses;
};

export const fetchExpensesByMerchant = async (merchant) => {
  let expenses = [];
  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM expenses WHERE category LIKE '${merchant}'`,
      [],
      (tx, resultSet) => {
        expenses = resultSet.rows.raw()
      },
      (error) => console.log(error)
    );
  });

  return expenses;
};

export const fetchExpensesBetweenDateRange = async (startDate, endDate) => {
  let expenses = [];
  await openDatabase();
  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM expenses WHERE date BETWEEN '${startDate}' AND '${endDate}'`,
      [],
      (tx, resultSet) => {
        expenses = resultSet.rows.raw()
      },
      (error) => console.log(error)
    );
  });

  return expenses;
};

export const deleteAllExpenses = async () => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql('DELETE FROM expenses;', []);
      console.log('All expense data deleted');
    });
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

// Execute a query
export const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (tx, resultSet) => {
          // console.log('Query executed successfully', resultSet.rows.raw());
          resolve(resultSet.rows.raw());
        },
        (error) => {
          console.error('Error executing SQL query', error);
          reject(error);
        }
      );
    });
  });
};
