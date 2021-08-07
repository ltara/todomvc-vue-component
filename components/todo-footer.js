;(function () {
    const template = `
        <footer class="footer">
            <!-- This footer should hidden by default and shown when there are todos -->
            <!-- This should be 0 items left by default -->
            <span class="todo-count"><strong>{{ remaining }}</strong> item left</span>
            <!-- Remove this if you don't implement routing -->
            <ul class="filters">
                <li>
                    <a :class="{selected: filterText === ''}" href="#/">All</a>
                </li>
                <li>
                    <a :class="{selected: filterText === 'active'}" href="#/active">Active</a>
                </li>
                <li>
                    <a :class="{selected: filterText === 'completed'}" href="#/completed">Completed</a>
                </li>
            </ul>
            <!-- Hidden if no completed items are left ↓ -->
            <button class="clear-completed" v-if="todos.length" @click="clearCompleted">Clear completed</button>
        </footer>
    `

    window.todoFooter = {
        template,
        props: ['filterText', 'todos'],
        computed: {
            remaining () {
                return this.todos.filter(item => !item.completed).length
            }
        },
        methods: {
            clearCompleted() {
                this.$emit('clear-completed')
            }
        }
    }
})()