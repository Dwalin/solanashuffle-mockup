import Leaderboard from "../src/Components/Leaderboard/Leaderboard";
import LeaderboardPage from "./leaderboard";


export default function Home() {
    return (
        <>
            <div className={"uiWidget"}>
                <Leaderboard settings={{mode: 'daily', pageSize: 7}}/>
                <Leaderboard settings={{mode: 'total', pageSize: 7}}/>
            </div>
        </>
    );
}

Home.getInitialProps = async ({ store }) => {
    try {
        await Promise.all([
            await store.loadLeaderBoard('daily', 0),
            await store.loadLeaderBoard('total', 0),
        ]);
        return {...store};
    } catch (e) {
        console.log('e', e);
    }
};
