import { ClassNamesArg, cx } from "@emotion/css";

export interface MemoTitleProps {
  className?: ClassNamesArg;
  isChangeable: boolean;
  sequence: number;
  value: string;
  onChange: (param: string) => void;
  clear: () => void;
}

export const MemoTitle = ({
  className,
  isChangeable,
  sequence,
  value,
  onChange,
  clear,
}: MemoTitleProps) => {

  /**
   * タイトルのDOMを作成
   * 既登録の場合は変更不可
   */
  const formatTitle = isChangeable ? (
    <input className="input"
      placeholder="タイトルを入力してください."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  ) : (
    <>{value}</>
  );

  return (
    <div className={cx("card-header", className)}>
      <div className="is-size-4 has-text-weight-bold title-bar">
        {sequence + 1}.&nbsp;
        {formatTitle}
      </div>
      <div className="right">
        <button className="delete"
          aria-label="close"
          onClick={clear}
        />
      </div>
    </div>
  );
};