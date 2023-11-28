import {Outlet} from "react-router-dom";

const RootLayout = () => {
	return (
		<section className="max-w-7xl mx-auto">
			<Outlet />
		</section>
	)
}

export default RootLayout;
