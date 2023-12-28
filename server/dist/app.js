import express from 'express';
import { config } from 'dotenv';
config();
const app = express();
//middleware to tell app that we're using JSON for incoming and outcoming request, parses to JSON
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map