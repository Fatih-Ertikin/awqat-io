import { WithId, Document } from "mongodb";

export interface Admin1Code extends WithId<Document> {
  geoNameId: number;
  adminCode: string;
  name: string;
  asciiName: string;
}
