import { inquirySelectionBuckets } from "@/data/inquiry";
import { getCategoryItems, getPickupCategories } from "@/lib/inquiry-estimate";
import { InquiryFormValues, InquirySelectionBucket } from "@/types/inquiry";
import { FormikProps, getIn } from "formik";
import { MultiSelectGrid } from "../multi-select-grid";
import { PickupCategoryBlock } from "../pickup-category-block";
import { SectionCard } from "../section-card";
import { FieldError } from "../utils";

const BuildMenuStep = ({
  formik,
}: {
  formik: FormikProps<InquiryFormValues>;
}) => {
  const updatePickupQuantity = (key: string, quantity: number) => {
    const nextPickupQuantities = {
      ...formik.values.pickupQuantities,
      [key]: quantity,
    };

    formik.setFieldValue("pickupQuantities", nextPickupQuantities, true);
  };

  const toggleSelection = (
    field:
      | "selectedNibbles"
      | "selectedRegularMains"
      | "selectedProteins"
      | "selectedSides"
      | "selectedSoups"
      | "selectedStews",
    itemName: string,
  ) => {
    const currentSelections = formik.values[field];
    const nextSelections = currentSelections.includes(itemName)
      ? currentSelections.filter((value) => value !== itemName)
      : [...currentSelections, itemName];

    formik.setFieldValue(field, nextSelections);
  };

  const isPackageStyle = ["buffet-setup-only", "plated-dinner"].includes(
    formik.values.serviceStyle,
  );

  return (
    <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
      <SectionCard
        title="Build the menu"
        description="Choose the menu structure for the selected service style. The estimate updates live as add-ons are introduced."
      >
        <div className="grid gap-8">
          {formik.values.serviceStyle === "nibbles-only" ? (
            <MultiSelectGrid
              title="Nibbles selection"
              description="Choose the nibble options you want to price. We will apply the minimum food spend if needed."
              items={getCategoryItems("nibbles")}
              selected={formik.values.selectedNibbles}
              onToggle={(itemName) =>
                toggleSelection("selectedNibbles", itemName)
              }
              error={
                getIn(formik.touched, "selectedNibbles")
                  ? getIn(formik.errors, "selectedNibbles")
                  : undefined
              }
              pricingModel="per-guest"
              includedCount={undefined}
            />
          ) : null}

          {isPackageStyle
            ? inquirySelectionBuckets.map((bucket) => {
                const fieldMap: Record<
                  InquirySelectionBucket["key"],
                  keyof InquiryFormValues
                > = {
                  nibbles: "selectedNibbles",
                  regularMains: "selectedRegularMains",
                  premiumMains: "selectedRegularMains",
                  proteins: "selectedProteins",
                  sides: "selectedSides",
                  soups: "selectedSoups",
                  stews: "selectedStews",
                };

                const field = fieldMap[bucket.key];

                return (
                  <MultiSelectGrid
                    key={bucket.key}
                    title={bucket.title}
                    description={bucket.helperText}
                    items={getCategoryItems(bucket.categorySlug)}
                    selected={formik.values[field] as string[]}
                    onToggle={(itemName) =>
                      toggleSelection(
                        field as
                          | "selectedNibbles"
                          | "selectedRegularMains"
                          | "selectedProteins"
                          | "selectedSides"
                          | "selectedSoups"
                          | "selectedStews",
                        itemName,
                      )
                    }
                    error={
                      getIn(formik.touched, field)
                        ? getIn(formik.errors, field)
                        : undefined
                    }
                    pricingModel={bucket.pricingModel}
                    includedCount={bucket.includedCount}
                  />
                );
              })
            : null}

          {formik.values.serviceStyle === "pickup" ? (
            <div className="grid gap-6">
              {getPickupCategories().map((category) => (
                <PickupCategoryBlock
                  key={category.slug}
                  category={category}
                  quantities={formik.values.pickupQuantities}
                  onChange={updatePickupQuantity}
                />
              ))}
              <FieldError
                error={
                  getIn(formik.touched, "pickupQuantities")
                    ? getIn(formik.errors, "pickupQuantities")
                    : undefined
                }
                variant="bold"
              />
            </div>
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
};

export default BuildMenuStep;
