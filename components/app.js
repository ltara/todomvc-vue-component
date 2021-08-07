;
(function () {
	const template = `
		<div>
			<section class="todoapp">
				<todo-header @add-new-todo="addNewTodo"></todo-header>
				<todo-list
					:todos="todos"
					:filterTodos="filterTodos"
					@remove-todo="removeTodo"
					@toggle-all="toggleAll"
					@save-editing="saveEditing"
				></todo-list>
				<todo-footer
					:filterText="filterText"
					:todos="todos"
					@clear-completed="clearCompleted"
				></todo-footer>
			</section>
			<app-footer></app-footer>
		</div>
	`

	const todos = [{
			id: 1,
			title: '吃饭',
			completed: false
		},
		{
			id: 2,
			title: '睡觉',
			completed: false
		},
		{
			id: 3,
			title: '打游戏',
			completed: true
		},
		{
			id: 4,
			title: '写代码',
			completed: false
		}
	]
	window.todoApp = {
		template,
		components: {
			todoHeader,
			todoList,
			todoFooter,
			appFooter
		},
		data() {
			return {
				todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
				filterText: ''
			}
		},
		computed: {
			filterTodos() {
				switch (this.filterText) {
					case 'active':
						return this.todos.filter(item => !item.completed)
						break
					case 'completed':
						return this.todos.filter(item => item.completed)
						break
					default:
						return this.todos
						break
				}
			}
		},
		created() {
			window.onhashchange = () => {
				this.filterText = window.location.hash.substr(2)
			}
			this.$watch('todos', function (val) {
				window.localStorage.setItem('todos', JSON.stringify(val))
			}, {
				deep: true
			})
		},
		methods: {
			addNewTodo(value) {
				this.todos.push({
					id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1,
					title: value,
					completed: false
				})
			},
			removeTodo(index) {
				this.todos.splice(index, 1)
			},
			clearCompleted() {
				for (let i = 0; i < this.todos.length; i++) {
					if (this.todos[i].completed) {
						this.todos.splice(i--, 1)
					}
				}
			},
			toggleAll(checked) {
				this.todos.forEach(item => {
					item.completed = checked
				})
			},
			saveEditing(index, value) {
				this.todos[index].title = value
			}
		}
	}
})()
