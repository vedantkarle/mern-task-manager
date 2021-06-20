import React from 'react'
import { Label,Icon,Tab } from 'semantic-ui-react'
import { format } from 'date-fns'
import Tasks from '../../TaskOverview/Tasks'

const Today = () => {

    const panes = [
    {
        menuItem: 'In Progress',
        render: () => <Tab.Pane attached={false} as="div"><Tasks completed={false}/></Tab.Pane>,
    },
    {
        menuItem: 'Completed',
        render: () => <Tab.Pane attached={false} as="div"><Tasks completed={true}/></Tab.Pane>,
    },
  ]

    return (
        <div>
            <Label>
                <Icon name='calendar alternate' /> Today {format(new Date(),'MMMM d, yyyy h:mm a')}
            </Label>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
    )
}

export default Today
