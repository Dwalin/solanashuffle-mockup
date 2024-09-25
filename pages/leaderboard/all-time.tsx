import Leaderboard from "@/Components/Leaderboard/Leaderboard";

export default function LeaderboardPage() {
    return (
        <>
            <div className={"uiWidget"}>
                <Leaderboard settings={{mode: 'total', pageSize: 7}}/>
            </div>
        </>
    );
}

LeaderboardPage.getInitialProps = async ({ store }) => {
    try {
        await Promise.all([
            await store.loadLeaderBoard('total', 0),
        ]);
        return {...store};
    } catch (e) {
        console.log('e', e);
    }
};
