;(function () {
    const template = `
        <header class="header">
            <h1>todos</h1>
            <input 
                class="new-todo"
                placeholder="What needs to be done?"
                @keydown.enter="newTodo"
            >
        </header>
    `

    window.todoHeader = {
        template,
        methods: {
            newTodo(e) {
                const target = e.target
                const value = target.value.trim()
                if (!value) {
                    return 
                }
                this.$emit('add-new-todo', value)
				target.value = ''
            }
        }
    }
})()