"use client";

import React, { ForwardedRef, ForwardRefRenderFunction } from "react";
import { Box, createPolymorphicComponent } from "@mantine/core";
import { useNow, useFormatter, DateTimeFormatOptions } from "next-intl";

type DefaultElementType = HTMLSpanElement;
const defaultElement = "span" as const;

interface FormattedDateTimeProps
  extends Omit<
    React.HTMLAttributes<DefaultElementType>,
    "children" | "suppressHydrationWarning"
  > {
  /**
   * The date to format. If not provided, the current date is used.
   */
  date?: Date;

  /**
   * Formatting options, defaults to: { year: "numeric", month: "short", day: "numeric" }
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
   */
  formatOptions?: DateTimeFormatOptions;
}

const Ref: ForwardRefRenderFunction<
  DefaultElementType,
  FormattedDateTimeProps
> = (props: FormattedDateTimeProps, ref: ForwardedRef<DefaultElementType>) => {
  const { date, formatOptions, ...rest } = props;

  const now = useNow();
  const format = useFormatter();

  const dateToFormat = date || now;

  const defaultFormatOptions: DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = format.dateTime(dateToFormat, {
    ...defaultFormatOptions,
    ...formatOptions,
  });

  return (
    <Box
      component={defaultElement}
      {...rest}
      ref={ref}
      /**
       * Supressing hydration warning is normal here because value is updated on the client side
       * See https://next-intl.dev/docs/usage/dates-times#relative-times-hydration
       */
      suppressHydrationWarning
    >
      {formattedDate}
    </Box>
  );
};

export const FormattedDateTime = createPolymorphicComponent<
  "span",
  FormattedDateTimeProps
>(Ref);
