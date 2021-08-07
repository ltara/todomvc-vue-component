;
(function () {
	const template = `
        <section class="main">
            <!-- This section should be hidden by default and shown when there are todos -->
            <input
                id="toggle-all"
                class="toggle-all"
                type="checkbox"
                v-model="toggleAllStatus"
            >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <!-- These are here just to show the structure of the list items -->
                <!-- List items should get the class editing when editing and completed when marked as completed -->
                <li 
                    v-for="(todo, index) in filterTodos"
                    :key="todo.id"
                    :class="{completed: todo.completed, editing: currentEditing === todo}"
                >
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="todo.completed">
                        <label @dblclick="getEditing(todo)">{{ todo.title }}</label>
                        <button class="destroy" @click="removeTodo(index)"></button>
                    </div>
                    <input
                        class="edit"
                        :value="todo.title"
                        @keydown.enter="saveEditing(index, $event)"
                        @blur="saveEditing(index, $event)"
                        @keydown.esc="cancelEditing"
                        v-todo-focus="currentEditing === todo"
                    >
                </li>
            </ul>
        </section>
    `

	window.todoList = {
		template,
		props: ['todos', 'filterTodos'],
		data() {
			return {
				currentEditing: null
			}
		},
		computed: {
			toggleAllStatus: {
				get() {
					return this.todos.every(item => item.completed)
				},
				set() {
					const checked = !this.toggleAllStatus
                    this.$emit('toggle-all', checked)
				}
			}
		},
		methods: {
			removeTodo(index) {
				this.$emit('remove-todo', index)
			},
			getEditing(todo) {
				this.currentEditing = todo
			},
			saveEditing(index, e) {
                const value = e.target.value
                this.$emit('save-editing', index, value)
                this.currentEditing = null
			},
			cancelEditing() {
                this.currentEditing = null
			}
		},
		directives: {
			todoFocus: {
				update(el, binding) {
                    if (binding.value) {
                        el.focus()
                    }
				}
			}
		}
	}
})()
