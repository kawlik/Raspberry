export default function (props: { online: boolean }) {
	// component logic

	// component layout
	return (
		<header class="navbar bg-base-100 justify-center shadow sticky top-0 z-50">
			<a class="btn btn-ghost relative px-8">
				<span class="text-xl">Dashboard</span>
				<span
					class="absolute badge badge-xs bottom-0 translate-y-1 text-white"
					classList={{
						"badge-success": props.online === true,
						"badge-warning": props.online === false,
					}}
				>
					status: {props.online ? "online" : "offline"}
				</span>
			</a>
		</header>
	);
}
