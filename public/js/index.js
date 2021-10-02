class TODOClientSDK {
    constructor(appURL) {
        this.appURL = appURL;
    }
     async getAllTodos() {
        const response = await fetch(`${this.appURL}/api/v1/all`)
        const data = await response.json();
        // console.log("data")
        if(data.success) return data.data;
        return null;
    }

    // async getSingleTodo(id) {
    //     const response = await fetch(`${this.appURL}/api/v1/${id}`,)
    //     const data = await response.json();
    //     if(data.success) return data.data;
    // }
    // async deleteTodo(id) {
    //     const response = await fetch(`${this.appURL}/api/v1/${id}`,{method:delete})
    //     const data = await response.json();
    //     if(data.success) return data.data;
    // }
    // async updateTodo(id) {
    //     const response = await fetch(`${this.appURL}/api/v1/${id}`  )
    //     const data = await response.json();
    //     if(data.success) return data.data;
    // }
    // async AddTodo(id) {
    //     const response = await fetch(`${this.appURL}/api/v1/${id}`)
    //     const data = await response.json();
    //     if(data.success) return data.data;
    // }
    
}

window.TodoSDK = new TODOClientSDK("http://localhost:3000");