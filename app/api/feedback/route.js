import Feedback from "@/models/Feedback.js";

import connectToDb from "@/utils/db";

export const POST = async (req) => {
	connectToDb();

	const { feedback } = await req.json();

	// try {
	const newFeedback = new Feedback({ feedback });
	await newFeedback.save();

	return Response.json(
		{ message: "Feedback submitted successfully!" },
		{ status: 201 }
	);
	// } catch (error) {
	// 	console.error(error);
	// 	return Response.json(
	// 		{ message: "Error submitting feedback." },
	// 		{ status: 500 }
	// 	);
	// }
};
