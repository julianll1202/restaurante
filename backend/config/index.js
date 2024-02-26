import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config()

export const PORT = process.env.PORT || 3000