export const BaseButton = ({ title }: { title: String }) => {
  return (
    <div className="shrink-0 rounded-md border border-black px-3 py-2">
      <p className="shrink-0 text-sm text-black">{title}</p>
    </div>
  );
};
