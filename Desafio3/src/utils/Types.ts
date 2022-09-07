import { Dispatch, SetStateAction } from "react"

export type ActivityType = {
	isConcluded: boolean
	task: string
	hasLimiteDate: boolean
	limiteDate: string
	isEditing: boolean
	concludedDate: string
}

export const activityDefaultValue: ActivityType = {
	isConcluded: false,
	task: "",
	hasLimiteDate: false,
	limiteDate: "",
	isEditing: false,
	concludedDate: "",
}

export type ActivitiesStateProps = {
	listArray: ActivityType[]
	setListArray: Dispatch<SetStateAction<ActivityType[]>>
}
