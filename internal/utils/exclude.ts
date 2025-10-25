export function excludeFiles(files: string[]) {
  const excludes = ['node_modules']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}
