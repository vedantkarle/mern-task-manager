import React from "react";
import { Grid, Label } from "semantic-ui-react";
import ModalWrapper from "../Modal/ModalWrapper";

const Labels = () => {
	return (
		<ModalWrapper size='tiny' header='Select Label'>
			<Grid centered columns='equal' divided>
				<Grid.Row centered>
					<Grid.Column textAlign='center'>
						<Label color='green'>Completed</Label>
					</Grid.Column>
					<Grid.Column textAlign='center'>
						<Label color='green'>Completed</Label>
					</Grid.Column>
					<Grid.Column textAlign='center'>
						<Label color='green'>Completed</Label>
					</Grid.Column>
					<Grid.Column textAlign='center'>
						<Label color='green'>Completed</Label>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</ModalWrapper>
	);
};

export default Labels;
