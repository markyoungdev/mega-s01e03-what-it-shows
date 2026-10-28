import {createServer} from 'vite';
import fs from 'node:fs';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 const {render}=await server.ssrLoadModule('svelte/server');
 const template=fs.readFileSync('dist/index.html','utf8');
 const files=fs.readdirSync('src/routes/kb',{recursive:true}).filter(f=>f.endsWith('+page.svx'));
 for(const file of ['+page.svx',...files.filter(f=>f!=='+page.svx')]) {
  const route='/kb/'+file.replace(/\+page.svx$/,'');
  const mod=await server.ssrLoadModule('/src/routes/kb/'+file);
  const out=render(mod.default);
  const path='dist'+route;
  fs.mkdirSync(path,{recursive:true});
  fs.writeFileSync(path+'index.html',template.replace('<div id="app"></div>','<div id="app">'+out.body+'</div>').replace('</head>',out.head+'</head>'));
 }
} finally {await server.close();}
