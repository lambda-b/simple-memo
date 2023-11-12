import { Communication } from "@/page/Communication";
import { MemoList } from "@/page/MemoList";
import RoutingPath from "@/router/RoutingPath";
import { Route, Routes } from "react-router-dom";


const PageContent = () => {
  return <section className="main">
    <Routes>
      <Route path={RoutingPath.memoList} element={<MemoList />} />
      <Route path={RoutingPath.communication} element={<Communication />} />
    </Routes>
  </section>;
};

export default PageContent;
