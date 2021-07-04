import React from "react";
import { Button as Btn } from "react-floating-action-button";
import { useDispatch } from "react-redux";
import { openModal } from "../reducers/modal";

const FloatingButton = () => {
	const dispatch = useDispatch();

	return (
		<div style={{ position: "fixed", top: "85%", right: "2%", zIndex: "2" }}>
			<Btn
				tooltip='Add a project'
				icon='fas fa-plus'
				rotate={false}
				onClick={() => dispatch(openModal({ modalType: "CreateProjectForm" }))}
			/>
		</div>
	);
};

export default FloatingButton;
