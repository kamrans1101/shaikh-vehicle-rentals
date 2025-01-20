import PageTitle from '@/app/components/page-title'
import { getAllVehicles } from '@/server-actions/vehicles'
import { Alert, Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import VehicleTable from './_components/vehicle-table'
import CategoryFilters from './_components/category-filters'

async function VehiclesListPage() {
  const { success, data } = await getAllVehicles({});
  if (!success) {
    return <Alert message="Failed to fetch vehicles" type="error" />
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Vehicles" />

        <Button type="primary">
          <Link href="/admin/vehicles/add">
            Add Vehicle
          </Link>
        </Button>
      </div>
      <VehicleTable vehicles={data} />
    </div>
  )
}

export default VehiclesListPage