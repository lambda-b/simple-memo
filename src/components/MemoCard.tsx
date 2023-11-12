import { MemoContent } from "@/components/atom/MemoContent";
import { MemoTitle } from "@/components/atom/MemoTitle";
import { validate } from "@/func/validation";
import { Memo } from "@/model/Model";
import { ClassNamesArg, cx } from "@emotion/css";
import { useEffect, useState } from "react";

const boxColor = (title: string, content: string, isSaved: boolean) => {
  if (!validate(title, content)) {
    return "memo-box-red";
  }
  if (!isSaved) {
    return "memo-box-yellow";
  }
  return "";
}

export interface MemoCardProps {
  className?: ClassNamesArg;
  memo: Memo;
  sequence: number;
  clear: () => void;
}

export const MemoCard = ({
  className,
  memo,
  sequence,
  clear,
}: MemoCardProps) => {

  const [title, setTitle] = useState<string>(memo.title);
  const [content, setContent] = useState<string>(memo.content);
  const [isSaved, setIsSaved] = useState<boolean>(memo.isSaved);

  /**
   * メモが変わったときの初期描画
   */
  useEffect(() => {
    setTitle(memo.title);
    setContent(memo.content);
    setIsSaved(memo.isSaved);
  }, [memo]);

  /**
   * タイトルを変更
   * @param param title
   */
  const handleChangeTitle = (param: string) => {
    memo.title = param;
    memo.isSaved = false;
    setTitle(param);
    setIsSaved(false);
  };

  /**
   * 内容を変更
   * @param param content 
   */
  const handleChangeContent = (param: string) => {
    memo.content = param;
    memo.isSaved = false;
    setContent(param);
    setIsSaved(false);
  };

  return (
    <div className={cx("box", "memo-box", boxColor(title, content, isSaved), className)}>
      <div className="card">
        <MemoTitle
          isChangeable={!memo.memoId}
          sequence={sequence}
          value={title}
          onChange={handleChangeTitle}
          clear={clear}
        />
        <MemoContent
          value={content}
          onChange={handleChangeContent}
        />
      </div>
    </div>
  );
};
