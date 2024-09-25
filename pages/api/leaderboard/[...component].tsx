import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import type { NextApiRequest, NextApiResponse } from 'next';

const generateName = () => {
  return uniqueNamesGenerator({ dictionaries: [colors, animals], separator: ' ' });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const component = req?.query?.component && req?.query?.component[0];

  const resultsPerPage = 7;

  if (component === 'loadLeaderBoard') {
    const { mode = 'daily', page }: { mode: string, page: number } = req.body;
    const total = mode === 'daily' ? 28 : 152;

    const lastResult = page * resultsPerPage;
    if (lastResult > total) {
      return res.send({
        total,
        resultsPerPage,
        pageNumber: page,
        page: [],
      });
    }

    const diff = total - lastResult;

    const pageArray = Array((diff <= resultsPerPage) ? diff : resultsPerPage).fill({})
    .map(() => ({
      user: {},
      data: {
        totalGame: Math.floor(10000 * Math.random()),
        dailyGames: Math.floor(500 * Math.random()),
        volume: Math.floor(10000 * Math.random()),
      },
    }))
    .reduce((page: any, entry) => {
      entry.user = { name: generateName() }
      page.push(entry);
      return page;
    }, []);

    const output = {
      total,
      pageNumber: page,
      resultsPerPage,
      page: pageArray,
    }

    return res.send(output);
  }

  return res.send({});
}

export const config = {
  api: { bodyParser: { sizeLimit: '128mb' } }
}
