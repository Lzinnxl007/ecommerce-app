export default function ErrorForm({ message }: { message: string }) {
  return <>{message && <p className="text-red-500 my-2 text-sm">{message}</p>}</>;
}
