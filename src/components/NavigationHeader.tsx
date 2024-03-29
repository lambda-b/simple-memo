import RoutingPath from "@/router/RoutingPath";
import { cx } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";


export const NavigationHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return <header className="navbar is-fixed-top">
    <div>
      <div className="title">メモ帳</div>
      <div className="tabs">
        <ul>
          <li className={cx(location.pathname === RoutingPath.memoList && "is-active")}>
            <a onClick={() => navigate(RoutingPath.memoList)}>
              メモリスト
              <FontAwesomeIcon icon={["fas", "sticky-note"]} />
            </a>
          </li>
          <li className={cx(location.pathname === RoutingPath.communication && "is-active")}>
            <a onClick={() => navigate(RoutingPath.communication)}>
              共有メモ
              <FontAwesomeIcon icon={["fas", "comments"]} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>;
};