"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const IndexPage = () => {
	const [carType, setCarType] = React.useState("");
	const [weather, setWeather] = React.useState("");
	const [roadType, setRoadType] = React.useState("");
	const [distance, setDistance] = React.useState("");
	const [carAverage, setCarAverage] = React.useState("");
	const [numPassengers, setNumPassengers] = React.useState("");
	const [feedback, setFeedback] = React.useState("");

	const [fareResultModal, setFareResultModal] = React.useState(false);
	const [fareResult, setFareResult] = React.useState(null);

	const handleCalculateFare = async () => {
		console.log("CarType        : ", carType);
		console.log("Weather        : ", weather);
		console.log("RoadType       : ", roadType);
		console.log("Distance       : ", distance);
		console.log("CarAverage     : ", carAverage);
		console.log("NumPassengers  : ", numPassengers);

		try {
			const response = await axios.post("/api/fare", {
				distance,
				carAverage,
				numPassengers,
				fuelPrice: 100,
				baseFare: 0,
			});
			setFareResult(response.data);
			setFareResultModal(true);
		} catch (error) {
			console.error(error);
			setFareResultModal(false);
		}
	};

	const handleFeedback = async () => {
		console.log("Feedback       : ", feedback);

		try {
			await axios.post("/api/feedback", {
				feedback,
			});
			toast("Feedback submitted successfully");
		} catch (error) {
			toast("Failed to submit feedback");
			console.error(error);
		}
	};

	return (
		<main className="container mx-auto flex flex-col justify-center items-center min-h-screen w-full">
			<Card>
				<CardContent className="flex flex-col gap-3">
					<CardHeader className="flex items-center justify-center">
						<Image
							src="/logo.jpg"
							height={80}
							width={160}
							alt="RideOk Logo"
						/>
						<h1 className="text-xl font-bold uppercase text-center">
							Fare calculation demo for the RideOk app
						</h1>
					</CardHeader>
					<Select
						onValueChange={(value) => {
							setCarType(value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Car Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="sedan">Sedan</SelectItem>
							<SelectItem value="suv">SUV</SelectItem>
							<SelectItem value="truck">Truck</SelectItem>
							<SelectItem value="van">Van</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(value) => {
							setWeather(value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Weather" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="sunny">Sedan</SelectItem>
							<SelectItem value="rainy">Rainy</SelectItem>
							<SelectItem value="cloudy">Cloudy</SelectItem>
							<SelectItem value="snowy">Snowy</SelectItem>
						</SelectContent>
					</Select>
					<Select
						onValueChange={(value) => {
							setRoadType(value);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="Road Type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="highway">Highway</SelectItem>
							<SelectItem value="city">City</SelectItem>
							<SelectItem value="offroad">Off-road</SelectItem>
						</SelectContent>
					</Select>
					<Input
						value={distance}
						onChange={(e) => setDistance(e.target.value)}
						placeholder="Distance (km)"
						required
					/>
					<Input
						value={carAverage}
						onChange={(e) => setCarAverage(e.target.value)}
						placeholder="Car Average (kmpl)"
						required
					/>
					<Input
						value={numPassengers}
						onChange={(e) => setNumPassengers(e.target.value)}
						placeholder="Number of passengers"
						required
					/>
				</CardContent>
				<CardFooter className="flex gap-3 md:flex-row flex-col">
					<Dialog
						onOpenChange={(value) => {
							setFareResultModal(value);
						}}
						open={fareResultModal}
					>
						<DialogTrigger asChild>
							<Button
								className="w-full"
								onClick={handleCalculateFare}
							>
								Calculate Fare
							</Button>
						</DialogTrigger>
						{fareResult && (
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-xl font-bold uppercase text-left">
										Calculated Fare
									</DialogTitle>
								</DialogHeader>
								<Table>
									<TableCaption>Fare calculation results</TableCaption>
									<TableHeader>
										<TableHead>TotalFare</TableHead>
										<TableHead>Driver Fare</TableHead>
										<TableHead>Passenger Fare</TableHead>
										<TableHead>Driver Payout</TableHead>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell>{fareResult.totalFare.toFixed(2)}</TableCell>
											<TableCell>{fareResult.driverFare.toFixed(2)}</TableCell>
											<TableCell>
												{fareResult.passengerFare.toFixed(2)}
											</TableCell>
											<TableCell>
												{(fareResult.passengerFare * numPassengers).toFixed(2)}
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</DialogContent>
						)}
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								className="w-full"
								variant="outline"
							>
								Give Feedback
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle className="text-xl font-bold uppercase text-left">
									Your feedback matters.
								</DialogTitle>
								<DialogDescription>
									Please provide your feedback to help us improve the
									application.
								</DialogDescription>
							</DialogHeader>
							<section className="flex flex-col gap-3">
								<Textarea
									value={feedback}
									onChange={(e) => setFeedback(e.target.value)}
									placeholder="Feedback"
									required
								/>
							</section>
							<DialogFooter>
								<Button
									onClick={handleFeedback}
									className="w-full"
								>
									Submit Feedback
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</CardFooter>
			</Card>
		</main>
	);
};

export default IndexPage;
