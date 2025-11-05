import fs from 'fs';

// 1. Legge il file originale
const raw = fs.readFileSync('./ingredients.json', 'utf-8');
const ingredients = JSON.parse(raw);

// 2. Rimuove i duplicati in base all'id
const unique = Array.from(
  new Map(ingredients.map(item => [item.id, item])).values()
);

// 3. Salva il file pulito
fs.writeFileSync('./ingredients-clean.json', JSON.stringify(unique, null, 2));

console.log(`✅ Ingredienti puliti!`);
console.log(`👉 Ingredienti originali: ${ingredients.length}`);
console.log(`👉 Ingredienti unici: ${unique.length}`);
console.log(`📁 Salvato in "ingredients-clean.json"`);
