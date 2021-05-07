import { Item, ItemBasicInfo } from '../types/hn-item';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export type FeedType = 'new' | 'top' | 'best' | 'ask' | 'show' | 'job';

const mapType = (type: FeedType) => {
  switch (type) {
    case 'new':
      return 'newstories';
    case 'top':
      return 'topstories';
    case 'best':
      return 'beststories';
    case 'ask':
      return 'askstories';
    case 'show':
      return 'showstories';
    case 'job':
      return 'jobstories';
    default:
      return 'topstories';
  }
};

export const get = async (id: number) => {
  const response = await fetch(`${baseUrl}/item/${id}.json`);
  const result: Item = await response.json();

  if (!result) {
    return null;
  }

  return result;
};

export const getAll = async (type: FeedType, limit: number = 30) => {
  const response = await fetch(`${baseUrl}/${mapType(type)}.json`);
  const result: number[] = await response.json();

  const res = await Promise.all(
    result.splice(0, limit).map(async (id) => {
      return await get(id);
    })
  );

  const filterFields: (item: Item) => ItemBasicInfo = (
    { id, url, time, title } = { id: -1 }
  ) => ({
    id,
    url,
    time,
    title,
  });

  return res.map(filterFields).filter((item) => item !== null);
};
