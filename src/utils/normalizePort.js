// @flow

const DEFAULT_PORT: number = 3000;

export default function normalizePort(val: any): number | string {
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;

  if (port && Number.isNaN(port)) return port;
  if (port >= 0) return port;
  return DEFAULT_PORT;
}
