export default async (path: string, prop?: string): Promise<unknown> => {
  const obj = await import(path);
  if (obj.default) return obj.default;
  if (prop && obj[prop]) return obj[prop];
  return obj;
};
