import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const investmentPowersOptions = [
  "Full investment discretion",
  "Limited to specific investments",
  "No investment authority",
  "Must follow Prudent Investor Rule",
];

const distributionPowersOptions = [
  "Discretionary distributions",
  "HEMS standard (Health, Education, Maintenance, Support)",
  "Mandatory distributions",
  "No distribution authority",
];

const administrativePowersOptions = [
  "Power to sell real estate",
  "Power to borrow",
  "Power to amend trust",
  "Power to remove/replace trustee",
];

export default function PowersStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">
      {/* Step explainer */}
      <div className="mb-4 p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-semibold mb-2">Trust Powers</h2>
        <p className="text-sm text-gray-700">
          Select the key powers granted in your trust. This helps us understand what your trust can and cannot do. If you don&apos;t see a power listed, use the &apos;Other&apos; field.
        </p>
      </div>

      {/* Investment Powers */}
      <div>
        <Label>Investment Powers</Label>
        <div className="flex flex-col gap-2 mt-2">
          {investmentPowersOptions.map((option, idx) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option}
                {...register("investmentPowers")}
                className="accent-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <Input
          className="mt-2"
          placeholder="Other investment powers (optional)"
          {...register("investmentPowersOther")}
        />
        <p className="text-xs text-gray-500 mt-1">
          Select all that apply, or specify other investment powers.
        </p>
        {errors.investmentPowers && (
          <p className="text-sm text-red-600 mt-1">{errors.investmentPowers.message}</p>
        )}
      </div>

      {/* Distribution Powers */}
      <div>
        <Label>Distribution Powers</Label>
        <div className="flex flex-col gap-2 mt-2">
          {distributionPowersOptions.map((option, idx) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option}
                {...register("distributionPowers")}
                className="accent-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <Input
          className="mt-2"
          placeholder="Other distribution powers (optional)"
          {...register("distributionPowersOther")}
        />
        <p className="text-xs text-gray-500 mt-1">
          Select all that apply, or specify other distribution powers.
        </p>
        {errors.distributionPowers && (
          <p className="text-sm text-red-600 mt-1">{errors.distributionPowers.message}</p>
        )}
      </div>

      {/* Administrative Powers */}
      <div>
        <Label>Administrative Powers</Label>
        <div className="flex flex-col gap-2 mt-2">
          {administrativePowersOptions.map((option, idx) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option}
                {...register("administrativePowers")}
                className="accent-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <Input
          className="mt-2"
          placeholder="Other administrative powers (optional)"
          {...register("administrativePowersOther")}
        />
        <p className="text-xs text-gray-500 mt-1">
          Select all that apply, or specify other administrative powers.
        </p>
        {errors.administrativePowers && (
          <p className="text-sm text-red-600 mt-1">{errors.administrativePowers.message}</p>
        )}
      </div>

      {/* Restrictions */}
      <div>
        <Label htmlFor="restrictions">Restrictions or Limitations</Label>
        <Input
          id="restrictions"
          {...register("restrictions")}
          placeholder="e.g., Cannot invest in foreign securities, Must maintain principal"
        />
        <p className="text-xs text-gray-500 mt-1">
          Any restrictions on trustee powers or limitations on distributions.
        </p>
        {errors.restrictions && (
          <p className="text-sm text-red-600 mt-1">{errors.restrictions.message}</p>
        )}
      </div>
    </div>
  );
}
