import { MemoContent } from "@/components/atom/MemoContent";
import { MemoTitle } from "@/components/atom/MemoTitle";
import { validate } from "@/func/validation";
import { Memo } from "@/model/Model";
import { ClassNamesArg, cx } from "@emotion/css";
import { useEffect, useState } from "react";

const boxColor = (title: string, content: string, isSaved: boolean) => {
  if (!validate(title, content)) {
    return "box-red";
  }
  if (!isSaved) {
    return "box-yellow";
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

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(true);

  /**
   * メモが変わったときの初期描画
   */
  useEffect(() => {
    setTitle(memo.title);
    setContent(memo.content);
    setIsSaved(!!memo.memoId && isSaved);
  }, [memo]);

  /**
   * タイトルを変更
   * @param param title
   */
  const handleChangeTitle = (param: string) => {
    memo.title = param;
    setTitle(param);
  };

  /**
   * 内容を変更
   * @param param content 
   */
  const handleChangeContent = (param: string) => {
    memo.content = param;
    setContent(param);
  };

  return (
    <div className={cx("box", boxColor(title, content, isSaved), className)}>
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
