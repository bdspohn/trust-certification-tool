// components/forms/TrusteeStep.js
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function TrusteeStep() {
  const { register, control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "trustees" });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded-lg space-y-2 bg-gray-50">
          <h4 className="font-semibold">Trustee {index + 1}</h4>

          <div>
            <Label>Name</Label>
            <Input {...register(`trustees.${index}.name`)} placeholder="Trustee name" />
            {errors.trustees?.[index]?.name && (
              <p className="text-red-500 text-sm">{errors.trustees[index].name.message}</p>
            )}
          </div>

          <div>
            <Label>Title</Label>
            <Input {...register(`trustees.${index}.title`)} placeholder="Trustee title" />
            {errors.trustees?.[index]?.title && (
              <p className="text-red-500 text-sm">{errors.trustees[index].title.message}</p>
            )}
          </div>

          {fields.length > 1 && (
            <Button variant="outline" onClick={() => remove(index)} type="button" className="mt-2">Remove Trustee</Button>
          )}
        </div>
      ))}

      <Button type="button" onClick={() => append({ name: "", title: "" })}>Add Trustee</Button>
    </div>
  );
}
