const { DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;

module.exports = DB_URL.replace("<DB_USERNAME>", DB_USERNAME).replace(
  "<DB_PASSWORD>",
  DB_PASSWORD
);
