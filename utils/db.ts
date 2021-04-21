import {
  openDatabase,
  Database,
  SQLTransaction,
  Query,
  SQLResultSet,
  SQLError,
} from "expo-sqlite";
import Task from "../models/Task";

const databaseName: string = "task";

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
export const initTasks = async () => {
  const db = getDb();
  const tx = await transaction(db).catch((error) => console.error(error));

  if (tx) {
    await query(tx, {
      sql:
        "CREATE TABLE IF NOT EXISTS `task` (id integer primary key autoincrement, activity text, timer number, plant text, plantTimer number,unfinished text)",
      args: [],
    });
  }
};

export const taskCRUD = {
  // C reate
  create: (n: Task): Promise<SQLResultSet> => {
    return new Promise(async function (resolve, reject) {
      const db = getDb(),
        tx = await transaction(db);

      const res = await query(tx, {
        sql:
          "INSERT INTO `task` (id, activity, timer, plant, plantTimer, unfinished) values(?, ?, ?, ?, ?, ?)",
        args: [
          null,
          n.activity,
          n.timer,
          n.plant,
          n.plantTimer,
          n.unfinished,
        ],
      }).catch((error) => {
        reject(error);
      });

      if (res) resolve(res);
      // console.log(res);
    });
  },

  // R ead
  read: {
    all: (): Promise<SQLResultSet> => {
      return new Promise(async function (resolve, reject) {
        const db = getDb(),
          tx = await transaction(db);
        const res = await query(tx, {
          sql: "SELECT * FROM `task`",
          args: [],
        }).catch((error) => {
          reject(error);
        });

        if (res) resolve(res);
      });
    },
    unfinished: (): Promise<SQLResultSet> => {
      return new Promise(async function (resolve, reject) {
        const db = getDb(),
          tx = await transaction(db);
        let bool = "true";
        const res = await query(tx, {
          sql: "SELECT * FROM `task` WHERE unfinished = ?",
          args: [bool],
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
          sql: "SELECT * FROM 'task' WHERE id = ?",
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

  // U pdate
  update: (n: Task): Promise<SQLResultSet> => {
    return new Promise(async function (resolve, reject) {
      const db = getDb(),
        tx = await transaction(db);

      const res = await query(tx, {
        sql:
          "UPDATE `task` SET activity = ? , timer = ? , plant = ?, plantTimer = ?, unfinished = ? WHERE id = ?",
        args: [n.activity, n.timer, n.plant, n.plantTimer, n.unfinished, n.id],
      }).catch((error) => {
        reject(error);
      });

      if (res) resolve(res);
    });
  },

  // D elete
  delete: (id: number): Promise<SQLResultSet> => {
    return new Promise(async function (resolve, reject) {
      const db = getDb(),
        tx = await transaction(db);

      const res = await query(tx, {
        sql: "DELETE FROM `task` WHERE id = ?",
        args: [id],
      }).catch((error) => {
        reject(error);
      });

      if (res) resolve(res);
    });
  },
};
