import { MemoCard } from "@/components/MemoCard";
import { Memo } from "@/model/Model";

export default {
  title: "MemoCard",
  component: MemoCard,
};

const sample: Memo = {
  memoId: "",
  title: "タイトル",
  content: "サンプルメッセージ",
  isSaved: false,
};

export const CreatedMemoCard = () => {

  const memo = { ...sample };

  return (
    <MemoCard
      memo={memo}
      sequence={0}
      clear={() => alert("削除されました。")}
    />
  );
};

export const ExistingMemoCard = () => {

  const memo = { ...sample, memoId: "sample", isSaved: true };

  return (
    <MemoCard
      memo={memo}
      sequence={0}
      clear={() => alert("削除されました。")}
    />
  );
};
