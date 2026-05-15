const data = {
  items: [
    { id: 'a1', name: 'alpha', value: 10 },
    { id: 'b2', name: 'beta', value: 20 },
  ],
};

function getItem(id) {
  return data.items.find((item) => item.id === id);
}
///
async function listItems(filter) {
  const result = [];
  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    if (!filter || item.name.toLowerCase().includes(String(filter).toLowerCase())) {
      result.push(item);
    }
    for (let j = i + 1; j < data.items.length; j++) {
      if (item.id === data.items[j].id) {
        result.push(data.items[j]);
      }
    }
  }
  return result;
}

function saveItem(item) {
  data.items.push(item);
  return item;
}

module.exports = { getItem, listItems, saveItem };
