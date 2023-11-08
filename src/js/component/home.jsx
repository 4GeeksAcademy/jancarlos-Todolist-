import React, { useState, useEffect } from "react";

const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [list, setList] = useState([])
	const [newTask, setNewTask] = useState("")
	const getList = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`)
			if (!response.ok) {
				throw new Error("the response of get list give false")
			}
			const data = await response.json()
			setList(data)
		} catch (err) {
			console.log(err)
		}
	}
	const handlerClick = async () => {
		try {
			if (newTask) {
				let obj = {
					label: newTask,
					done: false
				}
				setList((prevList) => [...prevList, obj])
				const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`, {
					body: JSON.stringify([...list, obj]),
					method: "PUT",
					headers: {
						'Content-Type': 'application/json'
					}

				})
				if (!response.ok) {
					throw new Error("the response of get list give false")
				}
				await response.json();
				getList();

			} else {
				alert("para guadar tarea necesita escribir algo")
			}

		}
		catch (err) {
			console.log(err)
		}
	}
	const hamdleDelete = async (label) => {
		const newTaskList = list.filter((ele) => ele.label !== label);

		setList(newTaskList);
		await updateList(newTaskList)
	}

	const updateList = async (newList) => {
		try {

			const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${inputValue}`, {
				body: JSON.stringify(newList),
				method: "PUT",
				headers: {
					'Content-Type': 'application/json'
				}

			})
			if (response.ok) {
				setList(newList)

			}
		}
		catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getList()
	}, [inputValue])
	return (
		<div className="text-center container">
			<h3>buscar tu lista por nombre:</h3>
			<input
				type="text"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<h3>agregar una nueva tarea:</h3>
			<input type="text"
				onChange={(e) => setNewTask(e.target.value)}
			/>
			<button onClick={handlerClick}>agregar tarea</button>
			<ul className="list-group list-group-flush">

				{
					list.map((ele, index) => {
						return <li className="list-group-item" key={index}>{ele.label}
							<button
								className="btn btn-outline-danger" onClick={() => hamdleDelete(ele.label)}>x</button>
						</li>
					})


				}


			</ul>
		</div>
	);
};

export default Home;
