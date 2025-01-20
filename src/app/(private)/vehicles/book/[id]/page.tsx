import { IVehicle } from '@/interfaces'
import { getVehicleById } from '@/server-actions/vehicles'
import { Alert } from 'antd'
import React from 'react'
import VehicleMediaCarousel from '../components/vehicle-media-carousel'
import VehicleInfo from '../components/vehicle-info'

interface IVehicleBookingPageProps {
  params: {
    id: string
  }
}

// Ensure that params are correctly awaited
async function VehicleBookingPage({ params }: IVehicleBookingPageProps) {
  // Wait for the params to be resolved before using them
  const { success, data } = await getVehicleById(params.id);

  if (!success) {
    return <Alert message="Failed to fetch vehicle" type="error" />;
  }

  const vehicle: IVehicle = data;

  return (
    <div>
      <h1 className="text-xl font-bold">{vehicle.name}</h1>

      <div className="grid lg:grid-cols-3 mt-5">
        <div className="col-span-2">
          <VehicleMediaCarousel vehicle={vehicle} />
        </div>
        <div className="col-span-1 ml-5">
          <VehicleInfo vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}

export default VehicleBookingPage;
