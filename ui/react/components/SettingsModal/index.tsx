import clsx from "clsx";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function SettingsModal({
  open,
  onClosed,
}: {
  open: boolean;
  onClosed: () => void;
}) {
  const [selectedMenu, setSelectedMenu] = useState("general");

  const menuButtons = [
    { id: "general", icon: "settings", label: "General" },
    { id: "dataControls", icon: "database", label: "Data Controls" },
  ];
  const modalRef = useRef<any>();
  useOnClickOutside(modalRef, () => {
    onClosed();
  });

  const menuItems: Record<string, React.ReactNode> = {
    general: (
      <>
        <div className="ai-w-full ai-flex ai-justify-between ai-items-center ai-p-2">
          <span className="ai-text-base">Theme</span>
          <select className="ai-select ai-select-bordered">
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
          </select>
        </div>
        <div className="ai-divider ai-p-0 ai-m-0 ai-h-1" />
        <div className="ai-w-full ai-flex ai-justify-between ai-items-center ai-p-2">
          <span className="ai-text-base">Archived chats</span>
          <div className="ai-btn">Manage</div>
        </div>
        <div className="ai-divider ai-p-0 ai-m-0 ai-h-1" />
        <div className="ai-w-full ai-flex ai-justify-between ai-items-center ai-p-2">
          <span className="ai-text-base">Archived all chats</span>
          <div className="ai-btn">Archive all</div>
        </div>
        <div className="ai-divider ai-p-0 ai-m-0 ai-h-1" />
        <div className="ai-w-full ai-flex ai-justify-between ai-items-center ai-p-2">
          <span className="ai-text-base">Delete all chats</span>
          <div className="ai-btn ai-bg-error">Delete all</div>
        </div>
      </>
    ),

    dataControls: (
      <>
        <div className="ai-w-full ai-flex ai-justify-between ai-items-center ai-p-2">
          <span className="ai-text-base">Shared links</span>
          <div className="ai-btn">Manage</div>
        </div>
        <div className="ai-divider ai-p-0 ai-m-0 ai-h-1" />
        <div className="ai-w-full ai-flex ai-justify-between ai-items-center ai-p-2">
          <span className="ai-text-base">Delete account</span>
          <div className="ai-btn ai-bg-error">Delete</div>
        </div>
      </>
    ),
  };

  return (
    <dialog
      id="settings-modal"
      className={clsx("ai-modal ai-w-screen", {
        "ai-modal-open": open,
      })}
    >
      <div className="ai-modal-box ai-max-w-3xl ai-p-0" ref={modalRef}>
        <div className=" ai-flex ai-justify-between ai-items-center ai-p-4">
          <h3 className="ai-font-bold ai-text-lg">Settings</h3>
          <div
            className="ai-btn ai-btn-xs ai-btn-ghost ai-cursor-pointer"
            onClick={onClosed}
          >
            <span className="material-symbols-outlined ai-ml-auto">close</span>
          </div>
        </div>
        <div className="ai-divider ai-p-0 ai-m-0 ai-mb-2 ai-h-1" />
        <div className="ai-w-full  ai-h-[60vh] ai-flex ai-flex-col lg:ai-flex-row ai-p-2 ai-pt-0 ai-justify-start ai-items-start">
          <div className="ai-flex-shrink lg:ai-max-w-[180px] ai-h-fit">
            <ul className="ai-menu lg:ai-menu-vertical ai-menu-horizontal ai-bg-base-200 ai-rounded-box ai-gap-2">
              {menuButtons.map(({ id, label, icon }) => {
                return (
                  <li key={id} id={id} onClick={() => setSelectedMenu(id)}>
                    <a className={clsx({ "ai-active": id === selectedMenu })}>
                      <span className={clsx("material-symbols-outlined")}>
                        {icon}
                      </span>{" "}
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ai-flex-1 ai-flex-grow ai-w-full ai-h-[350px] ai-p-4 ai-pt-0">
            {menuItems[selectedMenu]}
          </div>
        </div>
      </div>
    </dialog>
  );
}
