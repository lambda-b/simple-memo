import { MemoList } from "@/page/MemoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const PageContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/memos" element={<MemoList />} />
      </Routes>
    </BrowserRouter>
  )
};

export default PageContent;
