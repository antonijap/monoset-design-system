import { useState } from 'react';

export default function DemoLauncher({ label = 'Run demo', load, demoProps }) {
  const [Demo, setDemo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const runDemo = async () => {
    setLoading(true);
    setError(false);
    try {
      const module = await load();
      setDemo(() => module.default);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (Demo) return <Demo {...demoProps}/>;

  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8,
      padding:'18px 20px', marginBottom:16,
      border:'1px solid var(--border-subtle)', borderRadius:8,
      background:'var(--bg-subtle)',
    }}>
      <button type="button" onClick={runDemo} disabled={loading} style={{
        border:'1px solid var(--border)', borderRadius:6,
        padding:'7px 12px', background:'var(--bg)', color:'var(--fg1)',
        font:'inherit', fontSize:12, fontWeight:600, cursor:loading?'wait':'pointer',
      }}>
        {loading ? 'Loading…' : label}
      </button>
      {error && <span role="alert" style={{ fontSize:12, color:'var(--status-danger)' }}>Could not load the demo.</span>}
    </div>
  );
}
