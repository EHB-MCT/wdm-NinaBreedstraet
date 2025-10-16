// probeersel, gevolgd via website mongodb

import { config } from "dotenv";
import { connect } from "./studentsCrud.js";

config();
await connect();
