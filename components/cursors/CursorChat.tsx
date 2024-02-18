import { handleKeyDown } from "@/lib/key-events";
import CursorSVG from "@/public/assets/CursorSVG";
import { CursorChatProps, CursorMode } from "@/types/types";
import React from "react";

export function CursorChat({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: e.target.value,
    });
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: "",
      });
    }

    if (e.key === "escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  }
  return (
    <div
      className="absolute top-0 left-0"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.mode == CursorMode.Chat && (
        <>
          <div className="absolute w-60 h-10 top-5 left-2 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
            {cursorState.previousMessage && <>{cursorState.previousMessage}</>}
            <input
              className="z-10 absolute w-60 border-none bg-transparent text-white outline-none"
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={
                cursorState.previousMessage ? " " : "Type a message..."
              }
              value={cursorState.message}
              maxLength={50}
            ></input>
          </div>
        </>
      )}
    </div>
  );
}
