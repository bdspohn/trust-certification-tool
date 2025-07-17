import { useFormContext } from "react-hook-form";

export default function ReviewStep() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-6">
      {/* Step explainer */}
      <div className="mb-4 p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-semibold mb-2">Review Your Information</h2>
        <p className="text-sm text-gray-700">
          Please review all the information below before generating your trust certification report.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-3">Trust Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {values.trustName || "Not provided"}</p>
            <p><span className="font-medium">Date:</span> {values.trustDate || "Not provided"}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-3">Trustees</h3>
          <div className="space-y-2">
            {values.trustees?.map((trustee, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded">
                <p><span className="font-medium">Name:</span> {trustee.name || "Not provided"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold text-lg mb-3">Trust Powers</h3>
          <div className="space-y-2">
            {values.investmentPowers && values.investmentPowers.length > 0 && (
              <p><span className="font-medium">Investment Powers:</span> {Array.isArray(values.investmentPowers) ? values.investmentPowers.join(", ") : values.investmentPowers}{values.investmentPowersOther ? `, ${values.investmentPowersOther}` : ""}</p>
            )}
            {values.distributionPowers && values.distributionPowers.length > 0 && (
              <p><span className="font-medium">Distribution Powers:</span> {Array.isArray(values.distributionPowers) ? values.distributionPowers.join(", ") : values.distributionPowers}{values.distributionPowersOther ? `, ${values.distributionPowersOther}` : ""}</p>
            )}
            {values.administrativePowers && values.administrativePowers.length > 0 && (
              <p><span className="font-medium">Administrative Powers:</span> {Array.isArray(values.administrativePowers) ? values.administrativePowers.join(", ") : values.administrativePowers}{values.administrativePowersOther ? `, ${values.administrativePowersOther}` : ""}</p>
            )}
            {values.restrictions && (
              <p><span className="font-medium">Restrictions:</span> {values.restrictions}</p>
            )}
            {!values.investmentPowers && !values.distributionPowers && 
             !values.administrativePowers && !values.restrictions && (
              <p className="text-gray-500 italic">No powers information provided</p>
            )}
          </div>
        </div>
      </div>

      {/* Generate Trust Report Button */}
      <div className="pt-6 text-center">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
          onClick={() => alert('Trust Report generation coming soon!')}
        >
          Generate Trust Report
        </button>
      </div>
    </div>
  );
}
