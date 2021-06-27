import React from "react";
import { useSelector } from "react-redux";
import AddTodoForm from "../Form/AddTodoForm";
import CreateProjectForm from "../Form/CreateProjectForm";
import EditProjectForm from "../Form/EditProjectForm";
import EditTodoForm from "../Form/EditTodoForm";
import Labels from "../Form/Labels";
import SearchMembers from "../SearchMembers/SearchMembers";

const ModalManager = () => {
	const modalLookup = {
		CreateProjectForm,
		EditProjectForm,
		AddTodoForm,
		EditTodoForm,
		SearchMembers,
		Labels,
	};
	const currentModal = useSelector(state => state.modals);
	let renderedModal;

	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];
		renderedModal = <ModalComponent {...modalProps} />;
	}

	return <span>{renderedModal}</span>;
};

export default ModalManager;
