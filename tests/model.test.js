import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyData,validate,totals,personalRecords,encode,decode} from '../web/model.js';
test('daily totals separate dates and sum food, cardio and sleep',()=>{const d=emptyData();d.entries=[{date:'2026-10-23',calories:500,protein:30},{date:'2026-10-23',calories:250,protein:20},{date:'2026-10-23',minutes:35},{date:'2026-10-23',hours:7.5},{date:'2026-10-22',calories:900}];assert.deepEqual(totals(d,'2026-10-23'),{calories:750,protein:50,cardio:35,sleep:7.5})});
test('PR selects highest load then reps, ignoring case',()=>{const d=emptyData();d.entries=[{type:'pr',name:'Sentadilla',weight:80,reps:5},{type:'pr',name:'sentadilla',weight:100,reps:3},{type:'pr',name:'Sentadilla',weight:100,reps:5}];assert.equal(personalRecords(d).length,1);assert.equal(personalRecords(d)[0].reps,5)});
test('GitHub encoding preserves Spanish and Unicode',()=>{const d=emptyData();d.entries=[{id:'1',date:'2026-10-23',name:'Salmón 🥗',type:'food',calories:500,protein:30}];assert.deepEqual(decode(encode(d)),d)});
test('rejects corrupt remote data before replacing local state',()=>{assert.throws(()=>validate({version:2,entries:[]}));const d=emptyData();d.goals.sleep=0;assert.throws(()=>validate(d));const f=emptyData();f.entries=[{id:'1',date:'2026-10-23',type:'food',name:'x',calories:-1,protein:3}];assert.throws(()=>validate(f))});
