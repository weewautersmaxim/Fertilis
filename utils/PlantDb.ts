import {
  openDatabase,
  Database,
  SQLTransaction,
  Query,
  SQLResultSet,
  SQLError,
} from "expo-sqlite";
import Plant from "../models/Plant";

//second database for saving data for longer periods of time. (only necessary data)

const databaseName: string = "plantDb";

const getDb = (name: string = databaseName): Database => {
  return openDatabase(name);
};

const transaction = (db: Database): Promise<SQLTransaction> => {
  return new Promise(function (resolve, reject) {
    db.transaction(
      (tx: SQLTransaction) => {
        resolve(tx);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const query = (tx: SQLTransaction, query: Query): Promise<SQLResultSet> => {
  return new Promise(function (resolve, reject) {
    tx.executeSql(
      query.sql,
      query.args,
      (tx: SQLTransaction, res: SQLResultSet) => {
        resolve(res);
      },
      (tx: SQLTransaction, error: SQLError) => {
        reject(error);
        return true;
      }
    );
  });
};

// ALLES PREPARED!
// TABLE INIT
export const initPlants = async () => {
  const db = getDb();
  const tx = await transaction(db).catch((error) => console.error(error));

  if (tx) {
    await query(tx, {
      sql:
        "CREATE TABLE IF NOT EXISTS `plantDb` (id integer primary key autoincrement, activity text, plant text, plantTimer number, datePlant string)",
      args: [],
    });
  }
};

export const PlantCRUD = {
  // C reate
  create: (n: Plant): Promise<SQLResultSet> => {
    return new Promise(async function (resolve, reject) {
      const db = getDb(),
        tx = await transaction(db);

      const res = await query(tx, {
        sql:
          "INSERT INTO `plantDb` (id, activity, plant, plantTimer, datePlant) values(?, ?, ?, ?, ?)",
        args: [null, n.activity, n.plant, n.plantTimer, n.datePlant],
      }).catch((error) => {
        reject(error);
      });

      if (res) resolve(res);
    });
  },
  read: {
    all: (): Promise<SQLResultSet> => {
      return new Promise(async function (resolve, reject) {
        const db = getDb(),
          tx = await transaction(db);
        const res = await query(tx, {
          sql: "SELECT * FROM `plantDb`",
          args: [],
        }).catch((error) => {
          reject(error);
        });

        if (res) resolve(res);
      });
    },

    detail: (id: number): Promise<SQLResultSet> => {
      return new Promise(async function (resolve, reject) {
        const db = getDb();
        const tx = await transaction(db);

        const res = await query(tx, {
          sql: "SELECT * FROM 'plantDb' WHERE id = ?",
          args: [id],
        }).catch((error) => {
          reject(error);
        });

        if (res) {
          resolve(res);
        }
      });
    },
  },
};
