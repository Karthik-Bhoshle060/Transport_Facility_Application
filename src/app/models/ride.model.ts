export interface Ride {
  id: string; // uuid
  ownerEmployeeId: string;
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  totalSeats: number;
  vacantSeats: number;
  timeISO: string;
  pickupPoint: string;
  destination: string;
  bookedBy: string[];
}
export interface User {
  employeeId: string;
  name: string;
  password?: string; 
}
