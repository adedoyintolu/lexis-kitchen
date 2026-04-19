export function ReviewList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[1.15rem] border border-line bg-white p-4 transition-transform duration-300 hover:-translate-y-px">
      <p className="m-0 text-sm font-semibold">{title}</p>
      <p className="m-0 mt-1 text-xs uppercase tracking-[0.16em] text-accent-soft">
        {items.length} item{items.length === 1 ? "" : "s"}
      </p>
      {items.length ? (
        <ul className="m-0 mt-3 list-none p-0 grid gap-2">
          {items.map((item) => (
            <li key={item} className="text-sm text-text-soft">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 mt-3 text-sm text-text-soft">Nothing selected.</p>
      )}
    </div>
  );
}
