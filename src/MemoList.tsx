import { MemoCard } from "@/components/MemoCard";
import { Memo } from "@/model/Model";
import { useState } from "react";

export const MemoList = () => {
  const [memos, setMemos] = useState<Memo[]>([]);

  const addMemo = () => {
    const newMemo = {
      memoId: "",
      title: "無題",
      content: "",
    };
    setMemos([...memos, newMemo]);
  };

  const clearMemo = (index: number) => {
    setMemos(memos.filter((_, i) => i !== index));
  };

  return (
    <section>
      <button className="button" onClick={addMemo}>追加</button>
      <div className="main">
        <ul className="flex-ul">
          {memos.map((memo, i) => {
            const clear = () => {
              clearMemo(i);
            };
            return (
              <li className="flex-col" key={i}>
                <MemoCard
                  memo={memo}
                  sequence={i}
                  clear={clear}
                />
              </li>
            );
          })}
          {[...Array(20)].map((_, index) => ( // 適当に隙間を埋める
            <li className="empty-item" key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};
