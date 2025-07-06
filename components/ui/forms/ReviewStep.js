import { useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review Information</h2>

      <div>
        <h3 className="font-medium">Trust Details</h3>
        <p><strong>Name:</strong> {values.trustName}</p>
        <p><strong>Date:</strong> {values.trustDate}</p>
      </div>

      <div>
        <h3 className="font-medium">Trustees</h3>
        {values.trustees?.map((t, i) => (
          <p key={i}>
            <strong>{t.name}</strong>, {t.title}
          </p>
        ))}
      </div>

      <div>
        <h3 className="font-medium">Powers Granted</h3>
        <ul className="list-disc list-inside">
          {values.powers?.length > 0 ? (
            values.powers.map((power, i) => <li key={i}>{power}</li>)
          ) : (
            <li>No powers selected</li>
          )}
        </ul>
      </div>
    </div>
  );
}
