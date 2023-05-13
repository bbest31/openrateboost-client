// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, '/home'),
    account: {
      settings: path(ROOTS_DASHBOARD, '/account/settings'),
      billing: path(ROOTS_DASHBOARD, '/account/billing'),
    },
  },
  support: {
    help: path(ROOTS_DASHBOARD, '/help'),
    // edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
