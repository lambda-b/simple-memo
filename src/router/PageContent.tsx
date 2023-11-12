import { MemoList } from "@/page/MemoList";
import { Route, Routes } from "react-router-dom";


const PageContent = () => {
  return (
    <Routes>
      <Route path="/memos" element={<MemoList />} />
    </Routes>
  )
};

export default PageContent;
