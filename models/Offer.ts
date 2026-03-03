interface Offer {
  id: string;
  application_id: string;
  status: string;
  offer: number;
  responded_at: Date;
  created_at: Date;
  updated_at: Date;
}

export type { Offer };
