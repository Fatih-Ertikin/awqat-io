"use client";

import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Group,
  Modal,
  Stack,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useOptimistic, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { ObjectId } from "bson";
import { useTranslations } from "next-intl";

const schema = z.object({
  _id: z.string(),
  fallbackName: z.string().min(1, "Name is required"),
  address: z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    streetName: z.string().min(1, "Street name is required"),
    postalCode: z.string().min(1, "Postal code is required"),
  }),
});

export type FormValues = z.infer<typeof schema>;

type Masjid = FormValues;

export type DataTableProps = {
  masajid: Masjid[];
  createAction: (values: FormValues) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
  updateAction: (updatedValues: FormValues) => Promise<void>;
};

export function MasajidCrudTable(props: DataTableProps) {
  const { masajid, createAction, deleteAction, updateAction } = props;

  const translate = useTranslations("Components.MasajidCrudTable");

  const [isPending, startTransition] = useTransition();

  const [drawerState, drawerHandlers] = useDisclosure(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");

  const [deleteModalState, deleteModalHandlers] = useDisclosure(false);

  /**
   * Build optimistic state
   * Each based on the previous state
   * This allows us to create, delete, and update masajid
   * Use the "latest" optimistic state to render the table
   * (In this case, optimisticUpdate)
   */

  const [optimisticCreate, addOptimistic] = useOptimistic(
    masajid,
    (state, newTodo: FormValues) => {
      return [...state, newTodo];
    }
  );

  const [optismisticDelete, removeOptimistic] = useOptimistic(
    optimisticCreate,
    (state, id: string) => {
      return state.filter((m) => m._id !== id);
    }
  );

  const [optimisticUpdate, updateOptimistic] = useOptimistic(
    optismisticDelete,
    (state, updatedValues: FormValues) => {
      return state.map((m) =>
        m._id === updatedValues._id ? { ...m, ...updatedValues } : m
      );
    }
  );

  const form = useForm<FormValues>({
    mode: "controlled",
    initialValues: {
      /**
       * New items automatically get a new ObjectId
       * When updating, the _id should be set to the existing masjid's _id
       */
      _id: new ObjectId().toString(),
      fallbackName: "",
      address: {
        country: "",
        state: "",
        streetName: "",
        postalCode: "",
      },
    },
    validate: zodResolver(schema),
  });

  const handleFormSubmit = async (values: FormValues) => {
    form.reset();
    drawerHandlers.close();

    startTransition(async () => {
      if (drawerMode === "create") {
        addOptimistic(values);
        await createAction(values);
      }

      if (drawerMode === "edit") {
        updateOptimistic(values);
        await updateAction(values);
      }
    });
  };

  const handleClickDelete = async () => {
    const id = form.values._id;
    if (!id) {
      return;
    }

    deleteModalHandlers.close();

    startTransition(async () => {
      removeOptimistic(id);
      await deleteAction(id);
    });
  };

  const handleClickCreate = () => {
    setDrawerMode("create");
    form.reset();
    drawerHandlers.open();
  };

  const handleClickEdit = (row: Masjid) => {
    setDrawerMode("edit");
    form.setValues(row);
    drawerHandlers.open();
  };

  const rows = optimisticUpdate.map((row, i) => (
    <Table.Tr key={`masjid-${row._id}-${row.fallbackName}-${i}`}>
      <Table.Td>{row.fallbackName}</Table.Td>
      <Table.Td visibleFrom="sm">{row.address.country}</Table.Td>
      <Table.Td>{row.address.streetName}</Table.Td>
      <Table.Td>
        <Group wrap="nowrap" gap="xs">
          <ActionIcon
            onClick={() => {
              // set selected row in the form to access later in the delete modal
              form.setValues(row);
              deleteModalHandlers.open();
            }}
            disabled={isPending}
            variant="transparent"
            color="red"
          >
            <IconTrash />
          </ActionIcon>
          <ActionIcon
            onClick={() => handleClickEdit(row)}
            disabled={isPending}
            variant="transparent"
            color="blue"
          >
            <IconPencil />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <Modal
        opened={deleteModalState}
        onClose={deleteModalHandlers.close}
        title={translate("delete_modal_title")}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack>
          <Text>{translate("delete_modal_text")}</Text>
          <Group justify="space-between" mt="md">
            <Button
              variant="outline"
              color="blue"
              onClick={deleteModalHandlers.close}
            >
              {translate("delete_modal_cancel_button_label")}
            </Button>
            <Button
              color="red"
              onClick={() => {
                handleClickDelete();
              }}
            >
              {translate("delete_modal_button_label")}
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Drawer
        opened={drawerState}
        onClose={drawerHandlers.close}
        position="right"
        title={
          drawerMode === "create"
            ? translate("create_drawer_title")
            : translate("edit_drawer_title")
        }
      >
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            <TextInput
              required
              label="Default name"
              placeholder="Masjid al falaah"
              key={form.key("fallbackName")}
              {...form.getInputProps("fallbackName")}
            />
            <TextInput
              required
              label="Country"
              placeholder="Netherlands"
              key={form.key("address.country")}
              {...form.getInputProps("address.country")}
            />
            <TextInput
              required
              label="State"
              placeholder="Flevoland"
              key={form.key("address.state")}
              {...form.getInputProps("address.state")}
            />
            <TextInput
              required
              label="Street name"
              placeholder="Europalaan 123"
              key={form.key("address.streetName")}
              {...form.getInputProps("address.streetName")}
            />
            <TextInput
              required
              label="Postal code"
              placeholder="1234 AB"
              key={form.key("address.postalCode")}
              {...form.getInputProps("address.postalCode")}
            />
            <Button type="submit" disabled={isPending}>
              {drawerMode === "create" ? "Create" : "Update"}
            </Button>
          </Stack>
        </form>
      </Drawer>

      <Flex justify="end" wrap="nowrap" mb="xs">
        <Button
          disabled={isPending}
          onClick={() => handleClickCreate()}
          leftSection={<IconPlus />}
        >
          {translate("create_button_label")}
        </Button>
      </Flex>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{translate("heading_name")}</Table.Th>
            <Table.Th visibleFrom="sm">{translate("heading_country")}</Table.Th>
            <Table.Th>{translate("heading_street")}</Table.Th>
            <Table.Th>{translate("heading_actions")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
}
