import React from 'react';
import {observer} from "mobx-react";
import numeral from 'numeral';
import classNames from 'classnames';
import {useStore} from "@/store/store";
import css from "@/styles/Leaderboard.module.scss";
import User from "@/Components/Shared/UserBox";

type LeaderboardSettings = {
    settings: {
        mode: string;
        pageSize: number;
    }
};

const SolanaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
         viewBox="0 0 24 24">
        <g fill="none">
            <path fill="url(#tokenBrandedSolana0)"
                  d="M19.125 7.447a.7.7 0 0 1-.456.18H2.644c-.569 0-.856-.65-.462-1.03l2.632-2.538a.67.67 0 0 1 .455-.188h16.088c.574 0 .855.656.456 1.038z"></path>
            <path fill="url(#tokenBrandedSolana1)"
                  d="M19.125 19.954a.7.7 0 0 1-.456.175H2.644c-.569 0-.856-.645-.462-1.026l2.632-2.544a.66.66 0 0 1 .455-.181h16.088c.574 0 .855.65.456 1.03z"></path>
            <path fill="url(#tokenBrandedSolana2)"
                  d="M19.125 10.303a.7.7 0 0 0-.456-.175H2.644c-.569 0-.856.645-.462 1.025l2.632 2.545a.7.7 0 0 0 .455.18h16.088c.574 0 .855-.65.456-1.03z"></path>
            <defs>
                <linearGradient id="tokenBrandedSolana0" x1={2.001} x2={22.51}
                                y1={59.823} y2={59.635} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#599db0"></stop>
                    <stop offset={1} stopColor="#47f8c3"></stop>
                </linearGradient>
                <linearGradient id="tokenBrandedSolana1" x1={2.001} x2={22.379}
                                y1={8.853} y2={8.697} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c44fe2"></stop>
                    <stop offset={1} stopColor="#73b0d0"></stop>
                </linearGradient>
                <linearGradient id="tokenBrandedSolana2" x1={3.152} x2={21.225}
                                y1={12.003} y2={12.003} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#778cbf"></stop>
                    <stop offset={1} stopColor="#5dcdc9"></stop>
                </linearGradient>
            </defs>
        </g>
    </svg>
);

const Pagination = observer(({ settings }: LeaderboardSettings) => {
    const store:any = useStore();

    const currentMode = settings?.mode || 'daily';
    const currentLeaderboard = store?.leaderboard && store?.leaderboard[currentMode];
    const totalResults = currentLeaderboard?.total;
    const resultsPerPage = currentLeaderboard?.resultsPerPage || 7;
    const totalPages = Math.floor(totalResults / resultsPerPage) - ((totalResults % resultsPerPage) ? 0 : 1);
    const currentPage = currentLeaderboard?.pageNumber;

    return (
        <div className={css.leaderboardPaginationSizer}>
            <nav className={css.leaderboardPagination}>
                {currentPage !== 0 && (
                    <div
                        className={classNames(
                            "uiButton _small",
                            css.leaderboardPaginationButton,
                            css._prev,
                        )}
                        onClick={() => {
                            store.loadLeaderBoard(currentMode, currentPage - 1)
                        }}
                    >
                        Prev
                    </div>
                )}

                <div
                    className={classNames(
                        css.leaderboardPaginationItem,
                        currentPage === 0 ? css._active : null,
                    )}
                    onClick={() => {
                        currentPage !== 0 && store.loadLeaderBoard(currentMode, 0)
                    }}
                >
                    <div className={css.leaderboardPaginationTooltip}>

                    </div>
                    <div className={css.leaderboardPaginationTooltipPersistent}>
                        Top {currentLeaderboard.resultsPerPage}
                    </div>
                </div>

                <div
                    className={classNames(
                        css.leaderboardPaginationPageSelector,
                        currentPage > 8 ? null : css._inactive,
                    )}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path>
                    </svg>

                    <div
                        className={classNames(
                            css.leaderboardPaginationPageSelectorOverlay,
                        )}
                    >
                        {Array(4).fill({}).map((a, ui) => {
                            const navigationArray = [ currentPage / 4 * 3, currentPage / 3, currentPage / 4, currentPage / 2 ]
                            return (
                                <React.Fragment key={`pagination-${ui}`}>
                                    <div
                                        className={css.leaderboardPaginationLongNavigation}
                                        onClick={() => {
                                            store.loadLeaderBoard(currentMode, Math.floor(navigationArray[ui]))
                                        }}
                                    >
                                        {Math.floor(navigationArray[ui])}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path>
                        </svg>
                    </div>
                </div>

                {totalPages <= 7 && (
                    <div className={css.leaderboardPaginationMiddle}>

                        {Array(7 - totalPages - 2).fill({}).map((a, ui) => {

                            const rankMin = (ui + 1) * resultsPerPage + 1;
                            const rankMax = (ui + 2) * resultsPerPage;

                            return (
                                <React.Fragment key={`leaderboard-${settings?.mode}-middle-${ui}`}>
                                    <div
                                        className={classNames(
                                            css.leaderboardPaginationItem,
                                            currentPage === ui + 1 ? css._active : null,
                                        )}
                                        onClick={async () => {
                                            if (currentPage === ui) { return null }
                                            await store.loadLeaderBoard(currentMode, ui + 1)
                                        }}
                                    >
                                        <div className={css.leaderboardPaginationTooltip}>
                                            {rankMin} .. {rankMax}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}


                {totalPages > 7 && (
                    <div className={css.leaderboardPaginationMiddle}>
                        {Array(5).fill({}).map((a, ui) => {
                            let relativePage = null;

                            const endOfLeaderboard = currentPage >= (totalPages - 2);

                            if ((currentPage > 2) && (currentPage < (totalPages - 2))) {
                                relativePage = 2;
                            }

                            if (currentPage <= 2) {
                                relativePage = currentPage - 1;
                            }

                            if (endOfLeaderboard) {
                                relativePage = 5 - totalPages % (currentPage);
                            }

                            const rankMin = (currentPage - (relativePage || 0) + ui) * resultsPerPage + 1;
                            const rankMax = (currentPage - (relativePage || 0) + ui + 1) * resultsPerPage;

                            if (rankMin <= 1) {
                                return null;
                            }
                            if (rankMax >= totalResults) {
                                return null;
                            }

                            return (
                                <React.Fragment key={`leaderboard-${settings?.mode}-middle-${ui}`}>
                                    <div
                                        className={classNames(
                                            css.leaderboardPaginationItem,
                                            relativePage === ui ? css._active : null,
                                        )}
                                        onClick={async () => {
                                            if (relativePage === ui) {
                                                return null
                                            }
                                            await store.loadLeaderBoard(currentMode, currentPage - (relativePage || 0) + ui)
                                        }}
                                    >
                                        <div className={css.leaderboardPaginationTooltip}>
                                            {rankMin} .. {rankMax}
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                )}


                <div
                    className={classNames(
                        css.leaderboardPaginationPageSelector,
                        currentPage < (totalPages - 8) ? null : css._inactive,
                    )}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path>
                    </svg>

                    <div
                        className={classNames(
                            css.leaderboardPaginationPageSelectorOverlay,
                        )}
                    >
                        {Array(4).fill({}).map((a, ui) => {
                            const targetRange = totalPages - currentPage;
                            const navigationArray = [targetRange / 4 * 3, targetRange / 3, targetRange / 4, targetRange / 2]
                            return (
                                <React.Fragment key={`pagination-${ui}`}>
                                    <div
                                        className={css.leaderboardPaginationLongNavigation}
                                        onClick={() => {
                                            store.loadLeaderBoard(currentMode, Math.floor(currentPage + navigationArray[ui]))
                                        }}
                                    >
                                        {Math.floor(currentPage + navigationArray[ui])}
                                    </div>
                                </React.Fragment>

                            );
                        })}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path>
                        </svg>
                    </div>
                </div>

                <div
                    className={classNames(
                        css.leaderboardPaginationItem,
                        currentPage === totalPages ? css._active : null,
                    )}
                    onClick={() => {
                        store.loadLeaderBoard(currentMode, totalPages)
                    }}
                >
                    <div className={css.leaderboardPaginationTooltip}>

                    </div>
                    <div className={css.leaderboardPaginationTooltipPersistent}>
                        {currentLeaderboard.total - currentLeaderboard.resultsPerPage} .. {currentLeaderboard.total}
                        {/*{currentLeaderboard.total}*/}
                    </div>
                </div>

                {currentPage !== totalPages && (
                    <div
                        className={classNames(
                            "uiButton _small",
                            css.leaderboardPaginationButton,
                            css._next,
                        )}
                        onClick={() => {
                            store.loadLeaderBoard(currentMode, currentPage + 1)
                        }}
                    >
                        Next
                    </div>
                )}
            </nav>
        </div>
    );
});

const Leaderboard = observer(({settings}: LeaderboardSettings) => {
    const store:any = useStore();

    const currentMode = settings.mode || 'daily';
    const currentLeaderboard = store?.leaderboard[currentMode];

    return (
        <div className={classNames(css.leaderboardSizer)}>
            <section className={classNames("uiBox", css.leaderboardContainer)}>
                <header className={classNames("uiBoxHeader")}>
                    <div className={classNames("uiBoxHeaderIcon")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M9 10a3.04 3.04 0 0 1 3-3a3.04 3.04 0 0 1 3 3a3.04 3.04 0 0 1-3 3a3.04 3.04 0 0 1-3-3m3 9l4 1v-3.08A7.54 7.54 0 0 1 12 18a7.54 7.54 0 0 1-4-1.08V20m4-16a5.78 5.78 0 0 0-4.24 1.74A5.78 5.78 0 0 0 6 10a5.78 5.78 0 0 0 1.76 4.23A5.78 5.78 0 0 0 12 16a5.78 5.78 0 0 0 4.24-1.77A5.78 5.78 0 0 0 18 10a5.78 5.78 0 0 0-1.76-4.26A5.78 5.78 0 0 0 12 4m8 6a8 8 0 0 1-.57 2.8A7.8 7.8 0 0 1 18 15.28V23l-6-2l-6 2v-7.72A7.9 7.9 0 0 1 4 10a7.68 7.68 0 0 1 2.33-5.64A7.73 7.73 0 0 1 12 2a7.73 7.73 0 0 1 5.67 2.36A7.68 7.68 0 0 1 20 10"></path>
                        </svg>
                    </div>
                    {currentMode === 'daily' && (
                        <h2 className={classNames("uiBoxHeaderTitle")}>
                            Top users by{' '}
                            <span className="uiTextHighlight">24h</span>{' '}
                            volume
                        </h2>
                    )}
                    {currentMode === 'total' && (
                        <h2 className={classNames("uiBoxHeaderTitle")}>
                            Top users by{' '}
                            <span className="uiTextHighlight">All-time</span>{' '}
                            volume
                        </h2>
                    )}
                </header>

                <main className={"uiBoxContent"}>
                    <div className={css.leaderboardList}>
                        <div
                            className={classNames(
                                css.leaderboardListItem,
                                css._header
                            )}
                        >
                            <div className={classNames(css.leaderboardListItemCell)}></div>
                            <div className={classNames(css.leaderboardListItemCell)}>
                                User
                            </div>
                            <div className={classNames(css.leaderboardListItemCell, css._number)}>
                                Total game
                            </div>
                            <div className={classNames(css.leaderboardListItemCell, css._padded)}>
                                Volume
                            </div>
                            <div className={classNames(css.leaderboardListItemCell, css._number)}>
                                24h games
                            </div>
                        </div>

                        {currentLeaderboard?.page?.map((a:any, ui:any) => {
                            return (
                                <React.Fragment key={`leaderboard-${ui}`}>
                                    <div className={classNames(css.leaderboardListItem)}>
                                        <div
                                            className={classNames(css.leaderboardListItemCell, css._number, css._place)}>
                                            {+currentLeaderboard?.pageNumber * +currentLeaderboard?.resultsPerPage + ui + 1}.
                                        </div>
                                        <div className={classNames(css.leaderboardListItemCell, css._user)}>
                                            <User user={a?.user}/>
                                        </div>
                                        <div className={classNames(css.leaderboardListItemCell, css._number)}>
                                            {a.data?.totalGame}
                                        </div>
                                        <div className={classNames(css.leaderboardListItemCell)}>
                                            <div className={classNames(css.leaderboardListItemCellIcon)}>
                                                <SolanaIcon/>
                                            </div>
                                            {numeral(a.data?.volume).format('0.00')} SOL
                                        </div>
                                        <div className={classNames(css.leaderboardListItemCell, css._number)}>
                                            {a.data?.dailyGames}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>

                    <Pagination settings={settings} />
                </main>
            </section>
        </div>
    );
});

export default Leaderboard;
