import os from "node:os";

const cpus = () => {
  const cpus = os.cpus().map(({ model, speed }) => ({
    model,
    "speed (GHz)": speed / 1000,
  }));
  console.table(cpus);
};

const homedir = () => {
  console.log(os.homedir());
};

const architecture = () => {
  console.log(os.arch());
};

const eol = () => {
  console.log(os.EOL);
};

const username = () => {
  console.log(os.userInfo().username);
};

const os_module = {
  "--cpus": cpus,
  "--EOL": eol,
  "--homedir": homedir,
  "--username": username,
  "--architecture": architecture,
};

export { os_module };
