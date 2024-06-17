import express from "express";

import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
  res.json({
    message: "Hello World from router",
  });
});

export default homeRouter