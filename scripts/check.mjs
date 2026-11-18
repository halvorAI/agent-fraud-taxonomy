// Validates taxonomy.json against schema/taxonomy.schema.json, then checks what a schema can't:
// unique ids and keys, ids in order, and every pattern's check value listed in single_mandate_check_values.
import { readFileSync } from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const taxonomy = read('taxonomy.json');
const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(read('schema/taxonomy.schema.json'));
const problems = [];
if (!validate(taxonomy)) problems.push(...validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}`));
const patterns = Array.isArray(taxonomy.patterns) ? taxonomy.patterns : [];
for (const field of ['id', 'key']) {
  const seen = new Set();
  for (const p of patterns) {
    if (seen.has(p[field])) problems.push(`duplicate ${field}: ${p[field]}`);
    seen.add(p[field]);
  }
}
patterns.forEach((p, i) => {
  const want = `AFT-${String(i + 1).padStart(2, '0')}`;
  if (p.id !== want) problems.push(`pattern ${i + 1} has id ${p.id}, expected ${want}`);
  if (!taxonomy.single_mandate_check_values?.includes(p.caught_by_single_mandate_check))
    problems.push(`${p.id}: caught_by_single_mandate_check is not in single_mandate_check_values`);
});
if (problems.length) {
  console.error(problems.map((p) => `- ${p}`).join('\n'));
  process.exit(1);
}
console.log(`taxonomy.json is valid: ${patterns.length} patterns.`);
