import { useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursor from "./livecursor";
import { useCallback, useEffect, useState } from "react";
import { CursorChat } from "./CursorChat";
import { CursorMode } from "@/types/types";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({ mode: CursorMode.Hidden });
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault;
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault;
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: null, message: null });
  }, []);

  function oneKeyUp(e: KeyboardEvent) {
    if (e.key === "/") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: null,
        message: "",
      });
    } else if (e.key === "Escape") {
      setCursorState({
        mode: CursorMode.Hidden,
      });
    }
  }
  function oneKeyDown(e: KeyboardEvent) {
    if (e.key === "/") {
      e.preventDefault();
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", oneKeyUp);
    window.addEventListener("keydown", oneKeyDown);
    return () => {
      window.removeEventListener("keyup", oneKeyUp);
      window.removeEventListener("keydown", oneKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="h-[100vh] w-full  flex flex-col gap-y-4 justify-center items-center"
    >
      <h1 className="text-xl bg-cyan-100 w-[120px] h-[120px] flex flex-col justify-center items-center border-4 border-black-100 border-slate-100 rounded-[10px]">
        hello world
      </h1>
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursor others={others} />
    </div>
  );
};

export default Live;
