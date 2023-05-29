import { MemoCard } from "@/components/MemoCard";
import { validate } from "@/func/validation";
import { Memo } from "@/model/Model";
import ky from 'ky';
import { useEffect, useState } from "react";

const api = ky.create({ prefixUrl: "http://localhost:8080/api" });

const get = async <T,>(path: string) => {
  try {
    const data = await api.get(path).json<T>();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const post = async <T,>(path: string, data: T) => {
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
      isSaved: false,
    };
    setMemos([...memos, newMemo]);
  };

  const clearMemo = (index: number) => {
    setMemos(memos.filter((_, i) => i !== index));
  };

  const reload = async () => {
    const dbMemos = await get<Omit<Memo, 'isSaved'>[]>("memos");
    setMemos(dbMemos?.map(memo => {
      return {
        ...memo,
        isSaved: true,
      }
    }) ?? []);
  }

  const udpate = async () => {
    if (memos.some(memo => !validate(memo.title, memo.content))) {
      alert("不適なメモがあります.");
      return;
    }
    await post("save-memos", memos);
    await reload();
  };

  useEffect(() => {
    reload();
  }, [setMemos]);

  return (
    <section>
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
