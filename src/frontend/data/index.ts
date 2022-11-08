import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import LockIcon from '@mui/icons-material/Lock';

const languages = [
  {
    title: 'English',
    value: 'en'
  },
  {
    title: 'Chinese Simplified',
    value: 'zh-CN'
  },
  {
    title: 'Chinese Traditional',
    value: 'zh-TW'
  },
  {
    title: 'Portuguese',
    value: 'pt'
  },
  {
    title: 'Spanish',
    value: 'es'
  },
  {
    title: 'Japanese',
    value: 'ja'
  },
  {
    title: 'Korean',
    value: 'ko'
  },
  {
    title: 'Hindi',
    value: 'hi'
  },
  {
    title: 'French',
    value: 'fr'
  },
  {
    title: 'German',
    value: 'de'
  },
  {
    title: 'Italian',
    value: 'it'
  },
  {
    title: 'Romanian',
    value: 'ro'
  },
  {
    title: 'Arabic',
    value: 'ar'
  },
  {
    title: 'Ukrainian',
    value: 'uk'
  },
  {
    title: 'Russian',
    value: 'ru'
  }
];

export const DEFAULT_POSTS_PAGINATION = {
  post_type: 'all',
  draw: 3,
  columns: [
    {
      data: 'id',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: '',
        regex: false
      }
    },
    {
      data: 'content',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: '',
        regex: false
      }
    }
  ],
  order: [
    {
      column: 0,
      dir: 'desc'
    }
  ],
  start: 0,
  length: 5,
  hasNext: true,
  search: {
    value: '',
    regex: false
  }
};

export const postTypes = {
  all: { label: 'All', value: 'all' },
  text: { label: 'Text', value: 'text' },
  image: { label: 'Image', value: 'image' },
  video: { label: 'Video', value: 'video' }
};

export const followerSubmenu = [
  {
    name: 'All Followers',
    href: '/followers',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Follower Requests',
    href: '/followers/requests',
    icon: null,
    selectionCondition: 'includes'
  }
];

// Submenu
export const settingsSubmenu = [
  {
    name: 'Profile',
    href: '/settings/profile',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Account',
    href: '/settings/account',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Privacy and safety',
    href: '/settings/privacy-and-safety',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Notifications',
    href: '/settings/notifications',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuGeneral = [
  {
    name: 'Display',
    href: '/settings/display',
    icon: null,
    selectionCondition: 'equal'
  }
];


export const settingsSubmenuLanguage = (language : any) => [
  {
    name: 'Language',
    subname: languages.filter((currLang) => currLang.value === language)[0].title,
    href: '/settings/display/language',
    icon: null,
    selectionCondition: 'equal',
    translate: 'notranslate'
  }
];

// Submenu Account
export const settingsSubmenuAccount = [
  {
    name: 'Username',
    subname: '@username',
    href: '/settings/display/account/username',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Email',
    subname: 'email@dint.com',
    href: '/settings/display/account/email',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Phone number',
    href: '/settings/display/account/phone-number',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuSocialAccount = [
  {
    name: 'Twitter account',
    href: '/settings/display/account/twitter',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Google account',
    href: '/settings/display/account/google',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuConnectAccount = [
  {
    name: 'Connect another Dint.com accounts',
    href: '/settings/display/account/connect',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuConnectSecurity = [
  {
    name: 'Password',
    href: '/settings/display/account/password',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Login session',
    href: '/settings/display/account/login-session',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Two step Authentication',
    href: '/settings/display/account/authentication',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Windows Hello Authentication',
    href: '/settings/display/account/hello-authentication',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuAccountManagement = [
  {
    name: 'Delete account',
    href: '/settings/display/account/delete',
    icon: null,
    selectionCondition: 'equal'
  }
];

// Submenu Notification
export const settingsSubmenuNotification = [
  {
    name: 'Notification',
    href: '/settings/display/notification',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuNotificationList = [
  {
    name: 'Push notification',
    href: '/settings/display/notification/push',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Email notification',
    href: '/settings/display/notification/email',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Site notification',
    href: '/settings/display/notification/site',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'Toast notification',
    href: '/settings/display/notification/toast',
    icon: null,
    selectionCondition: 'equal'
  },
  {
    name: 'SMS notification',
    href: '/settings/display/notification/sms',
    icon: null,
    selectionCondition: 'equal'
  }
];

export const settingsSubmenuNotificationOther = [
  {
    name: 'Telegram bot',
    href: '/settings/display/notification/tg-bot',
    icon: null,
    selectionCondition: 'equal'
  }
];

// Bookmark
export const bookmarkSubmenu = [
  {
    name: 'ALL BOOKMARKS',
    href: '/bookmarks/all-bookmarks',
    icon: LibraryAddCheckIcon,
    selectionCondition: 'equal'
  },
  {
    name: 'PHOTOS',
    href: '/bookmarks/photos',
    icon: CropOriginalIcon,
    selectionCondition: 'equal'
  },
  {
    name: 'VIDEOS',
    href: '/bookmarks/videos',
    icon: VideocamIcon,
    selectionCondition: 'equal'
  },
  {
    name: 'AUDIO',
    href: '/bookmarks/audio',
    icon: MicIcon,
    selectionCondition: 'equal'
  },
  {
    name: 'OTHER',
    href: '/bookmarks/other',
    icon: TextIncreaseIcon,
    selectionCondition: 'equal'
  },
  {
    name: 'LOCKED',
    href: '/bookmarks/locked',
    icon: LockIcon,
    selectionCondition: 'equal'
  }
];

// Referrals
export const referralsSubmenu = [
  {
    name: 'REFERRAL PROGRAM',
    href: '/referrals',
    icon: null,
    selectionCondition: 'equal'
  }
];
