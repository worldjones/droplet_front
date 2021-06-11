import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useEffect, useState } from "react";
import { API_MAIN } from "../../utils/api";

dayjs.extend(relativeTime);

export const AdminDashboard = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("admin/users");
			setUsers(response.data);
		};
		doAsynchronousCall();
	}, []);

	return (
		<div className="container">
			<div className="content">
				<h1>Dashboard</h1>
				<section>
					<h2>Users</h2>
					<p>Displaying all ({users.length}) users.</p>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Username</th>
								<th>Roles</th>
								<th>Last updated</th>
								<th>Created at</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr>
									<td>{user.username}</td>
									<td>{user.roles.join(", ")}</td>
									<td>{user.updatedAt ? dayjs(parseInt(user.updatedAt)).from() : "Never"}</td>
									<td>{dayjs(parseInt(user.createdAt)).from()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</div>
		</div>
	);
};
