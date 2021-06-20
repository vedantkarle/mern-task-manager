import React,{useState} from 'react'
import { Button, Modal,Segment,Header,FormField,Label} from 'semantic-ui-react'
import FloatingButton from '../FloatingButton'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import TextInput from './TextInput';
import DateInput from './DateInput';

const CreateProjectForm = () => {
    const [open, setOpen] = useState(false)

    const initialValues = {
      projectName:'',
      description:'',
      startDate: '',
      endDate: '',
    }

    const validationSchema = Yup.object({
      projectName:Yup.string().required('You must provide a project name'),
      description:Yup.string().required('You must provide a description'),
      startDate: Yup.date().required("You must provide a start date"),
      endDate: Yup.date().required("You must provide a end date"),
    });

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<FloatingButton onClick={() =>setOpen(true)}/>}
    >
      <Modal.Content image>
        <Segment style={{width:"100%"}} clearing>
          <Header content="Add Project" />
          <Formik initialValues={initialValues} onSubmit={values=>console.log(values)} validationSchema={validationSchema}>
              {({isSubmitting,dirty,isValid})=>(
                <Form className="ui form">
                <TextInput name="projectName" placeholder="Enter project name" label="Project Name"/>
                <TextInput name="description" placeholder="Enter project description" label="Project Description"/>
                <div style={{display:"flex",justifyContent:"start"}}>
                  <DateInput name="startDate" label="Start Date" timeFormat='HH:mm' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm a"/>
                  <DateInput name="endDate" label="End Date" timeFormat='HH:mm' showTimeSelect timeCaption="time" dateFormat="MMMM d, yyyy h:mm a"/>
                </div>
                <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} type="submit" floated='right' positive content="Create" />
                <Button disabled={isSubmitting} type="submit" floated='right' color='red' content="Cancel" />
              </Form>
              )}
          </Formik>
        </Segment>
      </Modal.Content>
    </Modal>
    )
}

export default CreateProjectForm
