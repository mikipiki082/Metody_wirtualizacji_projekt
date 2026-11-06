export type InquiryInput = {
  name: string;
  email: string;
  phone: string | null;
  vehicleId: number | null;
  dateFrom: string | null;
  dateTo: string | null;
  message: string;
};
