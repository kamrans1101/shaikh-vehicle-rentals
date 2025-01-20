'use client'

import { getDateTimeFormat } from '@/helpers/date-time-formats'
import { IVehicle } from '@/interfaces'
import { checkVehicleAvailability, saveNewBooking } from '@/server-actions/bookings'
import { getStripePaymentintent } from '@/server-actions/payments'
import { Button, Input } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreditCardForm from './credit-card-form'
import { useAuth } from '@clerk/nextjs'
import { IUsersGlobalStore, usersGlobalStore } from '@/store/user-store'

function VehicleInfo({ vehicle }: {
    vehicle: IVehicle
}) {
    const [fromDateAndTime, setFromDateAndTime] = React.useState<string>(
        ""
    )
    const [toDateAndTime, setToDateAndTime] = React.useState<string>(
        ""
    )

    const [isAvailable, setIsAvailable] = React.useState<boolean>()

    const [isLoading, setIsLoading] = React.useState<boolean>()
    const [paymentIntentId, setPaymentIntentId] = React.useState<string>(
        ""
    )

    const [openCreditCardForm, setOpenCreditCardForm] = React.useState<boolean>(false)
    const {loggedinUserData} = usersGlobalStore() as IUsersGlobalStore

    const checkAvailabilityHandler = async () => {
        try {
            setIsLoading(true)
            const { success } = await checkVehicleAvailability({
                fromDateAndTime,
                toDateAndTime,
                vehicleId: vehicle._id
            })
            if (success) {
                setIsAvailable(true)
            } else {
                setIsAvailable(false)
            }
        } catch (error: any) {
            message.error(error.message)
            setIsAvailable(false)
        } finally {
            setIsLoading(false)
        }
    }

    const onClear = () => {
        setFromDateAndTime("")
        setToDateAndTime("")
        setIsAvailable(false)
    }

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
    const options = {
        clientSecret: paymentIntentId
    }

    const totalHours = dayjs(toDateAndTime).diff(dayjs(fromDateAndTime), "hour")
    const totalAmount = totalHours * vehicle.rentPerDay;

    const onPaymentSucess = async(paymentId: string) => {
        try {
            const { success } = await saveNewBooking({
                vehicle: vehicle._id,
                user: loggedinUserData?.id,
                fromDateAndTime,
                toDateAndTime,
                totalAmount,
                paymentId

            })
            // save book details
            // redirect to user books page
        } catch (error: any) {
            message.error(error.message)
        }
    }

    const getStripePaymentIntentHandler = async () => {
        try {
            setIsLoading(true)
            const { success, data } = await getStripePaymentintent(totalAmount)
            console.log(success)
            console.log(data)
            if (success) {
                setPaymentIntentId(data.client_secret);
                setOpenCreditCardForm(true)
            } else {
                message.error(error.message)
            }

        } catch (error: any) {
            message.error(error.any)
        } finally {
            setIsLoading(false)
        }
    }



    const renderVehicleProperty = (label: string, value: string) => {
        return (
            <div className='flex justify-between text-sm'>
                <span className='font-bold'>{label}</span>
                <span>{value}</span>
            </div>
        )
    }
    return (
        <div className="p-5 border border-gray-300 border-solid flex flex-col gap-2">
            {renderVehicleProperty('Brand', vehicle.brand)}
            {renderVehicleProperty('Model', vehicle.model)}
            {renderVehicleProperty('Category', vehicle.category)}
            {renderVehicleProperty('Rent Per Hour', vehicle.rentPerDay)}
            {renderVehicleProperty('Added On', getDateTimeFormat(vehicle.createdAt))}

            <hr className="border border-gray-300 border-solid mt-2" />


            <div className="flex flex-col gap-2">
                <div>
                    <label htmlFor="fromDateAndTime" className="text-sm">
                        From
                    </label>
                    <Input
                        type="datetime-local"
                        id="fromDateAndTime"
                        onChange={(e: any) => setFromDateAndTime(e.target.value)}
                        value={fromDateAndTime}
                        disabled={isAvailable}
                    />
                </div>
                <div>
                    <label htmlFor="fromDateAndTime" className="text-sm">
                        To
                    </label>
                    <Input
                        type="datetime-local"
                        id="toDateAndTime"
                        onChange={(e: any) => setToDateAndTime(e.target.value)}
                        value={toDateAndTime}
                        disabled={isAvailable}
                    />
                </div>
                {!isAvailable &&
                    <Button type="primary" className='mt-5' disabled={!fromDateAndTime || !toDateAndTime} onClick={checkAvailabilityHandler} loading={isLoading}>
                        Check Availability
                    </Button>
                }

                {isAvailable && (
                    <div className="flex flex-col gap-2 mt-3">
                        {renderVehicleProperty("Total Hours", totalHours.toString())}
                        {renderVehicleProperty("Total Amount", `$ ${totalAmount}`)}

                        <div className="grid grid-cols-2 gap-5">
                            <Button onClick={onClear}>Clear</Button>
                            <Button type="primary" onClick={getStripePaymentIntentHandler} loading={isLoading}>Book</Button>

                        </div>
                    </div>
                )}
            </div>
            {openCreditCardForm && <Elements stripe={stripePromise} options={options}>
                <CreditCardForm openCreditCardForm={openCreditCardForm} setOpenCreditCardForm={setOpenCreditCardForm} onPaymentSuccess={onPaymentSucess}/>
            </Elements>
            }
        </div>
    )
}

export default VehicleInfo