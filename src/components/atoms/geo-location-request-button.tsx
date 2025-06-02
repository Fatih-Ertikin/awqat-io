"use client";

import { useGeoLocation } from "@/hooks/use-geo-location";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type GeoLocationRequestProps = {
  onConfirm: (latitude: number, longitude: number) => Promise<void>;
};

export function GeoLocationRequestButton(props: GeoLocationRequestProps) {
  const { onConfirm } = props;
  const translate = useTranslations("Components.GeoLocationRequest");
  const [isDisabled, setIsDisabled] = useState(false);

  const { requestLocation } = useGeoLocation({
    onSuccess: async (position) => {
      setIsDisabled(true);
      const { latitude, longitude } = position.coords;
      await onConfirm(latitude, longitude);
      setIsDisabled(false);
    },
    onError: (error) => {
      setIsDisabled(false);

      let title: string;
      let message: string;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          title = translate("error_permission_denied_title");
          message = translate("error_permission_denied_description");
          break;
        case error.POSITION_UNAVAILABLE:
          title = translate("error_position_unavailable_title");
          message = translate("error_position_unavailable_description");
          break;
        case error.TIMEOUT:
          title = translate("error_timeout_title");
          message = translate("error_timeout_description");
          break;
        default:
          title = translate("error_unknown_title");
          message = translate("error_unknown_description");
          break;
      }

      notifications.show({
        title: title,
        message: message,
        color: "red",
      });
    },
  });

  return (
    <Button
      radius="xl"
      leftSection={<MapPin size={24} />}
      disabled={isDisabled}
      onClick={requestLocation}
    >
      {translate("btn_label")}
    </Button>
  );
}
