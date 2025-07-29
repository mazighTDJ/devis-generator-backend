import { Database } from "sqlite";
import { Client } from "../types/Client";
import sqlite3 from "sqlite3";

//creation d'un client
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
  //recuperation de l'ID du dernier client inserer
  return result.lastID;
};

//recuperation de tous les clients
export const getClients = async (
  db: Database<sqlite3.Database>
): Promise<Client[]> => {
  const clients: Client[] = await db.all("Select * from clients");
  return clients;
};
