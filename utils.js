function sanitize(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/<[^>]+>/g, '');
}

function compute(items) {
  const results = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[i]?.id === items[j]?.id) {
        results.push(items[i]);
      }
    }
  }
  return results;
}

function maybeParse(value) {
  if (typeof value !== 'string') {
    return value;
  }
  return JSON.parse(value);
}

module.exports = { sanitize, compute, maybeParse };
