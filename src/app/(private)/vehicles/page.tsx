import React from 'react'
import { IUsersGlobalStore, usersGlobalStore } from '@/store/user-store'
import { getAllVehicles } from '@/server-actions/vehicles'
import { Alert } from 'antd'
import PageTitle from '@/app/components/page-title'
import VehicleCard from '../admin/vehicles/_components/vehicle-card'
import CategoryFilters from '../admin/vehicles/_components/category-filters'

interface IVehiclesPageProps {
  searchParams: { category: string };
}

async function VehiclesPage({ searchParams }: IVehiclesPageProps) {
  // Log searchParams to verify its structure
  console.log('Search Params:', searchParams)

  // Ensure `searchParams` is properly awaited or passed with the correct structure
  const { category } = searchParams || {};  // Extract category from searchParams safely

  const { success, data } = await getAllVehicles({ category });  // Pass category filter to the server action

  if (!success) {
    return <Alert message="Failed to fetch vehicles" type="error" />;
  }

  return (
    <div>
      <PageTitle title="Vehicles" />
      <div className="flex justify-between items-center mt-2">
        <CategoryFilters /> {/* Filters UI */}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((vehicle: any) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>

      {Object.keys(searchParams).length > 0 && data.length == 0 && (
        <Alert message="No vehicles found in selected category" type="info" />
      )}
    </div>
  );
}

export default VehiclesPage;
