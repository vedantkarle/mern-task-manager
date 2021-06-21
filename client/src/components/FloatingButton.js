import React from "react";
import { Button as Btn } from "react-floating-action-button";
import { useDispatch } from "react-redux";
import { openModal } from "../reducers/modal";

const FloatingButton = () => {
	const dispatch = useDispatch();

	return (
		<div
			style={{ position: "fixed", top: "85%", left: "76%", zIndex: "999999" }}>
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
