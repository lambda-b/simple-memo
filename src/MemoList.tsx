import { MemoCard } from "@/components/MemoCard";
import { Memo } from "@/model/Model";
import ky from 'ky';
import { useEffect, useState } from "react";

const api = ky.create({ prefixUrl: "http://localhost:8080/api" });

const reload = async <T,>(path: string, callback: (param: T) => void) => {
  try {
    const data: T = await api.get(path).json();
    callback(data);
  } catch (error) {
    console.error(error);
  }
};

const register = async <T,>(path: string, data: T) => {
  try {
    await api.post(path, {
      json: data,
    });
  } catch (error) {
    console.error(error);
  }
};

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

  const udpate = async () => {
    await register("save-memos", memos);
    await reload("memos", setMemos);
  };

  useEffect(() => {
    reload("memos", setMemos);
  }, [setMemos]);

  return (
    <section>
      <button className="button" onClick={addMemo}>追加</button>
      <button className="button" onClick={() => reload("memos", setMemos)}>キャンセル</button>
      <button className="button is-primary" onClick={udpate}>登録</button>
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
