export const Error = ({ error }: { error: string | null }) => {
  return (
    <div className="h-10">
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
