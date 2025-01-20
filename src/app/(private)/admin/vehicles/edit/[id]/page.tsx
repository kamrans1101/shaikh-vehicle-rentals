import PageTitle from '@/app/components/page-title'
import React from 'react'
import VehicleForm from '../../_components/vehicle-form'
import { getVehicleById } from '@/server-actions/vehicles';
import { Alert } from 'antd';

interface IEditVehiclePageProps {
  params: {
    id: string;
  }
}

async function EditVehicle({ params } : IEditVehiclePageProps) {

  const {success, data } = await getVehicleById(params.id)
  if ( !success) {
    return <Alert message="Failed to fetch vehicle" type="error" />
  }
  
  return (
    <div>
        <PageTitle title="Edit Vehicle"/>
        <VehicleForm 
            type='edit'
            vehicleData={data}
            />
    </div>
  )
}

export default EditVehicle