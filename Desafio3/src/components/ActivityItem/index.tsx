import { Dispatch, SetStateAction, ChangeEvent, useEffect, useRef } from "react"

import { Delete } from "../IconsComponents/Delete"
import { ActivityType } from "../../utils/Types"
import calendar from "../../assets/calendar.svg"
import complete from "../../assets/complete.svg"
import { Edit } from "../IconsComponents/Edit"
import style from "./style.module.scss"

type ActivityItemProps = {
	setListArray: Dispatch<SetStateAction<ActivityType[]>>
	listItem: ActivityType
	arrayPosition: number
}

export const ActivityItem = (props: ActivityItemProps) => {
	const { arrayPosition, listItem, setListArray } = props

	const inputRef = useRef<HTMLInputElement>(null)

	const handleIsConsluded = (event: ChangeEvent<HTMLInputElement>) => {
		setListArray((values) => {
			values[arrayPosition] = {
				...listItem,
				isConcluded: event.target.checked,
				concludedDate: String(new Date()),
			}

			return [...values]
		})
	}

	const handleEditActivity = () => {
		setListArray((values) => {
			if (values[arrayPosition].isEditing) {
				values[arrayPosition].isEditing = false
				return [...values]
			}

			const isEditing = values.map((item, index) =>
				index == arrayPosition
					? { ...item, isEditing: true }
					: { ...item, isEditing: false }
			)

			return isEditing
		})
	}

	const handleDeleteActivity = () => {
		setListArray((values) => {
			values = values.filter((item, index) => index != arrayPosition)
			return values
		})
	}

	useEffect(() => {
		if (inputRef.current) inputRef.current.checked = listItem.isConcluded
	}, [])

	return (
		<>
			<div
				className={listItem.isEditing ? style.editingActivity : style.activity}
			>
				<div className={style.todoOptions}>
					<label>
						<input
							type="checkbox"
							onChange={(event) => handleIsConsluded(event)}
							ref={inputRef}
						/>

						<span className={listItem.isConcluded ? style.concluded : ""}>
							{listItem.task}
						</span>
					</label>

					<button className={style.editButton} onClick={handleEditActivity}>
						<Edit />
					</button>

					<button className={style.deleteButton} onClick={handleDeleteActivity}>
						<Delete />
					</button>
				</div>

				<div className={style.todoDate}>
					{listItem.isConcluded && (
						<span className={style.concludedDate}>
							<img src={complete} alt="" />
							<span>Finalizado em</span>
							<span>
								{new Date(listItem.concludedDate).toLocaleDateString("pt-BR")}
							</span>
						</span>
					)}

					{listItem.hasLimiteDate && (
						<span className={style.limiteDate}>
							<img src={calendar} alt="" />
							<span>até</span>
							<span>
								{new Date(listItem.limiteDate).toLocaleDateString("pt-BR")}
							</span>
						</span>
					)}
				</div>
			</div>
		</>
	)
}
