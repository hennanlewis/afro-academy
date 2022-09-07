import { useEffect, useState } from "react"

import { Activities } from "./components/Activities"
import { AddButton } from "./components/AddButton"
import { activityDefaultValue, ActivityType } from "./utils/Types"
import { Header } from "./components/Header"
import style from "./app.module.scss"
import "./styles/global.scss"

function App() {
	const [listArray, setListArray] = useState<ActivityType[]>([])

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
