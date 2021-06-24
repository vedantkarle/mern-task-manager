import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import ModalWrapper from "../Modal/ModalWrapper";
import "./SearchMembers.css";

const SearchMembers = () => {
	const { authData } = useSelector(state => state.auth);

	var timer;
	var val;
	var selectedUsers = [];
	const [users, setUsers] = useState([]);

	const handleChange = e => {
		clearTimeout(timer);
		if (e.target.value.trim() == "" && e.keycode == 8) {
			return;
		}
		timer = setTimeout(() => {
			val = e.target.value.trim();

			if (val == "") {
				document.querySelector(".resultsContainer").innerHTML = "";
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

			// outputResults(data, document.querySelector(".resultsContainer"));
			setUsers(data);
		} catch (error) {}
	};

	const outputResults = (results, container) => {
		container.innerHTML = "";
		results.forEach(result => {
			if (result.name == authData.result.name) {
				return;
			}
			var html = createUserHtml(result);
			container.append(html);
		});
	};

	function createUserHtml(userData) {
		let name = userData.name;

		return (
			<div className='user'>
				<div className='userImageContainer'>
					<img src={userData.profilePic != null ? userData.profilePic : null} />
				</div>
				<div className='userDetailsContainer'>
					<div className='header'>
						<a href='/profile/${userData.username}'>{name}</a>
						<span className='username'>{userData.email}</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<ModalWrapper header='Add Members'>
			<div className='membersPageContainer'>
				<div className='titleBar'>
					<label for='userSearchTextBox'>Users:</label>
					<div id='selectedUsers'>
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
						return user.name == authData.result.name ? null : (
							<div className='user' key={user._id}>
								<div className='userImageContainer'>
									<img src={user.profilePic != null ? user.profilePic : null} />
								</div>
								<div className='userDetailsContainer'>
									<div className='header'>
										<a href='/profile/${userData.username}'>{user.name}</a>
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
					content='Add member'
					disabled
				/>
			</div>
		</ModalWrapper>
	);
};

export default SearchMembers;
