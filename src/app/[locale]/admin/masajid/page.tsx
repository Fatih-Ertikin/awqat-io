import {
  FormValues as MasjidCreateFormValues,
  MasajidCrudTable,
} from "@/components/molecules/masajid-crud-table";
import {
  getAllMasajid,
  createMasjid,
  deleteMasjid,
  updateMasjid,
} from "@/server/mongo/masajid/masajid.collection";
import { Title } from "@mantine/core";
import { ObjectId } from "mongodb";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export default async function MasajidPage(
  params: Promise<{
    locale: string;
  }>
) {
  const { locale } = await params;
  const translate = await getTranslations("Pages.MasajidPage");

  const handleCreateMasjid = async (values: MasjidCreateFormValues) => {
    "use server";

    await createMasjid({
      _id: new ObjectId(),
      fallbackName: values.fallbackName,
      names: {},
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
      address: {
        city: "",
        country: values.address.country,
        state: values.address.state,
        streetName: values.address.streetName,
        postalCode: values.address.postalCode,
      },
    });

    revalidatePath(`/${locale}/admin/masajid`);
  };

  const handleDeleteMasjid = async (id: string) => {
    "use server";

    const objectId = new ObjectId(id);

    await deleteMasjid(objectId);
    revalidatePath(`/${locale}/admin/masajid`);
  };

  const handleUpdateMasjid = async (updatedValues: MasjidCreateFormValues) => {
    "use server";

    const objectId = new ObjectId(updatedValues._id);
    await updateMasjid({
      _id: objectId,
      fallbackName: updatedValues.fallbackName,
      names: {},
      location: {
        type: "Point",
        coordinates: [0, 0],
      },
      address: {
        city: "",
        country: updatedValues.address.country,
        state: updatedValues.address.state,
        streetName: updatedValues.address.streetName,
        postalCode: updatedValues.address.postalCode,
      },
    });

    revalidatePath(`/${locale}/admin/masajid`);
  };

  const masajid = await getAllMasajid();

  // Mongo ObjectId's cannot be send to client components directly,
  const serialized = masajid.map((m) => ({
    _id: m._id.toString(),
    fallbackName: m.fallbackName,
    address: {
      country: m.address.country,
      state: m.address.state,
      streetName: m.address.streetName,
      postalCode: m.address.postalCode,
    },
  }));

  return (
    <>
      <Title order={1} mb="md">
        {translate("title")}
      </Title>

      <Title order={2} mb="md" fw="normal">
        {translate("description")}
      </Title>

      <MasajidCrudTable
        masajid={serialized}
        createAction={handleCreateMasjid}
        updateAction={handleUpdateMasjid}
        deleteAction={handleDeleteMasjid}
      />
    </>
  );
}
