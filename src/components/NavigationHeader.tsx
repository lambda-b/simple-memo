import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


export const NavigationHeader = () => {
  const navigate = useNavigate();

  return <div>
    <h1 className="title">メモ帳</h1>
    <div className="flex flex-middle">
      <button className="button" onClick={() => navigate("/memos")}>
        <FontAwesomeIcon icon={["fas", "sticky-note"]} />
      </button>
    </div>
  </div>;
};