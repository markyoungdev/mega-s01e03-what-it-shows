import {mount,hydrate} from 'svelte';
const pages=import.meta.glob('/src/routes/**/+page.svx',{eager:true});
const key='/src/routes'+location.pathname.replace(/\/$/,'')+'/+page.svx';
(document.getElementById('app').hasChildNodes()?hydrate:mount)((pages[key]??pages['/src/routes/kb/+page.svx']).default,{target:document.getElementById('app')});
