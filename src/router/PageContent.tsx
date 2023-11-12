import { Communication } from "@/page/Communication";
import { MemoList } from "@/page/MemoList";
import { Route, Routes } from "react-router-dom";


const PageContent = () => {
  return (
    <Routes>
      <Route path="/memos" element={<MemoList />} />
      <Route path="/communications" element={<Communication />} />
    </Routes>
  )
};

export default PageContent;
