import { Communication } from "@/page/Communication";
import { MemoList } from "@/page/MemoList";
import RoutingPath from "@/router/RoutingPath";
import { Route, Routes } from "react-router-dom";


const PageContent = () => {
  return (
    <Routes>
      <Route path={RoutingPath.memoList} element={<MemoList />} />
      <Route path={RoutingPath.communication} element={<Communication />} />
    </Routes>
  )
};

export default PageContent;
