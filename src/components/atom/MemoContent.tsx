import { ClassNamesArg, cx } from '@emotion/css';

export interface MemoContentProps {
  className?: ClassNamesArg;
  value: string;
  onChange: (param: string) => void;
}

export const MemoContent = ({
  className,
  value,
  onChange,
}: MemoContentProps) => {

  return (
    <div className={cx("card-content", className)}>
      <textarea className="textarea"
        placeholder="空文字を保存した場合は自動的に削除されます."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};
