export const NotFound = ({ message }) => {
	return (
		<div className="container">
			<div className="content">
				<h1>404 - Not found</h1>
				<p>{message || "The resource you were looking for was not found."}</p>
			</div>
		</div>
	);
};
