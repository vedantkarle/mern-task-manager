import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Card, Divider, Image } from "semantic-ui-react";
import Home from "../../screens/Home";
import Login from "../../screens/Login";
import CreateProjectForm from "../Form/CreateProjectForm";
import TaskDetail from "../TaskOverview/TaskDetail";
import "./Sidebar.css";

const Sidebar = () => {
	const [active, setActive] = useState("today");

	const isAuth = true;

	return (
		<div className='main'>
			{isAuth ? (
				<Router>
					<div className='sidebar'>
						<ul>
							<li>
								<Link
									name='today'
									to='/'
									className={active === "today" ? "active" : ""}
									onClick={() => setActive("today")}>
									<i className='far fa-calendar-check'></i>
									<span>TODAY</span>
								</Link>
							</li>
							<li>
								<Link
									name='projects'
									to='/projects'
									className={active === "projects" ? "active" : ""}
									onClick={() => setActive("projects")}>
									<i className='far fa-list-alt'></i>
									<span>PROJECTS</span>
								</Link>
							</li>
							<li>
								<Link
									name='chats'
									to='/chats'
									className={active === "chats" ? "active" : ""}
									onClick={() => setActive("chats")}>
									<i className='far fa-comments'></i>
									<span>CHATS</span>
								</Link>
							</li>
							<li>
								<Link
									name='reports'
									to='/reports'
									className={active === "reports" ? "active" : ""}
									onClick={() => setActive("reports")}>
									<i className='far fa-chart-bar'></i>
									<span>REPORTS</span>
								</Link>
							</li>
						</ul>
					</div>
					<div className='page-content'>
						<div className='main-page-content'>
							<Route path='/' component={Home} exact />
							<Route path='/projects' component={Home} exact />
							<Route path='/chats' component={Home} exact />
							<Route path='/reports' component={Home} exact />
							<Route path='/tasks/:id' component={TaskDetail} exact />
							<CreateProjectForm />
						</div>
					</div>
					<div>
						<Card style={{ borderRadius: "10px", margin: "10px" }}>
							<Card.Content>
								<Card.Header
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Image
										size='small'
										src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
										circular
									/>
									<h3>Hello,Vedant</h3>
								</Card.Header>
								<Divider />
								<Card.Description>
									Matthew is a musician living in Nashville.
								</Card.Description>
							</Card.Content>
							{/* <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Friends
                </a>
              </Card.Content> */}
						</Card>
					</div>
				</Router>
			) : (
				<Login />
			)}
		</div>
	);
};

export default Sidebar;
