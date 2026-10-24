export const emptyData = () => ({ version: 1, goals: { calories: 2200, protein: 150, cardio: 30, sleep: 8 }, entries: [] });
export function validate(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.entries)) throw Error('Formato de datos no compatible.');
  for (const key of ['calories','protein','cardio','sleep']) if (!Number.isFinite(data.goals?.[key]) || data.goals[key] <= 0) throw Error('Objetivos no válidos.');
  const ids = new Set();
  for (const e of data.entries) {
    if (!e || !['food','pr','cardio','sleep'].includes(e.type) || typeof e.id !== 'string' || ids.has(e.id) || typeof e.name !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) throw Error('Registro no válido.');
    ids.add(e.id);
    const keys = { food:['calories','protein'], pr:['weight','reps'], cardio:['minutes'], sleep:['hours'] }[e.type];
    for (const key of keys) if (!Number.isFinite(e[key]) || e[key] < 0) throw Error('Valor no válido.');
  }
  return data;
}
export function totals(data, date) {
  return data.entries.filter(e => e.date === date).reduce((a,e) => ({ calories:a.calories+(e.calories||0), protein:a.protein+(e.protein||0), cardio:a.cardio+(e.minutes||0), sleep:a.sleep+(e.hours||0) }), {calories:0,protein:0,cardio:0,sleep:0});
}
export function personalRecords(data) {
  const map = new Map();
  for (const e of data.entries.filter(e=>e.type==='pr')) {
    const k=e.name.trim().toLocaleLowerCase(); const old=map.get(k);
    if (!old || e.weight>old.weight || (e.weight===old.weight && e.reps>old.reps)) map.set(k,e);
  }
  return [...map.values()];
}
export const encode = data => btoa(Array.from(new TextEncoder().encode(JSON.stringify(data,null,2)), byte => String.fromCharCode(byte)).join(''));
export const decode = content => validate(JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(content.replace(/\s/g,'')), c=>c.charCodeAt(0)))));
