type HeaderProps = {
	title: string;
	subtitle: string;
}

const Header = ({title, subtitle}: HeaderProps) => {
	return (
		<div>
			<h1 className="font-extrabold text-[#222328] text-[32px]">
				{title}
			</h1>
			<p className="mt-2 text-[#666e75] text-base max-w-[500px]">
				{subtitle}
			</p>
		</div>
	)
}

export default Header;
