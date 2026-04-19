import { basePackagesTable } from "@/data/pricing-page";

export const PricingBreakdown = () => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
            Service style
          </th>
          <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
            Food spend minimum
          </th>
          <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
            Guest requirement
          </th>
          <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
            Base package includes
          </th>
          <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
            Setup fee
          </th>
          <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
            Service charge
          </th>
        </tr>
      </thead>
      <tbody>
        {basePackagesTable.map((item) => (
          <tr key={item.serviceStyle}>
            <td className="border-b border-line px-4 py-4 align-top font-medium">
              {item.serviceStyle}
            </td>
            <td className="border-b border-line px-4 py-4 align-top text-text-soft">
              {item.foodSpendMinimum}
            </td>
            <td className="border-b border-line px-4 py-4 align-top text-text-soft">
              {item.guestRequirement}
            </td>
            <td className="border-b border-line px-4 py-4 align-top text-text-soft">
              {item.packageIncludes}
            </td>
            <td className="border-b border-line px-4 py-4 align-top text-text-soft">
              {item.setupFee}
            </td>
            <td className="border-b border-line px-4 py-4 align-top text-text-soft">
              {item.serviceCharge}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
