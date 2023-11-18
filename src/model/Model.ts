export interface Memo {
  memoId: string;
  title: string;
  content: string;
  isSaved: boolean;
}

export interface ShareMessage {
  messageId?: string;
  sender: string;
  content: string;
}
