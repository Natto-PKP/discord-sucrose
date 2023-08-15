import PermissionError from 'src/errors/PermissionError';
import Permission, { type PermissionData, type PermissionExecuteParams } from '../structures/Permission';
import BaseManager from './BaseManager';

type Perm = Permission | PermissionData | string;

export default class PermissionManager extends BaseManager<Permission, PermissionData> {
  protected override readonly _structure = Permission;

  public async check(permissions: Perm[] | Perm, params: PermissionExecuteParams) {
    const perms = Array.isArray(permissions) ? permissions : [permissions];

    await Promise.all(perms.map(async (p) => {
      const perm = this.resolve(p);
      if (!perm) return;

      if (perm.type === 'ROLE') {
        if (!params.member) return;
        const roles = Array.isArray(params.member.roles)
          ? params.member.roles
          : params.member.roles.cache.map((r) => r.id);

        if (perm.allowed?.length) { if (!perm.allowed.some((r) => roles.includes(r))) throw new PermissionError(perm, 'MISSING_ROLE'); }
        if (perm.denied?.length) { if (perm.denied.some((r) => roles.includes(r))) throw new PermissionError(perm, 'HAS_DENIED_ROLE'); }
      } else if (perm.type === 'USER') {
        if (!params.user) return;

        if (perm.allowed?.length) { if (!perm.allowed.includes(params.user.id)) throw new PermissionError(perm, 'NOT_ALLOWED_USER'); }
        if (perm.denied?.length) { if (perm.denied.includes(params.user.id)) throw new PermissionError(perm, 'DENIED_USER'); }
      } else if (perm.type === 'GUILD') {
        if (!params.guild) return;

        if (perm.allowed?.length) { if (!perm.allowed.includes(params.guild.id)) throw new PermissionError(perm, 'NOT_ALLOWED_GUILD'); }
        if (perm.denied?.length) { if (perm.denied.includes(params.guild.id)) throw new PermissionError(perm, 'DENIED_GUILD'); }
      } else if (perm.type === 'CHANNEL') {
        if (!params.channel) return;

        if (perm.allowed?.length) { if (!perm.allowed.includes(params.channel.id)) throw new PermissionError(perm, 'NOT_ALLOWED_CHANNEL'); }
        if (perm.denied?.length) { if (perm.denied.includes(params.channel.id)) throw new PermissionError(perm, 'DENIED_CHANNEL'); }
      } else if (perm.type === 'MEMBER') {
        if (!params.member) return;
        if (!perm.permissions || typeof params.member.permissions === 'string') return;
        const missing = params.member.permissions.missing(perm.permissions);

        if (missing.length) throw new PermissionError(perm, 'MEMBER_MISSING_PERMISSIONS');
      } else if (perm.type === 'SELF') {
        if (!params.guild) return;
        if (!perm.permissions) return;

        const clientUser = params.guild.members.me;
        if (!clientUser) return;

        const missing = clientUser.permissions.missing(perm.permissions);
        if (missing.length) throw new PermissionError(perm, 'CLIENT_MISSING_PERMISSIONS');
      } else if (perm.type === 'ONLY_GUILD') {
        if (!params.guild) throw new PermissionError(perm, 'ONLY_GUILD');
      } else if (perm.type === 'ONLY_PRIVATE') {
        if (params.guild) throw new PermissionError(perm, 'ONLY_PRIVATE');
      } else if (perm.type === 'CUSTOM') {
        if (!perm.condition) return;
        if (!(await perm.condition(params))) throw new PermissionError(perm, 'CUSTOM_CONDITION_FAILED');
      }
    }));
  }
}
