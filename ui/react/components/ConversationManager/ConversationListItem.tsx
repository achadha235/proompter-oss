import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Conversation } from "@proompter/core";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";

export function ConversationListItem({
  conversation,
  onConversationNameChanged,
  onShareClicked,
  onArchivedClicked,
  onDeletedClicked,
}: {
  conversation: Conversation;
  onConversationNameChanged?: (newName: string) => Promise<void>;
  onShareClicked?: (conversation: Conversation) => void;
  onArchivedClicked?: (conversation: Conversation) => void;
  onDeletedClicked?: (conversation: Conversation) => void;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [topPosition, setTopPosition] = useState(false);
  const btnRef = useRef(null);
  const popoverRef = useRef(null);
  const inputRef = useRef(null);
  const itemRef = useRef(null);

  const displayName = conversation.name || "New Chat";

  useOnClickOutside(btnRef, () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  });

  useOnClickOutside(itemRef, () => {
    if (editing) {
      setEditing(false);
    }
  });

  function detectIfPopoverBelowScreen() {
    const popover = popoverRef.current as any;
    if (popover) {
      const popoverRect = popover.getBoundingClientRect();
      const popoverBottom = popoverRect.bottom;
      const popoverBelowScreen = popoverBottom > window.innerHeight;
      if (popoverBelowScreen) {
        setTopPosition(true);
      } else {
        setTopPosition(false);
      }
    }
  }

  function closeMenu(e: React.MouseEvent) {
    setMenuOpen(false);
    e.stopPropagation();
    e.preventDefault();
  }

  function onNameChanged() {
    if (displayName !== newName) {
      const nameChangePromise = onConversationNameChanged?.(newName);
      if (nameChangePromise) {
        setLoading(true);
        nameChangePromise.finally(() => {
          setLoading(false);
          setEditing(false);
        });
      } else {
        setEditing(false);
      }
    } else {
      setEditing(false);
    }
  }

  useEffect(() => {
    if (editing) {
      (inputRef?.current as any).focus();
    }
  }, [editing]);

  const handleInputKeypress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNameChanged();
    } else if (e.key === "Escape") {
      setEditing(false);
    }
  };

  const editingControls = (
    <div className=" ai-absolute ai-bottom-0 ai-right-0 ai-top-0">
      <span
        onClick={onNameChanged}
        className="material-symbols-outlined ai-text-xs ai-px-1 ai-py-0 ai-bg-success ai-text-success-content"
        style={{ fontSize: "1rem" }}
      >
        done
      </span>
    </div>
  );

  const dropdownMenu = (
    <ul
      ref={popoverRef}
      tabIndex={0}
      className={clsx(
        "ai-translate-x-11 ai-mt-[3px] ai-rounded-none ai-bg-base-200 ai-absolute ai-dropdown-content ai-z-50 ai-menu ai-p-2 ai-shadow ai-g-base-100",
        { "ai-hidden": !menuOpen }
      )}
    >
      <li
        onClick={() => {
          onShareClicked?.(conversation);
          setMenuOpen(false);
        }}
      >
        <a>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1rem" }}
          >
            ios_share
          </span>
          Share
        </a>
      </li>
      <li
        onClick={() => {
          setEditing(true);
          setNewName(displayName);
        }}
      >
        <a>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1rem" }}
          >
            edit
          </span>
          Rename
        </a>
      </li>
      <div className="ai-divider ai-my-0"></div>
      <li
        onClick={() => {
          onDeletedClicked?.(conversation);
          setMenuOpen(false);
        }}
      >
        <a className="ai-text-error">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1rem" }}
          >
            delete
          </span>
          Delete
        </a>
      </li>
    </ul>
  );

  const menuButtons = <></>;

  useLayoutEffect(() => {
    detectIfPopoverBelowScreen();
  }, [menuOpen]);

  return (
    <button
      className="ai-group ai-relative ai-rounded-lg hover:ai-bg-base-200 ai-w-[230px]"
      ref={itemRef}
      key={conversation.id}
      onMouseLeave={() => {
        setMenuOpen(false);
      }}
    >
      <div className="ai-flex ai-items-center ai-gap-1 ai-p-2">
        <div className="ai-relative ai-grow ai-overflow-hidden ai-whitespace-nowrap">
          <div
            className={clsx("ai-w-full", {
              " ai-hidden": !editing,
              "ai-flex": editing,
            })}
          >
            <input
              disabled={loading}
              className=" ai-flex-grow ai-pr-8"
              onKeyDown={handleInputKeypress}
              ref={inputRef}
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />

            {!loading && editingControls}

            {loading && (
              <span className=" ai-ml-2 ai-loading ai-loading-spinner ai-w-[10px]"></span>
            )}
          </div>

          {!editing && displayName}

          {/* Provides the little gradient overlay effect */}
          <div
            className={clsx(
              "ai-absolute ai-bottom-0 ai-right-0 ai-top-0 ai-bg-gradient-to-l ai-to-transparent ai-w-8 ai-from-base-300 ai-from-0% group-hover:ai-w-20 group-hover:ai-from-base-200 group-hover:ai-from-60%",
              {
                "ai-hidden": editing,
              }
            )}
          />
        </div>
      </div>

      <div
        className={clsx(
          "ai-absolute ai-z-50  ai-bottom-0 ai-right-0 ai-top-0 ai-items-center ai-gap-2 ai-pr-2",
          {
            "group-hover:ai-flex": !editing,
            "ai-hidden": !menuOpen || editing,
            "ai-flex": menuOpen && !editing,
          }
        )}
      >
        <div
          ref={btnRef}
          className={clsx(
            "ai-absolute ai-right-1 ai-flex ai-dropdown ai-dropdown-left ai-dropdown-bottom",
            {
              "ai-dropdown-top": topPosition,
              "ai-dropdown-open": menuOpen,
            }
          )}
        >
          <div
            className="ai-btn ai-btn-xs ai-p-0"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <span
              className="material-symbols-outlined ai-text-xs"
              style={{ fontSize: "1.2rem" }}
            >
              more_horiz
            </span>
          </div>

          <div
            onClick={() => {
              onArchivedClicked?.(conversation);
              setMenuOpen(false);
            }}
            className="ai-tooltip ai-tooltip-top ai-text-xs"
            data-tip="Archive"
          >
            <div className="ai-btn ai-btn-xs ai-p-0">
              <span
                className="material-symbols-outlined ai-text-xs"
                style={{ fontSize: "1.2rem" }}
              >
                inventory_2
              </span>
            </div>
          </div>
          {dropdownMenu}
        </div>
      </div>
    </button>
  );
}
