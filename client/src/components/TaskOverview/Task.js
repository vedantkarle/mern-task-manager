import React from 'react'
import { Link } from 'react-router-dom'
import { Card,Progress,Dropdown,Icon,Button, Header } from 'semantic-ui-react'
import './Task.css'

const Task = () => {
    return (
            <Card
                style={{width:"100%",borderRadius:"10px"}}
                inverted
            >
                <Card.Content className="progress">  
                    <Card.Header>
                        <div className="cardHeader">
                            <Header as={Link} to={`tasks/123`}>Design Signup Page</Header>
                            <div className="cardHeader-right">
                                <p style={{fontSize:"14px"}}>Created at 18/06/2021 12:09 AM</p>
                                <Dropdown className='icon' icon="ellipsis vertical">
                                <Dropdown.Menu className='left'>
                                <Dropdown.Item>
                                    <Icon name='edit outline' />
                                    <span className='text'>Edit</span>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Icon name='add circle' />
                                    <span className='text'>Add Members</span>
                                </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Meta>
                        Matthew is a musician living in Nashville.
                    </Card.Meta>
                    <Button icon labelPosition='left' floated='right'>
                        <Icon name='add' />
                        Add Member
                    </Button>
                    <Card.Description>
                        <p>Task Progress</p>
                        <Progress percent={40} progress size="small" color="blue"/>
                    </Card.Description>
                </Card.Content>
            </Card>
    )
}

export default Task
