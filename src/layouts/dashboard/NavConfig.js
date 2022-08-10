// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon('ic:round-space-dashboard'),
  },
  {
    title: 'games',
    path: '/dashboard/games',
    icon: getIcon('fa6-solid:diagram-project'),
  },
  {
    title: 'leaderboard',
    path: '/dashboard/leaderboard',
    icon: getIcon('majesticons:analytics'),
  },
  // {
  //   title: 'budget',
  //   path: '/dashboard/budget',
  //   icon: getIcon('lucide:coffee'),
  // },

  {
    title: 'roadmap',
    path: '/dashboard/roadmap',
    icon: getIcon('carbon:roadmap'),
  },
  {
    title: 'questions',
    path: '/dashboard/questions',
    icon: getIcon('akar-icons:question'),
  },
];

export default navConfig;
