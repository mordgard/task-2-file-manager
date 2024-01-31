import os from "node:os";

export const cpus = () => {
  const cpus = os.cpus().map(({ model, speed }) => ({
    model,
    "speed (GHz)": speed / 1000,
  }));
  console.table(cpus);
};

export const homedir = () => {
  console.log(os.homedir());
};

export const architecture = () => {
  console.log(os.arch());
};

export const eol = () => {
  console.log(os.EOL);
};
