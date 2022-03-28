export const dataGenerator = (n) => {
  const items = new Array(n);
  for (let i = 0; i < n; i++) {
    items[i] = {
      id: i + 1,
      someText: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substring(0, 5),
      age: Math.floor(Math.random() * 63) + 18,
    };
  }
  return items;
};
