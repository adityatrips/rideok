import FareCalculation from "@/models/FareCalculation.js";

import connectToDb from "@/utils/db";

export const POST = async (req) => {
	connectToDb();

	try {
		const {
			// carType,
			// weather,
			// roadType,
			distance,
			// timeTaken,
			carAverage,
			numPassengers,
			fuelPrice,
			// trafficCondition,
			baseFare,
		} = await req.json();

		// if (!distance || !carAverage || !numPassengers || !fuelPrice || !baseFare) {
		// 	return Response.json(
		// 		{ message: "All fields are required." },
		// 		{ status: 400 }
		// 	);
		// }

		const totalFuelCost = (distance / carAverage) * fuelPrice;

		const driverFuelContribution = totalFuelCost * 0.25;

		const passengerFuelContribution = totalFuelCost - driverFuelContribution;

		const totalFare = baseFare + totalFuelCost;

		const driverFare = driverFuelContribution;

		const passengerFare =
			baseFare / numPassengers + passengerFuelContribution / numPassengers;
		console.log(`totalFuelCost             : ${totalFuelCost}`);
		console.log(`driverFuelContribution    : ${driverFuelContribution}`);
		console.log(`passengerFuelContribution : ${passengerFuelContribution}`);
		console.log(`totalFare                 : ${totalFare}`);
		console.log(`driverFare                : ${driverFare}`);

		const fareCalculation = new FareCalculation({
			// carType,
			// weather,
			// roadType,
			distance,
			// timeTaken,
			carAverage,
			numPassengers,
			fuelPrice,
			// trafficCondition,
			baseFare,
			totalFare,
			driverFare,
			passengerFare,
		});

		await fareCalculation.save();

		return Response.json({ ...fareCalculation._doc }, { status: 201 });
	} catch (error) {
		console.error(error);
		return Response.json(
			{ message: "Internal server error." },
			{ status: 500 }
		);
	}
};
