import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./routes";

import { connectToDb } from "./db";
import sqlite3 from "sqlite3";
import { Database } from "sqlite";

const app: Application = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:5173", // ton front
    credentials: true, // autoriser l'envoi de cookies ou d'en-têtes d'auth
  })
); // Ajout CORS

app.use(express.json());

//connexion a la bd au demarrage du serveur
//fonction qui s'auto-execute
(async () => {
  const db: Database<sqlite3.Database> = await connectToDb();

  app.locals.db = db;

  app.listen(port, () => {
    console.log(`Serveur SQLite sur http://localhost:${port}`);
  });

  app.use("/api", router);
})();

// connectToDb()
//   .then((db) => {
//     app.locals.db = db;
//     //console.log(db);

//     //utiliser toutes les routes
//     app.use("/api", router);
//   })
//   .catch((err) => {
//     console.log("erreur de connexion a la db: ", err);
//   });

// // app.get("/", (req: Request, res: Response) => {
// //   console.log("route server");
// // });

// app.listen(port, () => {
//   console.log(`Serveur SQLite sur http://localhost:${port}`);
// });
