module.exports = (text: string) => text.replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
