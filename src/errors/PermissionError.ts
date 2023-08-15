import Permission, { type PermissionData } from '../structures/Permission';

export enum PermissionErrors {
  MISSING_ROLE = 'missing role',
  HAS_DENIED_ROLE = 'has denied role',
  NOT_ALLOWED_USER = 'not included in allowed user',
  DENIED_USER = 'is a denied user',
  NOT_ALLOWED_GUILD = 'not included in allowed guild',
  DENIED_GUILD = 'is a denied guild',
  NOT_ALLOWED_CHANNEL = 'not included in allowed channel',
  DENIED_CHANNEL = 'is a denied channel',
  MEMBER_MISSING_PERMISSIONS = 'member missing permissions',
  CLIENT_MISSING_PERMISSIONS = 'client missing permissions',
  ONLY_GUILD = 'only guild allowed',
  ONLY_PRIVATE = 'only private allowed',
  CUSTOM_CONDITION_FAILED = 'custom permission condition failed',
}

export default class PermissionError extends Error {
  constructor(
    public permission: Permission | PermissionData,
    public type: keyof typeof PermissionErrors,
    message = PermissionErrors[type],
  ) {
    super(message);
  }
}
