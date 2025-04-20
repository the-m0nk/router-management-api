import express, { Express } from "express";
import { errorHandler } from "./middleware/errorHandler";
import { routerRoutes } from "./routes/routerRoutes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/router", routerRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
