// components/forms/ReviewStep.js
import { useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Review Your Information</h3>

      <div className="space-y-2">
        <p><strong>Trust Name:</strong> {values.trustName}</p>
        <p><strong>Date of Trust:</strong> {values.dateOfTrust}</p>
        {values.amendmentDate && <p><strong>Date of Last Amendment:</strong> {values.amendmentDate}</p>}
        {values.beneficiaryName && <p><strong>Beneficiary:</strong> {values.beneficiaryName}</p>}
        <p><strong>Trust Type:</strong> {values.trustType}</p>
      </div>

      <div>
        <h4 className="font-medium">Trustees</h4>
        <ul className="list-disc list-inside">
          {values.trustees.map((t, i) => (
            <li key={i}>{t.name}, {t.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-medium">Powers Granted</h4>
        <ul className="list-disc list-inside">
          {values.powers.map((power, i) => (
            <li key={i}>{power === "Other" ? `Other: ${values.otherPower}` : power}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
