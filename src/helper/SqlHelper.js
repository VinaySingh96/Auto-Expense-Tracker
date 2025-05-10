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

export const createExpenseTable = async () => {
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
        // console.log('Inserted Expense with ID: ', resultSet.insertId); // Correct way to get inserted ID
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

  return expenses;
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
  await createExpenseTable();
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
      console.log('Deleting')
      await tx.executeSql('DELETE FROM expenses;', []);
      await deleteTable(transactionRegexesDB);
      // await tx.executeSql(`DROP TABLE IF EXISTS ${transactionRegexesDB};`, []);
      // await tx.executeSql(`DELETE FROM ${transactionRegexesDB};`, []);
      console.log('All expense data deleted');
    });
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

const deleteTable = (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName};`,
        [],
        (_, result) => {
          console.log(`Table "${tableName}" deleted successfully.`);
          resolve(result);
        },
        (_, error) => {
          console.error(`Error deleting table "${tableName}":`, error);
          reject(error);
        },
      );
    });
  });
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

const transactionRegexesDB = 'transactionRegexes';

export const createRegexTable = async () => {
  try {
    if (db) {
      await db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${transactionRegexesDB} (` +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'type VARCHAR(20) COLLATE NOCASE, ' +
            'regexes TEXT);',
          [],
          () => {
            console.log('Regex table created')
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
}

export const fetchRegexes = async (type) => {
  let regexData;
  await db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM ${transactionRegexesDB} WHERE type = '${type}'`,
      [],
      (tx, resultSet) => {
        regexData = resultSet.rows.raw();
      },
      (error) => {
        console.error('Error fetching data:', error);
        return [];
      }
    );
  });
  
  if(!regexData.length) {
    return null;
  }
  
  return JSON.parse(regexData[0].regexes);
}

export const insertRegexes = async (regexes, type) => {
  const serializedRegexes = JSON.stringify(regexes);
  await db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${transactionRegexesDB} (type, regexes) VALUES (?, ?)`,
      [type, serializedRegexes],
      (tx, resultSet) => {
        console.log('Inserted Regex with ID: ', resultSet.insertId); // Correct way to get inserted ID
      },
      error => {
        console.error('Error inserting data', error);
      }
    );
  });
}

export const updateRegexes = async (regexes, type) => {
  console.log({regexes, type});
  const serializedRegexes = JSON.stringify(regexes);
  await db.transaction((tx) => {
    tx.executeSql(
      `UPDATE ${transactionRegexesDB} SET regexes = ? WHERE type = ?;`,
      [serializedRegexes, type],
      (_, result) => {
        console.log('Update successful:', result);
      },
      (_, error) => {
        console.error('Error updating expense:', error);
      },
    );
  });
}
