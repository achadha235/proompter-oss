import clsx from "clsx";

const customizeFields = [
  {
    id: "fromLanguage",
    type: "text",
    length: 1500,
    // options: ["Mandarin", "Hindi", "English"],
  },

  {
    id: "fromLanguage",
    type: "select",
    options: ["Mandarin", "Hindi", "English"],
  },
  {
    id: "toLanguage",
    type: "select",
    options: ["Mandarin", "Hindi", "English"],
  },
];

export default function CustomizeModal({ open }: { open: boolean }) {
  return (
    <dialog
      id="settings-modal"
      className={clsx("ai-modal ai-w-screen", {
        "ai-modal-open": open,
      })}
    >
      <div className="ai-modal-box ai-max-w-3xl ai-p-0">
        <div className=" ai-flex ai-justify-between ai-items-center ai-p-4">
          <h3 className="ai-font-bold ai-text-lg">Customize</h3>
          <div className="ai-btn ai-btn-xs ai-btn-ghost ai-cursor-pointer">
            <span className="material-symbols-outlined ai-ml-auto">close</span>
          </div>
        </div>
        <div className="ai-divider ai-p-0 ai-m-0 ai-mb-2 ai-h-1" />
        <div className="ai-w-full ai-flex ai-flex-row ai-p-2 ai-pt-0">
          <div className="ai-flex-1 ai-max-w-[180px]">
            <ul className="ai-menu lg:ai-menu-vertical ai-menu-horizontal ai-bg-base-200 ai-rounded-box ai-gap-2">
              <li>
                <a>
                  <span className={clsx("material-symbols-outlined")}>
                    close
                  </span>{" "}
                  {"Hi"}
                </a>
              </li>
            </ul>
          </div>

          <div className="ai-flex-1 ai-flex-grow ai-h-[350px] ai-p-4 ai-pt-0">
            Hi
          </div>
        </div>
      </div>
    </dialog>
  );
}
