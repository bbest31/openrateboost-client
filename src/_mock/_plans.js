import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: ['JavaScript version', 'TypeScript version', 'Design Resources', 'Commercial applications'],
  icons: [
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_sketch.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_figma.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_js.svg',
    'https://minimal-assets-api-dev.vercel.app/assets/images/home/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'free trial',
    icon: <PlanFreeIcon />,
    price: 0,
    // caption: 'forever',
    lists: [
      { text: 'Limited to 10 uses', isAvailable: true },
      { text: 'Open rates for subject lines', isAvailable: false },
      // { text: 'Up to 5 team members', isAvailable: false },
      // { text: 'Advanced security', isAvailable: false },
      // { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'Choose Free Trial',
    active: false,
  },
  {
    subscription: 'basic',
    icon: <PlanStarterIcon />,
    price: 4.99,
    // caption: 'saving $24 a year',
    lists: [
      { text: 'Up to 25 uses per month', isAvailable: true },
      { text: 'Open rates for subject lines', isAvailable: true },
      // { text: '3 boards', isAvailable: true },
      // { text: 'Up to 5 team members', isAvailable: true },
      // { text: 'Advanced security', isAvailable: false },
      // { text: 'Permissions & workflows', isAvailable: false },
    ],
    active: false,
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 19.99,
    // caption: 'saving $124 a year',
    lists: [
      { text: 'Up to 100 uses per month', isAvailable: true },
      { text: 'Open rates for subject lines', isAvailable: true },
      // { text: '3 boards', isAvailable: true },
      // { text: 'Up to 5 team members', isAvailable: true },
      // { text: 'Advanced security', isAvailable: true },
      // { text: 'Permissions & workflows', isAvailable: true },
    ],
    active: false,
    labelAction: 'choose premium',
  },
];
