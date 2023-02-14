import type { Commit, UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', ['upper-case']],
    'scope-empty': [1, 'never'],
    'scope-custom': [2, 'always'],
    'header-max-length': [2, 'always', 72],
  },
  plugins: [
    {
      rules: {
        'scope-custom': (parsed: Commit) => {
          if (parsed.scope === null) {
            return [true];
          }
          const regex = /BSJ-[\d+]/;
          return [
            regex.test(parsed.scope || ''),
            'Your scope must match the pattern (BSP-XXX) where X is the JIRA ticker number',
          ];
        },
      },
    },
  ],
};

module.exports = Configuration;
