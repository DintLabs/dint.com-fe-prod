/* eslint-disable no-useless-escape */
import * as _ from 'lodash';
import moment from 'moment';

import { ETHERIUM, POLYGON_MAINNET, SOLANA_MAINNET } from '../web3/model';

export const OPTIONS_NETWORK_STAD = {
  ERC_21: {
    name: 'TOKEN',
    key: 'ERC_21',
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId]
  },
  TOKEN_721: {
    name: 'TOKEN 721',
    key: 'ERC_721',
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId]
  },
  TOKEN_1155: {
    name: 'TOKEN 1155',
    key: 'ERC_1155',
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId]
  },
  NFT: {
    name: 'NFT',
    key: 'NFT',
    networks: [SOLANA_MAINNET.uniqueId]
  },
  SPL: {
    name: 'TOKEN',
    key: 'SPL',
    networks: [SOLANA_MAINNET.uniqueId]
  }
};

export const IS_TOKEN = (networkStandard: any) => ['ERC_20', 'SPL'].includes(networkStandard);

export const IS_NFT = (networkStandard: string) =>
  ['NFT', 'ERC_721', 'ERC_1155'].includes(networkStandard);

// const CONTRACT_TYPE_MORALIS = {
//   TOKEN_1155: 'ERC1155',
//   TOKEN_721: 'ERC721'
// };

export const FILTER_OWNER_NFT_EVM = (
  nfts: any,
  { token_address, owner_of }: { token_address: string; owner_of: string; contract_type?: string }
) =>
  nfts.token_address.toLowerCase() === token_address.toLowerCase() &&
  nfts.owner_of.toLowerCase() === owner_of.toLowerCase();

export const FILTER_OWNER_SOL = (nfts: any, { owner_of }: { owner_of: string }) =>
  nfts.associatedTokenAddress.toLowerCase() === owner_of.toLowerCase();

export function groupBy(objectArray: any, property: any) {
  try {
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  } catch (error) {
    return null;
  }
}

export function isIPhone() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

export const isBrowser = typeof window !== 'undefined';

export const hasEthereum = isBrowser && _.has(window, 'ethereum');

export const isMetamask = isIPhone() && hasEthereum;

export const isMobile = () => {
  let check = false;

  ((a) => {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera);
  return check;
};

export const generateFromEmail = (email: string) => `user${Math.floor(Math.random() * 100000)}`;

export const getLocalTime = (UTCTime: string) => {
  return moment.utc(UTCTime).local();
};

//  const options for offer limit in promotion campaignm modal

export const PROMOTION_OFFER_LIMIT_OPTIONS = [
  { id: 0, label: 'No limits', value: 0 },
  { id: 1, label: '1 subscriber', value: 1 },
  { id: 2, label: '2 subscribers', value: 2 },
  { id: 3, label: '3 subscribers', value: 3 },
  { id: 4, label: '4 subscribers', value: 4 },
  { id: 5, label: '5 subscribers', value: 5 },
  { id: 6, label: '6 subscribers', value: 6 },
  { id: 7, label: '7 subscribers', value: 7 },
  { id: 8, label: '8 subscribers', value: 8 },
  { id: 9, label: '9 subscribers', value: 9 },
  { id: 10, label: '10 subscribers', value: 10 },
  { id: 20, label: '20 subscribers', value: 20 },
  { id: 30, label: '30 subscribers', value: 30 },
  { id: 40, label: '40 subscribers', value: 40 },
  { id: 50, label: '50 subscribers', value: 50 },
  { id: 60, label: '60 subscribers', value: 60 },
  { id: 70, label: '70 subscribers', value: 70 },
  { id: 80, label: '80 subscribers', value: 80 },
  { id: 90, label: '90 subscribers', value: 90 },
  { id: 100, label: '100 subscribers', value: 100 }
];

//  const options for offer expiration in promotion campaign modal

export const PROMOTION_OFFER_EXPIRATION_OPTIONS = [
  { id: 0, label: 'No expiration', value: 0 },
  { id: 1, label: '1 day', value: 1 },
  { id: 2, label: '2 days', value: 2 },
  { id: 3, label: '3 days', value: 3 },
  { id: 4, label: '4 days', value: 4 },
  { id: 5, label: '5 days', value: 5 },
  { id: 6, label: '6 days', value: 6 },
  { id: 7, label: '7 days', value: 7 },
  { id: 8, label: '8 days', value: 8 },
  { id: 9, label: '9 days', value: 9 },
  { id: 10, label: '10 days', value: 10 },
  { id: 11, label: '11 days', value: 11 },
  { id: 12, label: '12 days', value: 12 },
  { id: 13, label: '13 days', value: 13 },
  { id: 14, label: '14 days', value: 14 },
  { id: 15, label: '15 days', value: 15 },
  { id: 16, label: '16 days', value: 16 },
  { id: 17, label: '17 days', value: 17 },
  { id: 18, label: '18 days', value: 18 },
  { id: 19, label: '19 days', value: 19 },
  { id: 20, label: '20 days', value: 20 },
  { id: 21, label: '21 days', value: 21 },
  { id: 22, label: '22 days', value: 22 },
  { id: 23, label: '23 days', value: 23 },
  { id: 24, label: '24 days', value: 24 },
  { id: 25, label: '25 days', value: 25 },
  { id: 26, label: '26 days', value: 26 },
  { id: 27, label: '27 days', value: 27 },
  { id: 28, label: '28 days', value: 28 },
  { id: 29, label: '29 days', value: 29 },
  { id: 30, label: '30 days', value: 30 }
];

//  const options for discount percentage in promotion campaign modal

export const PROMOTION_DISCOUNT_PERCENT_OPTIONS = [
  { id: 0, label: '5% discount', value: 5 },
  { id: 10, label: '10% discount', value: 10 },
  { id: 15, label: '15% discount', value: 15 },
  { id: 20, label: '20% discount', value: 20 },
  { id: 25, label: '25% discount', value: 25 },
  { id: 30, label: '30% discount', value: 30 },
  { id: 35, label: '35% discount', value: 35 },
  { id: 40, label: '40% discount', value: 40 },
  { id: 45, label: '45% discount', value: 45 },
  { id: 50, label: '50% discount', value: 50 }
];

// const options for add buldle modal
export const BUNDLE_DURATION_OPTIONS = [
  { id: 1, label: '2 months', value: 2 },
  { id: 3, label: '3 months', value: 3 },
  { id: 6, label: '6 months', value: 6 },
  { id: 12, label: '12 months', value: 12 }
];

//  const options for page category
export const categoriesConfigObject = [
  { id: 0, label: 'Subscription', value: 1 },
  // { id: 1, label: 'Event', value: 2 }
];

// const options for campaign type
export const SubscriberTypeConfigObject = [
  { id: 1, title: 'New subscribers' },
  { id: 2, title: 'Expired subscribers' },
  { id: 3, title: 'Both new and expired' }
];

export const getPageCategoryLabelFromValue = (value: number) => {
  return categoriesConfigObject.find((category) => category.value === value)?.label;
};

export const getCampaignTypeLabelFromValue = (value: number) => {
  return SubscriberTypeConfigObject.find((item) => item?.id === value)?.title;
};

// get time in MM dd yyyy format
export const getTimeInMMMDDyyyyFomat = (date: any) => {
  return moment(date).format('MMM DD, yyyy');
};

// to get the single word from whole string
export const getStrippedWord = (text: string) => {
  return text
    .split(' ')
    .map((word: string) => word.trim())
    .join('')
    .toLowerCase();
};

// list of the unsubscripton reasons
export const UNSUBSCRIBE_REASONS_OPTIONS = [
  { label: 'No specific reason', value: 1 },
  { label: 'Low posting frequency', value: 2 },
  { label: 'Private messages not replied', value: 3 },
  { label: 'No longer want to subscribed', value: 4 },
  { label: 'Subscription price too high', value: 5 },
  { label: 'Will re-subscribe later', value: 6 }
];

// to get the unsubscirbe reason option object
export const getUnsubscribeReasonObject = (value: number) => {
  return UNSUBSCRIBE_REASONS_OPTIONS.find((reason) => reason.value === value);
};

// to get the unsubscribe reason label from the value
export const getUnsubscribeReasonLabelFromValue = (value: number) => {
  return UNSUBSCRIBE_REASONS_OPTIONS.find((reason) => reason.value === value)?.label;
};

// to get the list of the pagination columns
export const getPostPaginationPayloadColumns = (
  columnName: string,
  isSearchable: boolean,
  isOrderable: boolean,
  searchValue: string | null
) => {
  return {
    data: columnName,
    name: '',
    searchable: isSearchable,
    orderable: isOrderable,
    search: {
      value: searchValue || '',
      regex: false
    }
  };
};

// to set the ordering column for post pagination payload
export const getPostOrderingColumnPayload = (columnIndex: number, direction: string) => {
  return {
    column: columnIndex,
    dir: direction
  };
};

const IMAGE_EXTENSIONS = ['jpg', 'gif', 'png', 'svg', 'webp', 'ico', 'jpeg', 'JPG'];
const VIDEO_EXTENSIONS = ['MP4', 'mp4', 'MOV', 'mov', '3gp', 'ogg', 'quicktime'];

export const isImage = (mediaUrl: string = ''): boolean => {
  const extension = mediaUrl.split('.').at(-1) ?? '';
  return IMAGE_EXTENSIONS.includes(extension);
}

export const isVideo = (mediaUrl: string = ''): boolean => {
  const extension = mediaUrl.split('.').at(-1) ?? '';
  return VIDEO_EXTENSIONS.includes(extension);
};
