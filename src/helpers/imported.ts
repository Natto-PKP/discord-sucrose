/**
 * @internal
 */
export default async (path: string, prop?: string): Promise<unknown> => {
  const obj = await import(path);
  if (prop && obj[prop]) return obj[prop];
  if (obj.default) return obj.default;
  return obj;
};
