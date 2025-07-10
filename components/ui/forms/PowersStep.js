import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PowersStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Step explainer */}
      <div className="mb-4 p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-semibold mb-2">Trust Powers</h2>
        <p className="text-sm text-gray-700">
          Let&apos;s identify the key powers granted in your trust. This helps us understand what your trust can and cannot do.
        </p>
      </div>

      <div>
        <Label htmlFor="investmentPowers">Investment Powers</Label>
        <Input 
          id="investmentPowers" 
          {...register("investmentPowers")} 
          placeholder="e.g., Full investment discretion, Limited to specific investments"
        />
        <p className="text-xs text-gray-500 mt-1">
          Describe what investment powers the trustee has (e.g., &quot;Full discretion to invest in any securities&quot;).
        </p>
        {errors.investmentPowers && (
          <p className="text-sm text-red-600 mt-1">{errors.investmentPowers.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="distributionPowers">Distribution Powers</Label>
        <Input 
          id="distributionPowers" 
          {...register("distributionPowers")} 
          placeholder="e.g., Discretionary distributions, HEMS standard"
        />
        <p className="text-xs text-gray-500 mt-1">
          Describe when and how the trustee can make distributions to beneficiaries.
        </p>
        {errors.distributionPowers && (
          <p className="text-sm text-red-600 mt-1">{errors.distributionPowers.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="administrativePowers">Administrative Powers</Label>
        <Input 
          id="administrativePowers" 
          {...register("administrativePowers")} 
          placeholder="e.g., Power to sell real estate, Power to borrow"
        />
        <p className="text-xs text-gray-500 mt-1">
          List any special administrative powers (e.g., power to sell real estate, borrow money).
        </p>
        {errors.administrativePowers && (
          <p className="text-sm text-red-600 mt-1">{errors.administrativePowers.message}</p>
        )}
      </div>

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
