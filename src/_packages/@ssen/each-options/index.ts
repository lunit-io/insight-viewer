export function eachOptions<T extends {}>(options: { [K in keyof T]: T[K][] }): Partial<T>[] {
  const names = Object.keys(options) as (keyof T)[];
  const result: Partial<T>[] = [];

  function search(fixed: Partial<T>, index: number) {
    if (index < names.length - 1) {
      for (const v of options[names[index]]) {
        search({ ...fixed, [names[index]]: v }, index + 1);
      }
    } else {
      for (const v of options[names[index]]) {
        result.push({ ...fixed, [names[index]]: v });
      }
    }
  }

  search({}, 0);

  return result;
}

export default eachOptions;
