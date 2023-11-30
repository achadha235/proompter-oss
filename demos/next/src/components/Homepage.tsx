import config from "@/proompter.config";
import Link from "next/link";
export default function Homepage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center">
        <div className="text-7xl font-black tracking-tighter">
          {config.name}
        </div>
        <div className="max-w-lg text-lg text-center">{config.description}</div>
      </div>
      <Link href="/auth/login">
        <button className="btn">Login</button>
      </Link>
    </div>
  );
}
