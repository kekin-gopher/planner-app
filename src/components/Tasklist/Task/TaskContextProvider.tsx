import React, { useState } from 'react';
import TaskContext, { TaskContextType } from './task-context';
import { Tag, PersonaInitialsColor, TaskComment } from '../../../constants';
import { IFacepilePersona } from '@fluentui/react';

const TaskContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const tskCommntsArr: TaskComment[] = [
        {
            id: '1',
            commentText: 'Adding to the in progress',
            personaProps: { text: 'Kekin Chheda', imageInitials: 'KC' },
            commentDate: new Date('December 17, 2022 03:24:00'),
            initialsColor: PersonaInitialsColor.green
        },
        {
            id: '2',
            commentText: 'Needs confirmation about UI wireframes',
            personaProps: { text: 'Kekin Chheda', imageInitials: 'KC' },
            commentDate: new Date('December 23, 2022 03:24:00'),
            initialsColor: PersonaInitialsColor.blue
        },
        {
            id: '3',
            commentText: 'Needs confirmation about DoD',
            personaProps: { text: 'Kekin Chheda', imageInitials: 'KC' },
            commentDate: new Date('February 2, 2023 03:30:00'),
            initialsColor: PersonaInitialsColor.lightBlue
        }
    ];

    const taskMembers: IFacepilePersona[] = [
        {imageInitials: 'KC', personaName: 'Kekin Chheda', initialsColor: PersonaInitialsColor.darkGreen}
    ];

    const [taskName, setTaskName] = useState("Some random dummy name");
    const [tags, setTags] = useState<Tag[]>([]);
    const [taskComments, setTaskComments] = useState<TaskComment[]>(tskCommntsArr);
    const [taskStatus, setTaskStatus] = useState("Not Started");
    const [taskPriority, setTaskPriority] = useState("Low");
    const [members, setMembers] = useState<IFacepilePersona[]>([]);

    function addTagHandler(tag: Tag) {
        let newTags: Tag[] = [];
        if (tags.findIndex(tg => tg.color === tag.color) === -1) {
            newTags = [...tags, tag];
            setTags(newTags);
        } else {
            const tgVal = tags.find(tg => tg.color === tag.color);
            const tempTags = tags.filter(tg => tg.color !== tag.color);
            if (tgVal?.name !== tag.name) {
                newTags = [...tempTags, tag];
                setTags(newTags);
            }
        }
    }

    function removeTagHandler(tag: Tag) {
        setTags(tags.filter(tg => tg.name !== tag.name));
    }

    function taskNameChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskName(e.target.value);
    }

    function addCommentHandler(comment: string) {
        const currentUser = 'Kekin Chheda';
        const user = taskComments.find(comnt => comnt.personaProps.text === currentUser);

        let initialsColor: PersonaInitialsColor;

        if (user) {
            initialsColor = user.initialsColor;
        } else {
            let rand = Math.ceil(Math.random() * 1000);
            initialsColor = rand % 25;
        }

        const commentObj: TaskComment = {
            id: `${Math.random()}`,
            commentText: comment,
            personaProps: {imageInitials: 'KC', text: currentUser},
            commentDate: new Date(),
            initialsColor: initialsColor
        };

        setTaskComments(prevCommnts => [...prevCommnts, commentObj]);
    }

    function taskStatusChangeHandler(status: string) {
        setTaskStatus(status);
    }

    function taskPriorityChangeHandler(priority: string) {
        setTaskPriority(priority);
    }

    function addMemberHandler(member: IFacepilePersona) {
        console.log('addMemberHandler called...');
        setMembers([...members, member]);
    }

    function removeMemberHandler(member: IFacepilePersona) {
        console.log('removeMemberHandler called...');
        setMembers(members.filter(m => m.personaName !== member.personaName));
    }

    const taskContextValue: TaskContextType = {
        name: taskName,
        members: taskMembers,
        tags: tags,
        taskComments: taskComments,
        taskStatus: taskStatus,
        taskPriority: taskPriority,
        onAddTag: addTagHandler,
        onRemoveTag: removeTagHandler,
        onTaskNameChange: taskNameChangeHandler,
        onAddComment: addCommentHandler,
        onTaskStatusChange: taskStatusChangeHandler,
        onTaskPriorityChange: taskPriorityChangeHandler,
        onAddMember: addMemberHandler,
        onRemoveMember: removeMemberHandler
    };

    return (
        <TaskContext.Provider value={taskContextValue}>
            {props.children}
        </TaskContext.Provider>
    );
}

export default TaskContextProvider;