import { MESSAGES, OPERATIONS } from "./constants.js";
import { app } from "./app.js";
import { parseArgs } from "./utils.js";

const args = parseArgs();
const username = args.length ? args.find(([key]) => key === "username")[1] : "anon";

const init = async (username) => {
  await app(username);
};

init(username);
