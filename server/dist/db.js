import initSqlJs from "sql.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, "../data");
const dbPath = join(dataDir, "database.sqlite");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
const SQL = await initSqlJs({
    locateFile: (file) => new URL(`../node_modules/sql.js/dist/${file}`, import.meta.url).toString(),
});
const initializeDatabase = () => {
    if (fs.existsSync(dbPath)) {
        const fileBuffer = fs.readFileSync(dbPath);
        return new SQL.Database(fileBuffer);
    }
    const database = new SQL.Database();
    database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT,
      preferences TEXT,
      settings TEXT,
      privacy TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      enquiry_type TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
    fs.writeFileSync(dbPath, Buffer.from(database.export()));
    return database;
};
const db = initializeDatabase();
const saveDb = () => {
    fs.writeFileSync(dbPath, Buffer.from(db.export()));
};
export const getRow = (sql, params = []) => {
    const stmt = db.prepare(sql);
    if (params.length)
        stmt.bind(params);
    if (!stmt.step()) {
        stmt.free();
        return null;
    }
    const row = stmt.getAsObject();
    stmt.free();
    return row;
};
export const runQuery = (sql, params = []) => {
    const stmt = db.prepare(sql);
    if (params.length)
        stmt.bind(params);
    stmt.step();
    stmt.free();
    saveDb();
    const result = db.exec("SELECT last_insert_rowid() AS id");
    if (result.length > 0 && result[0].values.length > 0) {
        return Number(result[0].values[0][0]);
    }
    return null;
};
export const allRows = (sql, params = []) => {
    const stmt = db.prepare(sql);
    if (params.length)
        stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
        rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
};
export { saveDb };
export default db;
//# sourceMappingURL=db.js.map