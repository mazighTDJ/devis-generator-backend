import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

sqlite3.verbose(); //activer les promesses avec sqlite

export const connectToDb = async (): Promise<Database<sqlite3.Database>> => {
  //connexion a la bd
  const db = open({
    filename: "./devis.db",
    driver: sqlite3.Database,
  });

  //creation de mla table clients
  (await db).exec(
    " create table if not exists clients( id integer primary key autoincrement, idInc varchar(50) not null, name varchar(50) not null, adress text ) ;"
  );

  console.log("les tables sont cree ");

  return db;
};
