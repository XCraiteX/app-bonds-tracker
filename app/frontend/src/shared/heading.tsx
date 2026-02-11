export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
      {children}
    </h1>
  );
}
