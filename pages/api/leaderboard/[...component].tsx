const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');


const generateName = () => {
  return uniqueNamesGenerator({ dictionaries: [colors, animals], separator: ' ' });
}
export default async function handler(req, res) {
  const component = req.query.component[0];

  const resultsPerPage = 7;

  if (component === 'loadLeaderBoard') {
    const { mode = 'daily', page }: { mode: string, page: number } = req.body;

    const total = mode === 'daily' ? 28 : 152;

    const lastResult = page * resultsPerPage;
    if (lastResult > total) { return res.send([]); }

    const diff = total - lastResult;

    const pageArray = Array((diff <= resultsPerPage) ? diff : resultsPerPage).fill({})
    .map(el => ({
      user: {},
      data: {
        totalGame: Math.floor(10000 * Math.random()),
        dailyGames: Math.floor(500 * Math.random()),
        volume: Math.floor(10000 * Math.random()),
      },
    }))
    .reduce((page, entry) => {
      entry.user = { name: generateName() }
      console.log(entry)
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

  return res.json('error');
}

export const config = {
  api: { bodyParser: { sizeLimit: '128mb' } }
}
