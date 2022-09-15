import { useEffect, useState } from "react"

import { Activities } from "./components/Activities"
import { AddButton } from "./components/AddButton"
import { Task } from "./@types/types"
import { Header } from "./components/Header"

import style from "./app.module.scss"
import "./styles/global.scss"
import { localTasks } from "./utils/localTasks"

function App() {
	const [listArray, setListArray] = useState<Task[]>([])

	useEffect(() => {
		localTasks
			.getItem("@AfroToDo:tasks")
			.then((res) => {
				setListArray(() => JSON.parse(res))
			})
			.catch((error) => console.log(error))
	}, [])

	return (
		<>
			<Header />
			<main className={style.main}>
				<AddButton listArray={listArray} setListArray={setListArray} />
				<Activities listArray={listArray} setListArray={setListArray} />
			</main>
		</>
	)
}

export default App
