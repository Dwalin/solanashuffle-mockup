import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import {useStore} from "@/store/store";
import css from "@/styles/Sidebar.module.scss";

const Header = observer(() => {
  const store = useStore();

  return (
    <div className={classNames("uiHeader")}>

    </div>
  );
});

export default Header;
