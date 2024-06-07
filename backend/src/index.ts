import express, { Request, Response } from "express";

const app = express();
const PORT =  50001;


app.listen(PORT, () => {
  console.log(`Server is running  but on http://localhost:${PORT}`);
});
