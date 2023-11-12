import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


export const NavigationHeader = () => {
  const navigate = useNavigate();

  return <div>
    <h1 className="title">メモ帳</h1>
    <div className="tabs">
      <ul>
        <li>
          <a onClick={() => navigate("/memos")}>
            メモリスト
            <FontAwesomeIcon icon={["fas", "sticky-note"]} />
          </a>
        </li>
      </ul>
    </div>
  </div>;
};