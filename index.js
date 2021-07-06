import fs from "fs";
import contentful from "contentful-management";
import Parser from "csv-parse";
import prat from "prat";

// thor-catalog
const ACCESS_TOKEN = "CFPAT-XXXXXXXXXXXXXXXXXXXXX";
const SPACE_ID = "xxxxxxxxxxxxx";
const CONTENT_TYPE_ID = "terminal";

const client = contentful.createClient({
  accessToken: ACCESS_TOKEN,
});

async function main() {
  const space = await client.getSpace(SPACE_ID);
  const parser = new Parser({ delimiter: ";", columns: false });
  const rows = fs.createReadStream("./file.csv").pipe(parser);
  const entries = await prat
    .ify(rows)
    .map((row) => {
      rowToEntry(space, row);
    })
    .reduce([], (entries, entry) => entries.concat(entry))
    .catch((err) => console.log("Unexpected error"));
}

/**
 * Finds an entry and updates it, or creates a new entry if no existing entry is found.
 * The update logic simply overwrites the existing fields, a deep merge would
 * be a better strategy if the entries also have fields that are edited by humans.
 */

async function rowToEntry(space, row) {
  const id = `${row[0].trim()}`;
  const sys = { id };
  const fields = rowToFields(row);
  try {
    const entry = await space
      .getEntry(id)
      .catch((err) => console.log("*** error al update entry: ", id));
    entry.fields = fields;
    console.log("Update", id);
    return await space.updateEntry(entry);
  } catch (_) {
    console.log("Create", id);
    return await space
      .createEntry(CONTENT_TYPE_ID, { sys, fields })
      .catch((err) => console.log("*** error al crear entry: ", id, err));
  }
}

/**
 * This helper maps a CSV row to the contentful fields structure.
 * Currently it's hard-coded to use en-US, but expanding this script to support
 * multiple locales (maybe by importing different files) would be trivial.
 */
function rowToFields(row) {
  return {
    idTerminal: { "es-ES": row[0].trim().toString() },
    terminalName: { "es-ES": row[1].trim().toString() },
  };
}

main().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
