import React from 'react'

function Hero() {
    return (
        <div className='bg-primary grid grid-cols-1 lg:grid-cols-2 items-center min-h-[90vh] px-20'>
            <div className="cols-span-1 flex flex-col gap-1">
                <div className="flex gap-5 text-3xl lg:text-4xl">
                    <span className="font-bold text-secondary">
                        SHAIKH
                    </span>
                    <span className="font-bold text-tertiary">
                        VEHICLE
                    </span>
                    <span className="font-bold text-quaternary">
                        RENTALS
                    </span>
                </div>
                <p className="text-white text-sm">
                    Enjoy the best Vehicle Rental Services in the city with Shaikh Vehicle Rentals. We offer the best prices and the best vehicles for your needs. Contact us today to get started. We are available 24/7.
                </p>
            </div>
            <div className="col-span-1 flex justify-center">
                <img
                 className="w-[400px] h-[400px] object-cover" src="/hero.png" />
            </div>

            Hero</div>
    )
}

export default Hero