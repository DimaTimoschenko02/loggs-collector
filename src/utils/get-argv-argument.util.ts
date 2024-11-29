export function getArgvArgumentUtil<T extends boolean>(
  name: string,
  nullable: T,
): T extends true ? string | null : string {
  const index = process.argv.findIndex((arg) => arg.includes(name));

  if (index === -1) {
    if (nullable) return null as any;
    throw new Error(`Provide ${name}`);
  }

  return process.argv[index].split("=")[1];
}
