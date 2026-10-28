<script lang="ts">
 import reports from '#lib/data/reports-4471.json';
 import notes from '#lib/data/desk-notes.json';
 import {uniqueById,causeOf,type Report} from '#lib/kb/causes';
 import {tenantOf} from '#lib/kb/locales';
 const rs=uniqueById(reports as Report[]).filter(r=>r.mergedInto===4471);
 const groups=[
  {name:'Month-first shared parser',key:'parser',rs:rs.filter(r=>!notes.oneDayMove.includes(r.id)&&causeOf(r,tenantOf(r))==='parser')},
  {name:'booking-v3 date hint contradicts locale',key:'hint',rs:rs.filter(r=>!notes.oneDayMove.includes(r.id)&&causeOf(r,tenantOf(r))==='hint')},
  {name:'One-day / timing anomalies — cause unconfirmed',key:'timing',rs:rs.filter(r=>notes.oneDayMove.includes(r.id))}
 ];
 const july=rs.filter(r=>r.mergedAt?.slice(0,10)==='2026-07-02');
</script>
<p><strong>{rs.length} unique reports</strong>; {reports.length-rs.length} repeated export rows excluded.</p>
<table><thead><tr><th>Problem</th><th>Reports</th><th>Tenants</th><th>Evidence</th></tr></thead><tbody>
{#each groups as g}<tr><td>{g.name}</td><td>{g.rs.length}</td><td>{new Set(g.rs.map(r=>r.tenant)).size}</td><td>{g.rs[0]?.id} → {g.rs.at(-1)?.id}</td></tr>{/each}
</tbody></table>
<p>{july.length} reports were merged on July 2; {july.filter(r=>r.receivedAt.slice(0,10)<'2026-07-02').length} had arrived earlier. Merge time measures desk activity, not when the problem began.</p>
<h3>Reports the current classifier hides</h3>
<ul>{#each groups[2].rs as r}<li><strong>{r.id}</strong> · {r.tenant} · {r.channel}: {r.body}</li>{/each}</ul>
