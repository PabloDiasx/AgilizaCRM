import { getCurrentUser } from '@/lib/auth';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="shell-header">
      <div>
        <p className="shell-kicker">CRM focado em execucao diaria</p>
        <h2 className="shell-title">Bom dia, {user?.name ?? 'time'}.</h2>
        <p className="shell-text">Priorize follow-up vencido, lead sem contato e negocio parado.</p>
      </div>
      <div className="user-chip">
        <div>{user?.email ?? 'sem sessao'}</div>
        <div className="role">{user?.role ?? 'guest'}</div>
      </div>
    </header>
  );
}
