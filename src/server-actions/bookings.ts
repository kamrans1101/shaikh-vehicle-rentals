'use server'

import { IBooking } from "@/interfaces"
import BookingModel from "@/models/booking-model"
import VehicleModel from "@/models/vehicle-models"

export const checkVehicleAvailability = async({fromDateAndTime, toDateAndTime, vehicleId} : {
    fromDateAndTime: string,
    toDateAndTime: string,
    vehicleId: string
}) => {
    try {
        return {
            success: true,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const saveNewBooking = async (payload: Partial<IBooking>) => {
    try {
        const booking = await BookingModel.create(payload);
        await VehicleModel.findByIdAndUpdate(payload.vehicle, {
            'status': 'in-ride'
        })

        return {
            success: true,
            data: JSON.parse(JSON.stringify(booking))
        }

    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            messsage: error.message
        }
    }
}