import { MemoCard } from "@/components/MemoCard";
import { WebSocketPublish } from "@/components/WebSocketPublish";
import { WebSocketSubscription } from "@/components/WebSocketSubscription";
import { client } from "@/connection/WebConnection";
import { validate } from "@/func/validation";
import { useDragSort } from "@/hooks/useDragSort";
import { Memo } from "@/model/Model";
import { useCallback, useEffect } from "react";

export const MemoList = () => {
  const [memos, setMemos] = useDragSort<Memo>([]);

  const addMemo = () => {
    const newMemo = {
      memoId: "",
      title: "無題",
      content: "",
      isSaved: false,
    };
    setMemos([...memos, newMemo]);
  };

  const clearMemo = (index: number) => {
    setMemos(memos.filter((_, i) => i !== index));
  };

  const reload = useCallback(async () => {
    const dbMemos = await client.get<Omit<Memo, 'isSaved'>[]>("memos");
    setMemos(dbMemos?.map(memo => {
      return {
        ...memo,
        isSaved: true,
      }
    }) ?? []);
  }, [setMemos]);

  const udpate = async () => {
    if (memos.some(memo => !validate(memo.title, memo.content))) {
      alert("不適なメモがあります.");
      return;
    }
    await client.post("save-memos", memos.filter(memo => memo.content !== ""));
    await reload();
  };

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <section>
      <WebSocketPublish />
      <WebSocketSubscription />
      <button className="button" onClick={addMemo}>追加</button>
      <button className="button" onClick={reload}>キャンセル</button>
      <button className="button is-primary" onClick={udpate}>登録</button>
      <div className="main">
        <ul className="flex-ul">
          {memos.map((memo, i) => {
            const clear = () => {
              clearMemo(i);
            };
            return (
              <li className="flex-col" key={memo.key} {...memo.events} >
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
