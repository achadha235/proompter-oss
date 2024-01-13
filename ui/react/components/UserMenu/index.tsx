import { User } from "@proompter/core";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export function UserMenu({
  user,
  className,
  onLogoutPressed,
}: {
  user?: User;
  className?: string;
  onLogoutPressed?: () => void;
}) {
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useOnClickOutside(ref, () => {
    setMenuOpen(false);
  });
  return (
    <div
      ref={ref}
      className={clsx(
        "ai-z-20 ai-dropdown ai-dropdown-top hover:ai-bg-base-100 ai-cursor-pointer ai-w-full ai-p-2",
        {
          "ai-dropdown-open ai-bg-base-100": menuOpen,
        }
      )}
    >
      <div
        onClick={() => setMenuOpen((prev) => !prev)}
        className={clsx(
          className,
          "ai-flex ai-flex-row ai-items-center ai-p-2 ai-gap-2"
        )}
      >
        <div className="ai-avatar">
          <div className="ai-w-8 ai-rounded-full ai-bg-primary">
            <img
              className="ai-h-full ai-w-full"
              src={user?.imageURL}
              alt="logo"
            />
          </div>
        </div>
        <div className=" ai-text-base-content ai-text-sm ai-font-bold ai-line-clamp-1 ai-overflow-hidden">
          {user?.name || user?.email}
        </div>
      </div>

      <ul
        tabIndex={0}
        className="ai-dropdown-content ai-z-[1] ai-menu ai-p-2 ai-shadow ai-bg-base-100 ai-rounded-box ai-w-[230px]"
      >
        <li>
          <a>
            <span className="material-symbols-outlined">award_star</span>My Plan
          </a>
        </li>

        <li>
          <a>
            <span className="material-symbols-outlined">toggle_on</span>
            Customize
          </a>
        </li>

        <li>
          <a>
            <span className="material-symbols-outlined">settings</span>Settings
          </a>
        </li>
        <div className="ai-divider ai-m-0" />
        <li>
          <a onClick={onLogoutPressed}>
            <span className="material-symbols-outlined">logout</span>Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
