import config from "@/proompter.config";
import Link from "next/link";
export default function Homepage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="ai-avatar">
          <div className="ai-w-24 ai-rounded-full ">
            <img
              className="ai-h-full ai-w-full"
              src={config.imageURL}
              alt="logo"
            />
          </div>
        </div>
        <div className="text-7xl font-black tracking-tighter">
          {config.name}
        </div>
        <div className="max-w-lg text-base px-6">{config.description}</div>
      </div>
      <Link href="/auth/login">
        <button className="btn">Login</button>
      </Link>
    </div>
  );
}
