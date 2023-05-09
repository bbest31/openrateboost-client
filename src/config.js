// @mui
import { enUS, frFR, zhCN, viVN, arSD } from '@mui/material/locale';
import { PATH_DASHBOARD } from './routes/paths';

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = `${PATH_DASHBOARD.root}?login=true`; // as '/dashboard'
// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const SERVER_API = process.env.REACT_APP_API_SERVER || '';

export const STRIPE_PORTAL_URL = process.env.REACT_APP_STRIPE_PORTAL_URL || '';

export const EXT_WEBPAGE = process.env.REACT_APP_EXT_WEBPAGE || '';

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  redirectURI: `${window.location.origin}${PATH_AFTER_LOGIN}`,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  scope: process.env.REACT_APP_AUTH0_SCOPE,
};

export const MIXPANEL_API = {
  debug: process.env.NODE_ENV !== 'production',
};

export const MAX_FREE_USES = process.env.NODE_ENV === 'production' ? 10 : 1000;
export const MAX_BASIC_USES = 25;
export const MAX_PREMIUM_USES = 100;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'default',
  themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSD,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
];

export const defaultLang = allLangs[0]; // English
