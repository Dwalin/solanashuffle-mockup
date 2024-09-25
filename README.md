This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [24hr leaderboard](http://localhost:3000/leaderboard/24h) with your browser to see the result.

Open [All time leaderboard](http://localhost:3000/leaderboard/all-time) with your browser to see the result.



## Notes

### Design — navigation

I tried to implement something interesting with pagination, and added "quick leaps". It works like this:
when you go long way to the middle of leaderboard, two controls on the left and right of middle navigation circles appear.

This lets you quickly "leap" half, quarter, third, and 3/4 of the way to end or beginning of pages.

I did this (unusual solution) as in this case pagination does not serve
as the key element of the website (like it would do on some accounting interface),
so it could just do some funny stuff.

Anyhow, designing controls is not an algorithmic process, and with given time limit,
I decided not to move anywhere from there.

In real life I would do another version, more "orthodox", compare / click them both and make final decision. 

### Design — html&css

Took [original](https://cdn.dribbble.com/userupload/4356307/file/original-a97be158ad357e16c95aa39e82e1a522.jpg?resize=1600x1252) design here,
got the general idea, but dropped doing total pixel-perfect, as there's a lot of mess in it (see "24h Games" column). It looks
like it's actually a screenshot of a real page, as the "mess" I mention has distinctive html-css marks.
Recreated it "tidier" at some places.

Could not find the font, took the closest possible.

### Dev notes

I took my main working setup with mobx. It might look as an overkill, though only if whole project was only about this small leaderboard.
That's to make the thing easily scalable and have proper data contract planned right from the start.

This setup also demonstrates two leaderboards [working together](http://localhost:3000/leaderboard) simultaneously.

"Imaginary" server is quite real, it took no time but makes data look a tiny bit more live.

### Summary

I would add more to the component on a real project, but it looks quite solid as initial setup within 5 hours.


