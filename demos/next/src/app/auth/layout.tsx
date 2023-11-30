export default function AuthLayout({ children }) {
  return (
    <div className="bg-background-default w-screen h-screen flex justify-center items-center p-4">
      {children}
    </div>
  );
}
