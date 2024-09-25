import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import {useStore} from "@/store/store";
import css from "@/styles/Sidebar.module.scss";

const Sidebar = observer(() => {
  const store = useStore();

  return (
    <div className={classNames("uiSidebar")}>
    </div>
  );
});

export default Sidebar;
