import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { addMembers } from "../../actions/tasks";
import ModalWrapper from "../Modal/ModalWrapper";
import "./SearchMembers.css";

const SearchMembers = () => {
	const dispatch = useDispatch();
	const { authData } = useSelector(state => state.auth);
	const { task, loading } = useSelector(state => state.tasks);

	var timer;
	var val;
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [disabled, setDisabled] = useState(true);

	const handleChange = e => {
		clearTimeout(timer);
		if (e.target.value.trim() == "" && e.keycode === 8) {
			// setSelectedUsers([...selectedUsers.slice(-1, 1)]);
			return;
		}
		timer = setTimeout(() => {
			val = e.target.value.trim();

			if (val == "") {
				setUsers([]);
			} else {
				searchUsers(val);
			}
		}, 1000);
	};

	const searchUsers = async searchTerm => {
		try {
			const { data } = await axios.get(
				"http://localhost:5000/api/user/search",
				{
					params: { search: searchTerm },
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("profile")).token
						}`,
					},
				}
			);

			const results = data.filter(user => user.email !== authData.result.email);

			setUsers(results);
		} catch (error) {}
	};

	const userSelected = user => {
		setSelectedUsers([...selectedUsers, user]);
		setUsers([]);
		setDisabled(false);
		document.querySelector("#userSearchTextBox").value = "";
	};

	return (
		<ModalWrapper header='Add Members'>
			<div className='membersPageContainer'>
				<div className='titleBar'>
					<label htmlFor='userSearchTextBox'>Users:</label>
					<div id='selectedUsers'>
						{selectedUsers.map(user => {
							return (
								<span key={user._id} className='selectedUser'>
									{user.name}
									<button
										class='deleteSelectedUser'
										onClick={() => {
											setSelectedUsers(
												selectedUsers.filter(item => item._id !== user._id)
											);
										}}>
										<i class='fas fa-times'></i>
									</button>
								</span>
							);
						})}
						<input
							type='text'
							name=''
							id='userSearchTextBox'
							placeholder='Type the name of person'
							onChange={e => handleChange(e)}
						/>
					</div>
				</div>
				<div className='resultsContainer'>
					{users.map(user => {
						var found = false;
						for (var i = 0; i < task?.members.length; i++) {
							if (task?.members[i].email == user?.email) {
								found = true;
								break;
							}
						}
						return user.email == authData.result.email ||
							selectedUsers.some(u => u._id == user._id) ||
							found ? null : (
							<div
								className='user'
								key={user._id}
								onClick={() => userSelected(user)}>
								<div className='userImageContainer'>
									<img src={user?.photoUrl} />
								</div>
								<div className='userDetailsContainer'>
									<div className='header'>
										<span href='#'>{user.name}</span>
										<span className='username'>{user.email}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<Button
					color='teal'
					style={{ margin: "10px auto", borderRadius: "40px" }}
					content='Add'
					disabled={disabled}
					onClick={() => dispatch(addMembers(task._id, selectedUsers))}
				/>
			</div>
		</ModalWrapper>
	);
};

export default SearchMembers;
