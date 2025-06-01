"use client";

import { useRouter } from "@/i18n/navigation";
import { Button, Select } from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";

type CountrySelectOption = {
  /**
   * Country slug, used for routing and fetching cities
   * @example "the-netherlands"
   */
  slug: string;
  /**
   * Country localized name, displayed in the select dropdown
   * @example "Nederland"
   */
  localizedName: string;
};

type CitySelectOption = {
  /**
   * City slug, used for routing
   * @example "paris"
   */
  slug: string;
  /**
   * City localized name, displayed in the select dropdown
   * @example "Parijs"
   */
  localizedName: string;
};

type LocationSelectionFormProps = {
  countries: CountrySelectOption[];
  getCountryCities: (value: string) => Promise<CitySelectOption[]>;
};

export function LocationSelectionForm(props: LocationSelectionFormProps) {
  const { countries, getCountryCities } = props;
  const translate = useTranslations("Components.LocationSelectionForm");

  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const [cities, setCities] = useState<CitySelectOption[]>([]);

  const handleSelectCountry = async (value: string | null) => {
    if (!value) {
      setSelectedCity(null);
      return;
    }
    // 1. set state
    setSelectedCountry(value);

    // 2. fetch the cities for the selected country via server action
    const cities = await getCountryCities(value);

    // 3. set the cities state
    setCities(cities);
  };

  const handleSubmit = async () => {
    if (!selectedCountry || !selectedCity) {
      return;
    }

    // 1. redirect to the selected country and city, because we use slugs as dropdown values we can use them directly
    router.push({
      pathname: `/${selectedCountry}/${selectedCity}`,
    });
  };

  return (
    <>
      <Select
        value={selectedCountry}
        onChange={handleSelectCountry}
        label={translate("country_select_label")}
        placeholder={translate("country_select_placeholder")}
        data={countries.map((country) => ({
          value: country.slug,
          label: country.localizedName,
        }))}
        searchable
      />
      <Select
        value={selectedCity}
        onChange={setSelectedCity}
        label={translate("city_select_label")}
        placeholder={
          selectedCountry
            ? translate("city_select_placeholder")
            : translate("city_select_placeholder_no_country")
        }
        disabled={!selectedCountry || cities.length === 0}
        data={cities.map((city) => ({
          value: city.slug,
          label: city.localizedName,
        }))}
        searchable
      />
      <Button onClick={handleSubmit}>{translate("submit_button_label")}</Button>
    </>
  );
}
