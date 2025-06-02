"use client";

import { useRouter } from "@/i18n/navigation";
import { Button, Loader, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Building2, ChevronDown, Globe, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

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
  const [loadingCities, setLoadingCities] = useState(false);

  const handleCountryChange = useCallback(
    async (value: string | null) => {
      setSelectedCountry(value);
      setSelectedCity(null);
      setCities([]);
      setLoadingCities(true);

      if (value) {
        try {
          const fetchedCities = await getCountryCities(value);
          setCities(fetchedCities);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          notifications.show({
            title: translate("error_fetching_cities_title"),
            message: translate("error_fetching_cities_message"),
            color: "red",
          });
        }
      }

      setLoadingCities(false);
    },
    [getCountryCities, translate]
  );

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
        onChange={handleCountryChange}
        label={translate("country_select_label")}
        placeholder={translate("country_select_placeholder")}
        data={countries.map((country) => ({
          value: country.slug,
          label: country.localizedName,
        }))}
        searchable
        leftSection={<Globe size={18} />}
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
        data={cities.map((city) => ({
          value: city.slug,
          label: city.localizedName,
        }))}
        searchable
        disabled={!selectedCountry}
        rightSection={loadingCities ? <Loader size={18} /> : <ChevronDown />}
        leftSection={<Building2 size={18} />}
      />

      <Button
        variant="outline"
        color="gray"
        rightSection={<MoveRight />}
        onClick={handleSubmit}
      >
        {translate("submit_button_label")}
      </Button>
    </>
  );
}
