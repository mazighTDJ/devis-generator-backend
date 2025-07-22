import { Database } from "sqlite";
import { Client } from "../types/Client";
import sqlite3 from "sqlite3";

export const createClient = async (
  db: Database<sqlite3.Database>,
  idInc: string,
  name: string,
  adress: string
): Promise<number | undefined> => {
  const result = await db.run(
    "insert into  clients (idInc,name,adress) values (?,?,?)",
    [idInc, name, adress]
  );

  //console.log("lastid", result.lastID);
  return result.lastID;
};
