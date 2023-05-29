import React, { useCallback, useRef, useState } from "react";

/**
 * 座標を表す
 */
interface Position {
  x: number;
  y: number;
}

/**
 * ドラッグ & ドロップ要素の情報をまとめた型
 */
interface DragItem<T> {
  value: T;
  key: string;
  position: Position;
  element: HTMLElement;
}

/**
 * useRef で保持する状態
 */
interface DragRef<T> {
  keys: Map<T, string>;
  dragItems: DragItem<T>[];
  canCheckHovered: boolean;
  pointerPosition: Position;
  dragElement: DragItem<T> | null;
}

/**
 * マウスポインターが要素と被っているかの判定
 */
const isHover = (event: MouseEvent, element: HTMLElement) => {
  // マウスポインターの座標を取得
  const { clientX, clientY } = event;

  // 重なりを判定する要素のサイズと座標を取得
  const rect = element.getBoundingClientRect();

  // マウスポインターが要素と重なっているかを判定する
  return (
    clientY < rect.bottom &&
    clientY > rect.top &&
    clientX < rect.right &&
    clientX > rect.left
  );
};

/**
 * 返り値の型
 */
export interface DragSortResult<T> {
  key: string;
  value: T;
  events: {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  };
}

/**
 * hooks
 */
export const useDragSort = <T>(
  defaultItems: T[],
): [DragSortResult<T>[], React.Dispatch<T[]>] => {
  const [items, setItems] = useState(defaultItems);

  // 状態をrefで管理
  const state = useRef<DragRef<T>>({
    dragItems: [],
    keys: new Map(),
    dragElement: null,
    canCheckHovered: true,
    pointerPosition: { x: 0, y: 0 },
  }).current;

  /**
   * ドラッグ中の処理
   */
  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { dragItems, dragElement, pointerPosition } = state;

    // ドラッグしてなければ何もしない
    if (!dragElement) return;

    // マウスポインターの移動量を計算
    const x = clientX - pointerPosition.x;
    const y = clientY - pointerPosition.y;

    const dragStyle = dragElement.element.style;

    dragStyle.zIndex = "100";
    dragStyle.transform = `translate(${x}px, ${y}px)`;

    // まだ確認できない場合は処理を修了する
    if (!state.canCheckHovered) return;

    // 確認できないようにする
    state.canCheckHovered = false;

    // 300ms後に確認できるようにする
    setTimeout(() => {
      state.canCheckHovered = true;
    }, 300);

    // ドラッグしている要素の配列の位置を取得
    const dragIndex = dragItems.findIndex(({ key }) => key === dragElement.key);

    // ホバーされている
    const hoveredIndex = dragItems.findIndex(
      ({ element }, index) => index !== dragIndex && isHover(event, element)
    );

    // ホバーされている要素があれば、ドラッグしている要素と入れ替える
    if (hoveredIndex !== -1) {
      // カーソルの位置を更新
      state.pointerPosition.x = clientX;
      state.pointerPosition.y = clientY;

      // 要素を入れ替える
      dragItems.splice(dragIndex, 1);
      dragItems.splice(hoveredIndex, 0, dragElement);

      const { left: x, top: y } = dragElement.element.getBoundingClientRect();

      // ドラッグ要素の座標を更新
      dragElement.position = { x, y };

      // 再描画する
      setItems(dragItems.map(item => item.value));
    }
  };

  /**
   * ドラッグが終了したときの処理
   */
  const onMouseUp = () => {
    const { dragElement } = state;

    // ドラッグしていなかったら何もしない
    if (!dragElement) return;

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用したCSSを削除
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  const setItemsAndDragsclear = useCallback((inputItems: T[]) => {
    setItems(inputItems);
    const { dragItems } = state;
    dragItems.splice(0);
  }, [state]);

  return [
    items.map(value => {
      // keyがなければ新しく作り、あれば既存のkey文字列を返す
      const key = state.keys.get(value) || Math.random().toString(16);

      // 生成したkey文字列を保存
      state.keys.set(value, key);

      return {
        value,
        key,
        events: {
          ref: (element: HTMLElement | null) => {
            if (!element) return;

            const { dragItems, dragElement, pointerPosition } = state;

            // 位置をリセットする
            element.style.transform = "";

            // 要素の位置を取得
            const { left: x, top: y } = element.getBoundingClientRect();
            const position: Position = { x, y };

            const itemIndex = dragItems.findIndex(item => item.key === key);

            // 要素がなければ新しく追加して処理を終了
            if (itemIndex === -1) {
              return dragItems.push({ key, value, element, position });
            }

            if (dragElement?.key === key) {
              // ドラッグ要素のずれを計算する
              const dragX = dragElement.position.x - position.x;
              const dragY = dragElement.position.y - position.y;

              // 入替のずれをなくす
              element.style.transform = `translate(${dragX}px, ${dragY}px)`;

              // マウスポインターの位置も再計算してずれをなくす
              pointerPosition.x -= dragX;
              pointerPosition.y -= dragY;
            }

            // ドラッグ要素以外の要素をアニメーションさせながら移動させる
            if (dragElement?.key !== key) {
              const item = dragItems[itemIndex];

              // 前回の座標を計算
              const x = item.position.x - position.x;
              const y = item.position.y - position.y;

              // 要素を前回の位置に留めておく
              element.style.transition = "";
              element.style.transform = `translate(${x}px, ${y}px)`;

              // 位置フレーム後に要素をアニメーションさせながら元の位置に戻す
              requestAnimationFrame(() => {
                element.style.transform = "";
                element.style.transition = "all 300ms";
              });
            }
          },
          onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
            // ドラッグする要素
            const element = event.currentTarget;

            // マウスポインターの座標を保持しておく
            state.pointerPosition.x = event.clientX;
            state.pointerPosition.y = event.clientY;

            // ドラッグしている要素のスタイルを上書き
            element.style.transition = ""; // アニメーションを無効にする

            // 要素の座標の取得
            const { left: x, top: y } = element.getBoundingClientRect();
            const position = { x, y };

            // ドラッグする要素の保持
            state.dragElement = { key, value, element, position };

            // mousemove, mouseupイベントをwindowに登録
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("mousemove", onMouseMove);
          },
        },
      };
    }),
    setItemsAndDragsclear,
  ]
}
