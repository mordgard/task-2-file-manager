export const MESSAGES = {
  welcome(username) {
    return `Welcome to the File Manager, ${username}!`;
  },
  bye(username) {
    return `Thank you for using File Manager, ${username}, goodbye!`;
  },
  currentPath(path) {
    return `You are currently in ${path}`;
  },

  invalid: "Invalid input",
  failed: "Operation failed",

  exit: ".exit",
};

export const OPERATIONS = {
  up: "up",
  cd: "cd",
  ls: "ls",

  cat: "cat",
  add: "add",
  rn: "rn",
  cp: "cp",
  mv: "mv",
  rm: "rm",

  os: "os",

  hash: "hash",

  compress: "compress",
  decompress: "decompress",
};

export const ARGS = ["--EOL", "--cpus", "--homedir", "--username", "--architecture"];
