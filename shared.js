
const CFG = window.RED_CLAY_CONFIG || {};
const DB_URL = (CFG.DATABASE_URL || "").replace(/\/+$/, "");
const ROOM_ID = CFG.ROOM_ID || "red-clay-default";
const STATE_URL = `${DB_URL}/rooms/${encodeURIComponent(ROOM_ID)}.json`;
function configured(){return DB_URL.startsWith("https://")&&!DB_URL.includes("PASTE_YOUR");}
function defaultState(){return {breakTitle:"NFL RANDOM TEAM BREAK",breakNumber:"1",selected:{},updatedAt:Date.now()};}
async function readState(){if(!configured())throw new Error("Firebase is not configured.");const r=await fetch(`${STATE_URL}?t=${Date.now()}`,{cache:"no-store"});if(!r.ok)throw new Error(`Read failed (${r.status})`);return Object.assign(defaultState(),await r.json()||{});}
async function writeState(s){if(!configured())throw new Error("Firebase is not configured.");s.updatedAt=Date.now();delete s.buyers;const r=await fetch(STATE_URL,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!r.ok)throw new Error(`Save failed (${r.status})`);return s;}
