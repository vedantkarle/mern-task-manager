import React from 'react'
import { Header,Checkbox,Segment,Feed,Button,Icon,Message,Label } from 'semantic-ui-react'
import './Task.css'

const TaskDetail = ({name,description,subtasks,members}) => {
    return (
        <div>
           <Message>
                <div className="task-header">
                    <Header as='h1'>Design Signup Page : </Header>
                    <div>
                    <Label color='blue' icon>
                        Created at 18/06/2021 at 9:06 AM
                    </Label>
                    <Label color='yellow' icon>
                        Deadline 23/06/2021 at 9:00 AM
                    </Label>
                    </div>
                </div>
                <p>
                    Making necessary updates and changes in the script for it to be able to read and write from/to the database.Making necessary updates and changes in the script for it to be able to read and write from/to the database.Making necessary updates and changes in the script for it to be able to read and write from/to the database.
                </p>
           </Message>
            <div className="task-content">
            <div className="todos">
                <Segment.Group>
                    <Segment><h2>Todos:</h2></Segment>
                        <Segment.Group>
                            <Segment>
                                <Checkbox label='Make my profile visible akjh kjjkk jdkjs lkn klk k sdksndksndk sKdnsdns KD njdls kdlks dlkJSDlk SJDLK lksd ks  lkjlsdj lsjdls dls jdlSKJD kk sdlkkdSdksd sJD ksjdlksJDlsKJD' />
                                <div className="todo-buttons">
                                    <div></div>
                                    <div>
                                    <Button circular icon='edit' color='yellow'/>
                                    <Button circular icon='trash' color='red'/>
                                    </div>
                                </div>
                            </Segment>
                            <Segment>
                                <Checkbox label='Make my profile visible akjh kjjkk jdkjs lkn klk k sdksndksndk sKdnsdns KD njdls kdlks dlkJSDlk SJDLK lksd ks  lkjlsdj lsjdls dls jdlSKJD kk sdlkkdSdksd sJD ksjdlksJDlsKJD' />
                                <div className="todo-buttons">
                                    <div></div>
                                    <div>
                                    <Button circular icon='edit' color='yellow'/>
                                    <Button circular icon='trash' color='red'/>
                                    </div>
                                </div>
                            </Segment>
                            <Segment>
                                <Checkbox label='Make my profile visible akjh kjjkk jdkjs lkn klk k sdksndksndk sKdnsdns KD njdls kdlks dlkJSDlk SJDLK lksd ks  lkjlsdj lsjdls dls jdlSKJD kk sdlkkdSdksd sJD ksjdlksJDlsKJD' />
                                <div className="todo-buttons">
                                    <div></div>
                                    <div>
                                    <Button circular icon='edit' color='yellow'/>
                                    <Button circular icon='trash' color='red'/>
                                    </div>
                                </div>
                            </Segment>
                            <Segment>
                                <Checkbox label='Make my profile visible akjh kjjkk jdkjs lkn klk k sdksndksndk sKdnsdns KD njdls kdlks dlkJSDlk SJDLK lksd ks  lkjlsdj lsjdls dls jdlSKJD kk sdlkkdSdksd sJD ksjdlksJDlsKJD' />
                                <div className="todo-buttons">
                                    <div></div>
                                    <div>
                                    <Button circular icon='edit' color='yellow'/>
                                    <Button circular icon='trash' color='red'/>
                                    </div>
                                </div>
                            </Segment>
                        </Segment.Group>
                    <Segment>
                        <Button icon labelPosition='left' style={{width:"140px"}}>
                        <Icon name='add' />
                        Add Todo
                    </Button>
                    </Segment>
                </Segment.Group>
            </div>
            <div className="members">
            <Segment color='red'>
                <Header as="h4">Members</Header>
                <Feed>
                    <Feed.Event
                    image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
                    content='You added Elliot Fu to the group Coworkers'
                    />
                      <Feed.Event
                    image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
                    content='You added Elliot Fu to the group Coworkers'
                    />
                     <Feed.Event
                    image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
                    content='You added Elliot Fu to the group Coworkers'
                    />
                </Feed>
                <Button icon labelPosition='left'>
                    <Icon name='add' />
                    Add Member
                </Button>
            </Segment>
            </div>
            </div>
        </div>
    )
}

export default TaskDetail
