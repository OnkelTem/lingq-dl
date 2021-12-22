const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const fileContents = fs.readFileSync(path.join(__dirname, './lingq-api.yaml'), 'utf8');

// Parse YAML
let data;
try {
  data = yaml.load(fileContents);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

// Write new YAML (resolved and 100% correct)
delete data.header;
fs.writeFileSync(path.join(__dirname, './lingq-api_openapi.yaml'), yaml.dump(data, { noRefs: true }), 'utf8');
