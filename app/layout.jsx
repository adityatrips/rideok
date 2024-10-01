import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
	title: "RideOk - A ride sharing app",
	description:
		"RideOk is a ride sharing app that connects drivers and passengers in a close community such as your society or workplace.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<ToastContainer theme="dark" />
				<main className="min-h-[calc(100vh-5rem)]">{children}</main>
			</body>
		</html>
	);
}
