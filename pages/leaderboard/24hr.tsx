import Leaderboard from "@/Components/Leaderboard/Leaderboard";

export default function LeaderboardPage() {
    return (
        <>
            <div className={"uiWidget"}>
                <Leaderboard settings={{mode: 'daily', pageSize: 7}}/>
            </div>
        </>
    );
}

LeaderboardPage.getInitialProps = async ({ store }) => {
    try {
        await Promise.all([
            await store.loadLeaderBoard('daily', 0),
        ]);
        return {...store};
    } catch (e) {
        console.log('e', e);
    }
};
