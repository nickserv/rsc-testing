import "server-only";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<p>layout</p>
				{children}
			</body>
		</html>
	);
}
