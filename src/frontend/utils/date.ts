import moment from 'moment-timezone';
import { PostInterface } from '../interfaces/postInterface';

const BROWSER_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const SERVER_TIMEZONE = 'Asia/Colombo';
const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export const convertDateToLocal = (date: string | Date) => moment
  .tz(date as string, DATE_FORMAT, SERVER_TIMEZONE)
  .tz(BROWSER_TIMEZONE)
  .format(DATE_FORMAT);

export const convertPostDates = (
  posts: PostInterface[]
): PostInterface[] => posts.map((post) => {
  const dateTimeFields: Record<string, string> = {};
  if (post.created_at) {
    dateTimeFields.created_at = convertDateToLocal(post.created_at);
  }
  if (post.updated_at) {
    dateTimeFields.updated_at = convertDateToLocal(post.updated_at);
  }
  if (post.deleted_at) {
    dateTimeFields.deleted_at = convertDateToLocal(post.deleted_at);
  }

  return { ...post, ...dateTimeFields };
})
