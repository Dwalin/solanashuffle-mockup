import {observer} from "mobx-react";
import React from "react";
import css from "@/styles/UserBox.module.scss";

const UserBox = observer(({ user }) => {

    return (
        <div className={css.userBox}>

            <div className={css.userPic}>
                <div
                    className={css.userPicImage}
                />
                <div className={css.userPicMarker}>
                    17
                </div>
            </div>

            <div className={css.userName}>
                {user?.name || 'anonymous'}
            </div>

            <div className={css.userMarker}>
                {/*{Math.random() > 0.5 && '(You)'}*/}
            </div>

        </div>
    );
});

export default UserBox;
