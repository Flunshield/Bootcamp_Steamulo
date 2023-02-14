// eslint-disable-next-line @typescript-eslint/ban-types
export type UserInfo = {
  self: string | null;
  id: string | null;
  origin: string | null;
  createdTimestamp: string | null;
  username: string | null;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  federationLink: string | null;
  serviceAccountClientId: string | null;
  attributes: string | null;
  credentials: string | null;
  disableableCredentialTypes: string[] | null;
  requiredActions: string[] | null;
  federatedIdentities: string | null;
  realmRoles: string | null;
  clientRoles: string | null;
  clientConsents: string | null;
  notBefore: string | null;
  applicationRoles: string | null;
  socialLinks: string | null;
  groups: string | null;
  access: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };
};
