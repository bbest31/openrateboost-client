// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import { STRIPE_CONFIG, EXT_WEBPAGE } from '../../../config';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  account: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban'),
  chat: getIcon('ic_chat'),
  launch: getIcon('ic_launch'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Home', path: '/dashboard/home', icon: ICONS.kanban },
      {
        title: 'account',
        path: '/dashboard/account',
        icon: ICONS.account,
        children: [
          { title: 'Settings', path: '/dashboard/account/settings' },
          { title: 'Billing', path: STRIPE_CONFIG.portalUrl },
        ],
      },
      { title: 'Install Extension', path: EXT_WEBPAGE, icon: ICONS.launch },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'support',
    items: [{ title: 'help', path: '/dashboard/help', icon: ICONS.chat }],
  },
];

export default navConfig;
