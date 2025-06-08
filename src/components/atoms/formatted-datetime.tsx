"use client";

import React, { ForwardedRef, ForwardRefRenderFunction } from "react";
import { Box, createPolymorphicComponent } from "@mantine/core";
import { useNow, useFormatter, DateTimeFormatOptions } from "next-intl";

type DefaultElementType = HTMLDivElement;
const defaultElement = "div" as const;

type ElementProps = Omit<
  React.HTMLAttributes<DefaultElementType>,
  "children" | "suppressHydrationWarning"
>;

interface FormattedDateTimeProps extends ElementProps {
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

  /**
   * The interval in milliseconds to update the formatted date.
   * If not provided, the date will not update automatically.
   */
  updateInterval?: number;
}

const Ref: ForwardRefRenderFunction<
  DefaultElementType,
  FormattedDateTimeProps
> = (props: FormattedDateTimeProps, ref: ForwardedRef<DefaultElementType>) => {
  const { date, formatOptions, updateInterval, ...rest } = props;

  const now = useNow({
    updateInterval,
  });

  const format = useFormatter();

  const dateToFormat = date || now;

  const formattedDate = format.dateTime(dateToFormat, {
    ...formatOptions,
  });

  return (
    <time
      dateTime={dateToFormat.toISOString()}
      /**
       * Supressing hydration warning is normal here because value is updated on the client side
       * See https://next-intl.dev/docs/usage/dates-times#relative-times-hydration
       */
      suppressHydrationWarning
    >
      <Box
        component={defaultElement}
        {...rest}
        ref={ref}
        suppressHydrationWarning
      >
        {formattedDate}
      </Box>
    </time>
  );
};

/**
 * Polymorphic component that renders a formatted date in the user's selected time zone.
 */
export const FormattedDateTime = createPolymorphicComponent<
  "span",
  FormattedDateTimeProps
>(Ref);
