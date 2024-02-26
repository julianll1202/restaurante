import app from "./app.js";
import { PORT } from "./config/index.js";

async function main() {
    app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
}

main();