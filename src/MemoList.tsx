import { MemoCard } from "@/components/MemoCard";
import { validate } from "@/func/validation";
import { useDragSort } from "@/hooks/useDragSort";
import { Memo } from "@/model/Model";
import ky from 'ky';
import { useCallback, useEffect } from "react";

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
  const [memos, setMemos] = useDragSort<Memo>([]);

  const addMemo = () => {
    const newMemo = {
      memoId: "",
      title: "無題",
      content: "",
      isSaved: false,
    };
    setMemos([...memos.map(memo => memo.value), newMemo]);
  };

  const clearMemo = (index: number) => {
    setMemos(memos.filter((_, i) => i !== index).map(memo => memo.value));
  };

  const reload = useCallback(async () => {
    const dbMemos = await get<Omit<Memo, 'isSaved'>[]>("memos");
    setMemos(dbMemos?.map(memo => {
      return {
        ...memo,
        isSaved: true,
      }
    }) ?? []);
  }, [setMemos]);

  const udpate = async () => {
    if (memos.some(memo => !validate(memo.value.title, memo.value.content))) {
      alert("不適なメモがあります.");
      return;
    }
    await post("save-memos", memos);
    await reload();
  };

  useEffect(() => {
    reload();
  }, [reload]);

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
              <li className="flex-col" key={memo.key} {...memo.events} >
                <MemoCard
                  memo={memo.value}
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
