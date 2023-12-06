import { User } from "@proompter/core";
import clsx from "clsx";

export function UserMenu({
  user,
  className,
}: {
  user?: User;
  className?: string;
}) {
  return (
    <div className="ai-dropdown ai-dropdown-top">
      <div
        tabIndex={0}
        role="button"
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
        <div className=" ai-text-base-content ai-text-sm ai-font-bold">
          {user?.name || user?.email}
        </div>
      </div>

      <ul
        tabIndex={0}
        className="ai-dropdown-content ai-z-[1] ai-menu ai-p-2 ai-shadow ai-bg-base-100 ai-rounded-box ai-w-full ai-w-[230px]"
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
          <a>
            <span className="material-symbols-outlined">logout</span>Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
