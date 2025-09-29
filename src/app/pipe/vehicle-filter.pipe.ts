import { Pipe, PipeTransform } from '@angular/core';
import { Ride } from '../models/ride.model';

@Pipe({
  name: 'vehicleFilter',
})
export class VehicleFilterPipe implements PipeTransform {
  transform(rides: Ride[], vehicleType: string): Ride[] | any[] {
    if (vehicleType == 'All') return rides;
    return rides.filter((r) => r.vehicleType === vehicleType);
  }
}
