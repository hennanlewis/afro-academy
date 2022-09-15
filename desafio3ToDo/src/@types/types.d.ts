import { Dispatch, SetStateAction } from "react"

type DateLocalType = "BR" | "US"

interface Task {
	isConcluded: boolean
	task: string
	deadline?: Date
	isEditing: boolean
	concludedDate?: Date
}

interface TaskStateProps {
	listArray: Task[]
	setListArray: Dispatch<SetStateAction<Task[]>>
}
