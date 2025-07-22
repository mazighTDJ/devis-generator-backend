import { Router, Request, Response, request } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Client } from "./types/Client";
import { createClient } from "./services/serviceClient";

const router = Router(); //middelware router  destiner a encapsuler toutes les routes

//recuperation de tout les clients
router.get("/clients", async (req: Request, res: Response) => {
  const db = req.app.locals.db as Database<sqlite3.Database>;

  const allClients: Client[] = await db.all("Select * from clients");

  res.json(allClients);
});

//ajout d'un nouveau client
router.post("/createClient", async (req: Request, res: Response) => {
  const db = req.app.locals.db as Database<sqlite3.Database>;

  const { idInc, name, adress } = req.body;
  //console.log(req.body);

  try {
    const id = await createClient(db, idInc, name, adress);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'ajout du client, " + err });
  }
});

router.get("/testpost", (req, res) => {
  res.status(201);
});
export default router;
